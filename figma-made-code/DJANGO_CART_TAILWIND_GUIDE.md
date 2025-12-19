# Django Cart & Tailwind Setup Guide - Part 3

This guide continues with cart functionality and Tailwind CSS setup.

## 6. Static Files & Tailwind CSS Setup

### 6.1 Install Node.js Dependencies

Create `package.json` in your project root:

```json
{
  "name": "constcollection",
  "version": "1.0.0",
  "scripts": {
    "dev": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch",
    "build": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --minify"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0"
  }
}
```

Install dependencies:
```bash
npm install
```

### 6.2 Tailwind Configuration

Create `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './*/templates/**/*.html',
    './static/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'brand-indigo': {
          DEFAULT: '#3730A3',
          'dark': '#312E81',
          'light': '#4F46E5',
        },
        'accent-coral': {
          DEFAULT: '#FF6B6B',
          'dark': '#EE5A52',
          'light': '#FF8787',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 6.3 Create Tailwind Input File

Create `static/css/input.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer base {
  html {
    font-family: 'Inter', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
  }
}

@layer components {
  /* Button styles */
  .btn-primary {
    @apply bg-[#FF6B6B] hover:bg-[#EE5A52] text-white font-['Inter'] px-6 py-3 rounded-md transition-colors;
  }
  
  .btn-secondary {
    @apply bg-[#3730A3] hover:bg-[#312E81] text-white font-['Inter'] px-6 py-3 rounded-md transition-colors;
  }
  
  .btn-outline {
    @apply border-2 border-[#3730A3] text-[#3730A3] hover:bg-[#3730A3] hover:text-white font-['Inter'] px-6 py-3 rounded-md transition-colors;
  }
  
  /* Form input styles */
  .form-input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-md font-['Inter'] focus:ring-2 focus:ring-[#3730A3] focus:border-transparent;
  }
  
  .form-label {
    @apply block font-['Inter'] mb-2 text-gray-700;
  }
}
```

### 6.4 Build Tailwind CSS

```bash
# For development (watches for changes)
npm run dev

# For production (minified)
npm run build
```

### 6.5 Custom JavaScript

Create `static/js/main.js`:

```javascript
// ConstCollection Custom JavaScript

// Image gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add any custom JavaScript here
    
    // Example: Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Cart quantity update with AJAX
function updateCartQuantity(itemId, quantity) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
    fetch(`/cart/update/${itemId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ quantity: quantity })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update cart display
            location.reload();
        }
    })
    .catch(error => console.error('Error:', error));
}
```

---

## 7. Forms

### 7.1 Checkout Form

**orders/forms.py**:

```python
from django import forms
from .models import Order

class OrderCreateForm(forms.ModelForm):
    """Checkout form"""
    
    class Meta:
        model = Order
        fields = [
            'first_name', 'last_name', 'email',
            'address', 'city', 'state', 'zip_code', 'country'
        ]
        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'John'
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Doe'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-input',
                'placeholder': 'john@example.com'
            }),
            'address': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': '123 Main Street'
            }),
            'city': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'New York'
            }),
            'state': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'NY'
            }),
            'zip_code': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': '10001'
            }),
            'country': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'United States'
            }),
        }
```

### 7.2 Using Forms in Templates

**templates/pages/checkout.html**:

```django
{% extends 'base.html' %}
{% load static crispy_forms_tags %}

{% block content %}
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 class="font-['Playfair_Display'] text-4xl mb-8">Checkout</h1>
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Form -->
    <div class="lg:col-span-2">
      <form method="post" id="checkout-form">
        {% csrf_token %}
        
        <section class="mb-8">
          <h2 class="font-['Playfair_Display'] text-2xl mb-6">Shipping Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="{{ form.first_name.id_for_label }}" class="form-label">First Name</label>
              {{ form.first_name }}
              {% if form.first_name.errors %}
                <p class="text-red-600 text-sm mt-1">{{ form.first_name.errors }}</p>
              {% endif %}
            </div>
            
            <div>
              <label for="{{ form.last_name.id_for_label }}" class="form-label">Last Name</label>
              {{ form.last_name }}
              {% if form.last_name.errors %}
                <p class="text-red-600 text-sm mt-1">{{ form.last_name.errors }}</p>
              {% endif %}
            </div>
            
            <div class="md:col-span-2">
              <label for="{{ form.email.id_for_label }}" class="form-label">Email</label>
              {{ form.email }}
              {% if form.email.errors %}
                <p class="text-red-600 text-sm mt-1">{{ form.email.errors }}</p>
              {% endif %}
            </div>
            
            <div class="md:col-span-2">
              <label for="{{ form.address.id_for_label }}" class="form-label">Address</label>
              {{ form.address }}
              {% if form.address.errors %}
                <p class="text-red-600 text-sm mt-1">{{ form.address.errors }}</p>
              {% endif %}
            </div>
            
            <div>
              <label for="{{ form.city.id_for_label }}" class="form-label">City</label>
              {{ form.city }}
              {% if form.city.errors %}
                <p class="text-red-600 text-sm mt-1">{{ form.city.errors }}</p>
              {% endif %}
            </div>
            
            <div>
              <label for="{{ form.state.id_for_label }}" class="form-label">State</label>
              {{ form.state }}
              {% if form.state.errors %}
                <p class="text-red-600 text-sm mt-1">{{ form.state.errors }}</p>
              {% endif %}
            </div>
            
            <div>
              <label for="{{ form.zip_code.id_for_label }}" class="form-label">ZIP Code</label>
              {{ form.zip_code }}
              {% if form.zip_code.errors %}
                <p class="text-red-600 text-sm mt-1">{{ form.zip_code.errors }}</p>
              {% endif %}
            </div>
            
            <div>
              <label for="{{ form.country.id_for_label }}" class="form-label">Country</label>
              {{ form.country }}
              {% if form.country.errors %}
                <p class="text-red-600 text-sm mt-1">{{ form.country.errors }}</p>
              {% endif %}
            </div>
          </div>
        </section>
        
        <!-- Stripe Payment Section -->
        <section class="mb-8">
          <h2 class="font-['Playfair_Display'] text-2xl mb-6">Payment Information</h2>
          
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div class="flex items-center gap-2 text-sm text-gray-600 font-['Inter'] mb-4">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secured by Stripe</span>
            </div>
            
            <!-- Stripe Card Element -->
            <div id="card-element" class="p-3 border border-gray-300 rounded-md bg-white"></div>
            <div id="card-errors" class="text-red-600 text-sm mt-2"></div>
          </div>
        </section>
        
        <!-- Submit Button -->
        <button type="submit" class="w-full bg-[#FF6B6B] hover:bg-[#EE5A52] text-white py-4 rounded-md font-['Inter'] text-lg flex items-center justify-center">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Place Order - ${{ cart.get_total|floatformat:2 }}
        </button>
        
        <p class="text-center text-xs text-gray-500 font-['Inter'] mt-4">
          By placing your order, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
    
    <!-- Order Summary Sidebar -->
    <div>
      {% include 'includes/components/cart_summary.html' %}
    </div>
  </div>
</div>

<!-- Stripe JS -->
<script src="https://js.stripe.com/v3/"></script>
<script>
  // Initialize Stripe
  const stripe = Stripe('{{ stripe_public_key }}');
  const elements = stripe.elements();
  const cardElement = elements.create('card', {
    style: {
      base: {
        fontSize: '16px',
        fontFamily: 'Inter, sans-serif',
      }
    }
  });
  cardElement.mount('#card-element');
  
  // Handle form submission
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const {paymentMethod, error} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    
    if (error) {
      document.getElementById('card-errors').textContent = error.message;
    } else {
      // Add payment method ID to form
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'payment_method_id');
      hiddenInput.setAttribute('value', paymentMethod.id);
      form.appendChild(hiddenInput);
      
      // Submit form
      form.submit();
    }
  });
</script>
{% endblock %}
```

---

## 8. Cart & Session Management

### 8.1 Cart Class

**cart/cart.py**:

```python
from decimal import Decimal
from django.conf import settings
from gallery.models import Artwork
from shop.models import Product

class Cart:
    """Shopping cart stored in session"""
    
    def __init__(self, request):
        """Initialize the cart"""
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart
    
    def add(self, item, quantity=1, override_quantity=False):
        """Add a product or artwork to the cart"""
        # Determine item type
        if isinstance(item, Artwork):
            item_key = f'artwork_{item.id}'
            item_type = 'artwork'
        elif isinstance(item, Product):
            item_key = f'product_{item.id}'
            item_type = 'product'
        else:
            raise ValueError('Invalid item type')
        
        if item_key not in self.cart:
            self.cart[item_key] = {
                'quantity': 0,
                'price': str(item.price),
                'type': item_type,
                'id': item.id,
                'name': item.title if item_type == 'artwork' else item.name,
                'image': item.image_main.url if item_type == 'artwork' else item.image.url,
            }
        
        if override_quantity:
            self.cart[item_key]['quantity'] = quantity
        else:
            self.cart[item_key]['quantity'] += quantity
        
        self.save()
    
    def remove(self, item_key):
        """Remove an item from the cart"""
        if item_key in self.cart:
            del self.cart[item_key]
            self.save()
    
    def save(self):
        """Mark the session as modified"""
        self.session.modified = True
    
    def __iter__(self):
        """Iterate over the items in the cart"""
        for item in self.cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']
            yield item
    
    def __len__(self):
        """Count all items in the cart"""
        return sum(item['quantity'] for item in self.cart.values())
    
    def get_subtotal(self):
        """Calculate subtotal"""
        return sum(Decimal(item['price']) * item['quantity'] 
                  for item in self.cart.values())
    
    def get_shipping(self):
        """Calculate shipping cost"""
        subtotal = self.get_subtotal()
        return Decimal('15.00') if subtotal > 0 else Decimal('0.00')
    
    def get_tax(self):
        """Calculate tax (8%)"""
        return self.get_subtotal() * Decimal('0.08')
    
    def get_total(self):
        """Calculate total"""
        return self.get_subtotal() + self.get_shipping() + self.get_tax()
    
    def clear(self):
        """Clear the cart"""
        del self.session[settings.CART_SESSION_ID]
        self.save()
```

### 8.2 Cart Context Processor

**cart/context_processors.py**:

```python
from .cart import Cart

def cart(request):
    """Make cart available to all templates"""
    return {'cart': Cart(request)}
```

Add to `settings.py` context processors:
```python
'context_processors': [
    # ... existing processors
    'cart.context_processors.cart',
],
```

### 8.3 Cart Views

**cart/views.py**:

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from django.contrib import messages
from .cart import Cart
from gallery.models import Artwork
from shop.models import Product

@require_POST
def cart_add(request, item_id):
    """Add item to cart"""
    cart = Cart(request)
    
    # Determine if it's an artwork or product
    item_type = request.POST.get('item_type', 'product')
    
    if item_type == 'artwork':
        item = get_object_or_404(Artwork, id=item_id, is_available=True)
    else:
        item = get_object_or_404(Product, id=item_id, is_active=True)
    
    quantity = int(request.POST.get('quantity', 1))
    override = request.POST.get('override', 'False') == 'True'
    
    cart.add(item, quantity=quantity, override_quantity=override)
    messages.success(request, f'{item.title if item_type == "artwork" else item.name} added to cart')
    
    return redirect(request.META.get('HTTP_REFERER', 'cart:cart_detail'))


@require_POST
def cart_remove(request, item_key):
    """Remove item from cart"""
    cart = Cart(request)
    cart.remove(item_key)
    messages.success(request, 'Item removed from cart')
    return redirect('cart:cart_detail')


def cart_detail(request):
    """Display cart"""
    cart = Cart(request)
    return render(request, 'pages/cart.html', {'cart': cart})


@require_POST
def cart_update(request, item_key):
    """Update item quantity in cart"""
    cart = Cart(request)
    quantity = int(request.POST.get('quantity', 1))
    
    if quantity > 0:
        cart.cart[item_key]['quantity'] = quantity
        cart.save()
        messages.success(request, 'Cart updated')
    else:
        cart.remove(item_key)
        messages.success(request, 'Item removed from cart')
    
    return redirect('cart:cart_detail')
```

### 8.4 Cart URLs

**cart/urls.py**:

```python
from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.cart_detail, name='cart_detail'),
    path('add/<int:item_id>/', views.cart_add, name='cart_add'),
    path('remove/<str:item_key>/', views.cart_remove, name='cart_remove'),
    path('update/<str:item_key>/', views.cart_update, name='cart_update'),
]
```

### 8.5 Cart Page Template

**templates/pages/cart.html**:

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Shopping Cart - ConstCollection{% endblock %}

{% block content %}
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  
  {% if cart|length > 0 %}
    <!-- Back button -->
    <a href="{% url 'shop:product_list' %}" 
       class="flex items-center gap-2 font-['Inter'] text-gray-600 hover:text-[#3730A3] mb-8">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Continue Shopping
    </a>

    <h1 class="font-['Playfair_Display'] text-4xl sm:text-5xl mb-8">
      Shopping Cart
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        {% for item in cart %}
        <article class="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <div class="flex gap-4">
            <!-- Item Image -->
            <div class="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <img src="{{ item.image }}" alt="{{ item.name }}" class="w-full h-full object-cover">
            </div>

            <!-- Item Details -->
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-['Inter'] text-lg pr-4">
                  {{ item.name }}
                </h3>
                <form method="post" action="{% url 'cart:cart_remove' item_key=item.type|add:'_'|add:item.id|stringformat:'s' %}">
                  {% csrf_token %}
                  <button type="submit" class="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </form>
              </div>

              <p class="font-['Inter'] text-[#3730A3] mb-4">
                ${{ item.price|floatformat:2 }}
              </p>

              <!-- Quantity Controls -->
              <form method="post" action="{% url 'cart:cart_update' item_key=item.type|add:'_'|add:item.id|stringformat:'s' %}" class="flex items-center gap-4">
                {% csrf_token %}
                <span class="font-['Inter'] text-sm text-gray-600">
                  Quantity:
                </span>
                <div class="flex items-center border rounded-md">
                  <button type="button" 
                          onclick="this.nextElementSibling.stepDown(); this.form.submit()"
                          class="px-3 py-1 hover:bg-gray-100">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input type="number" 
                         name="quantity" 
                         value="{{ item.quantity }}" 
                         min="1"
                         onchange="this.form.submit()"
                         class="px-4 py-1 border-x font-['Inter'] min-w-[3rem] text-center">
                  <button type="button" 
                          onclick="this.previousElementSibling.stepUp(); this.form.submit()"
                          class="px-3 py-1 hover:bg-gray-100">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
        {% endfor %}
      </div>

      <!-- Cart Summary -->
      <div>
        <div class="bg-gray-50 rounded-lg p-6 sticky top-24">
          <h2 class="font-['Playfair_Display'] text-xl mb-6">Order Summary</h2>

          <div class="space-y-4">
            <div class="flex justify-between font-['Inter'] text-sm">
              <span class="text-gray-600">Items ({{ cart|length }})</span>
              <span>${{ cart.get_subtotal|floatformat:2 }}</span>
            </div>

            <div class="flex justify-between font-['Inter'] text-sm">
              <span class="text-gray-600">Shipping</span>
              <span>{% if cart.get_shipping > 0 %}${{ cart.get_shipping|floatformat:2 }}{% else %}FREE{% endif %}</span>
            </div>

            <div class="flex justify-between font-['Inter'] text-sm">
              <span class="text-gray-600">Tax (8%)</span>
              <span>${{ cart.get_tax|floatformat:2 }}</span>
            </div>

            <hr class="my-4">

            <div class="flex justify-between font-['Inter']">
              <span>Total</span>
              <span class="text-[#3730A3]">${{ cart.get_total|floatformat:2 }}</span>
            </div>

            <a href="{% url 'orders:checkout' %}" 
               class="block w-full bg-[#FF6B6B] hover:bg-[#EE5A52] text-white text-center py-3 rounded-md font-['Inter']">
              Proceed to Checkout
            </a>

            <div class="pt-4 space-y-2">
              <p class="font-['Inter'] text-xs text-gray-500 flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Secure checkout
              </p>
              <p class="font-['Inter'] text-xs text-gray-500 flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Free returns within 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  {% else %}
    <!-- Empty Cart State -->
    <div class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h1 class="font-['Playfair_Display'] text-3xl mb-4">
        Your cart is empty
      </h1>
      <p class="font-['Inter'] text-gray-600 mb-8">
        Looks like you haven't added any items to your cart yet.
      </p>
      <a href="{% url 'shop:product_list' %}" 
         class="inline-block bg-[#3730A3] hover:bg-[#312E81] text-white px-8 py-3 rounded-md font-['Inter']">
        Continue Shopping
      </a>
    </div>
  {% endif %}
</div>
{% endblock %}
```

*Continue to next section for Admin and final deployment...*
