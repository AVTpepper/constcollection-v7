from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from .cart import Cart
from gallery.models import Artwork
from shop.models import Product
import uuid


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
    """Checkout page with shipping and payment form."""
    cart = Cart(request)
    
    if len(cart) == 0:
        return redirect('cart')
    
    if request.method == 'POST':
        # Process the order
        order_data = {
            'id': str(uuid.uuid4())[:8].upper(),
            'first_name': request.POST.get('first_name'),
            'last_name': request.POST.get('last_name'),
            'email': request.POST.get('email'),
            'address': request.POST.get('address'),
            'city': request.POST.get('city'),
            'state': request.POST.get('state'),
            'zip_code': request.POST.get('zip_code'),
            'country': request.POST.get('country', 'United States'),
            'items': list(cart),
            'subtotal': str(cart.subtotal),
            'shipping': str(cart.shipping),
            'tax': str(cart.tax),
            'total': str(cart.total),
        }
        
        # Store order in session for history
        if 'orders' not in request.session:
            request.session['orders'] = []
        request.session['orders'].append(order_data)
        request.session['last_order'] = order_data
        request.session.modified = True
        
        # Clear the cart
        cart.clear()
        
        return redirect('checkout_success')
    
    context = {
        'cart': cart,
    }
    return render(request, 'cart/checkout.html', context)


def checkout_success(request):
    """Order confirmation page."""
    order = request.session.get('last_order')
    
    if not order:
        return redirect('home')
    
    context = {
        'order': order,
    }
    return render(request, 'cart/success.html', context)
