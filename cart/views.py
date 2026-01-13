from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from .cart import Cart
from .emails import send_order_confirmation
from gallery.models import Artwork
from shop.models import Product
import stripe
import uuid
import json

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


def cart_detail(request):
    """Display cart contents."""
    cart = Cart(request)
    context = {
        'cart': cart,
    }
    return render(request, 'cart/cart.html', context)


@require_POST
def cart_add(request):
    """Add item to cart."""
    cart = Cart(request)
    
    item_type = request.POST.get('item_type')
    item_id = request.POST.get('item_id')
    quantity = int(request.POST.get('quantity', 1))
    
    if item_type == 'artwork':
        item = get_object_or_404(Artwork, id=item_id, is_available=True)
        cart.add(
            item_type='artwork',
            item_id=item.id,
            name=item.title,
            price=item.price,
            image=item.image,
            quantity=quantity,
        )
    elif item_type == 'product':
        item = get_object_or_404(Product, id=item_id, is_active=True)
        if item.stock >= quantity:
            cart.add(
                item_type='product',
                item_id=item.id,
                name=item.name,
                price=item.price,
                image=item.image,
                quantity=quantity,
            )
    
    # Check if AJAX request
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'success': True,
            'cart_count': len(cart),
        })
    
    return redirect('cart')


@require_POST
def cart_update(request):
    """Update item quantity in cart."""
    cart = Cart(request)
    
    item_type = request.POST.get('item_type')
    item_id = request.POST.get('item_id')
    quantity = int(request.POST.get('quantity', 1))
    
    cart.update_quantity(item_type, item_id, quantity)
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'success': True,
            'cart_count': len(cart),
            'subtotal': str(cart.subtotal),
            'total': str(cart.total),
        })
    
    return redirect('cart')


@require_POST
def cart_remove(request):
    """Remove item from cart."""
    cart = Cart(request)
    
    item_type = request.POST.get('item_type')
    item_id = request.POST.get('item_id')
    
    cart.remove(item_type, item_id)
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'success': True,
            'cart_count': len(cart),
        })
    
    return redirect('cart')


def checkout(request):
    """Checkout page with on-site Stripe Elements payment."""
    cart = Cart(request)
    
    if len(cart) == 0:
        return redirect('cart')
    
    # Calculate total in cents for Stripe
    total_cents = int(float(cart.total) * 100)
    
    # Create a PaymentIntent for on-site payment
    try:
        intent = stripe.PaymentIntent.create(
            amount=total_cents,
            currency='usd',
            automatic_payment_methods={'enabled': True},
            metadata={
                'order_id': str(uuid.uuid4())[:8].upper(),
            }
        )
        client_secret = intent.client_secret
    except stripe.error.StripeError as e:
        context = {
            'cart': cart,
            'error': str(e),
            'stripe_publishable_key': settings.STRIPE_PUBLISHABLE_KEY,
        }
        return render(request, 'cart/checkout.html', context)
    
    context = {
        'cart': cart,
        'client_secret': client_secret,
        'stripe_publishable_key': settings.STRIPE_PUBLISHABLE_KEY,
    }
    return render(request, 'cart/checkout.html', context)


@require_POST
def process_payment(request):
    """Process shipping info and redirect to success after payment confirmation."""
    cart = Cart(request)
    
    if len(cart) == 0:
        return JsonResponse({'error': 'Cart is empty'}, status=400)
    
    # Store shipping info in session
    request.session['shipping_info'] = {
        'first_name': request.POST.get('first_name'),
        'last_name': request.POST.get('last_name'),
        'email': request.POST.get('email'),
        'address': request.POST.get('address'),
        'city': request.POST.get('city'),
        'state': request.POST.get('state'),
        'zip_code': request.POST.get('zip_code'),
        'country': request.POST.get('country', 'United States'),
    }
    request.session.modified = True
    
    return JsonResponse({'success': True})


def checkout_success(request):
    """Order confirmation page after successful Stripe payment."""
    payment_intent = request.GET.get('payment_intent')
    
    print(f"checkout_success called with payment_intent: {payment_intent}")
    print(f"shipping_info in session: {request.session.get('shipping_info', {})}")
    
    if not payment_intent:
        return redirect('home')
    
    try:
        # Verify the payment with Stripe
        intent = stripe.PaymentIntent.retrieve(payment_intent)
        
        if intent.status == 'succeeded':
            cart = Cart(request)
            shipping_info = request.session.get('shipping_info', {})
            
            # Convert cart items to JSON-serializable format (Decimals -> strings)
            cart_items = []
            for item in cart:
                cart_items.append({
                    'name': item.get('name', ''),
                    'quantity': item.get('quantity', 1),
                    'price': str(item.get('price', 0)),
                    'total_price': str(item.get('total_price', 0)),
                    'image': str(item.get('image', '')),
                    'item_type': item.get('item_type', ''),
                    'item_id': item.get('item_id', ''),
                })
            
            # Create order data
            order_data = {
                'id': intent.metadata.get('order_id', str(uuid.uuid4())[:8].upper()),
                'payment_intent': payment_intent,
                'first_name': shipping_info.get('first_name', ''),
                'last_name': shipping_info.get('last_name', ''),
                'email': shipping_info.get('email', ''),
                'address': shipping_info.get('address', ''),
                'city': shipping_info.get('city', ''),
                'state': shipping_info.get('state', ''),
                'zip_code': shipping_info.get('zip_code', ''),
                'country': shipping_info.get('country', 'Sweden'),
                'items': cart_items,
                'subtotal': str(cart.subtotal),
                'shipping': str(cart.shipping),
                'tax': str(cart.tax),
                'total': str(intent.amount / 100),  # Convert from cents
                'payment_status': 'paid',
            }
            
            # Store order in session for history
            if 'orders' not in request.session:
                request.session['orders'] = []
            request.session['orders'].append(order_data)
            request.session['last_order'] = order_data
            
            # Send order confirmation email
            send_order_confirmation(order_data)
            
            # Clear shipping info
            if 'shipping_info' in request.session:
                del request.session['shipping_info']
            
            request.session.modified = True
            
            # Clear the cart
            cart.clear()
            
            context = {
                'order': order_data,
            }
            return render(request, 'cart/success.html', context)
        else:
            # Payment not completed
            return redirect('checkout')
            
    except stripe.error.StripeError:
        return redirect('checkout')


@csrf_exempt
def stripe_webhook(request):
    """Handle Stripe webhooks for payment events."""
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    webhook_secret = getattr(settings, 'STRIPE_WEBHOOK_SECRET', None)
    
    if webhook_secret:
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError:
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError:
            return HttpResponse(status=400)
    else:
        # For development without webhook secret
        try:
            event = json.loads(payload)
        except json.JSONDecodeError:
            return HttpResponse(status=400)
    
    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        # You can add additional processing here, like sending emails
        # or updating inventory
        print(f"Payment successful for PaymentIntent: {payment_intent['id']}")
    
    return HttpResponse(status=200)
