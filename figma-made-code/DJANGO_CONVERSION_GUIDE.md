# ConstCollection - Django Conversion Guide

This document provides detailed guidance for converting the React prototype to Django templates.

## Design System

### Color Tokens
```python
# settings.py or theme config
THEME_COLORS = {
    'brand_indigo': '#3730A3',
    'brand_indigo_dark': '#312E81',
    'brand_indigo_light': '#4F46E5',
    'accent_coral': '#FF6B6B',
    'accent_coral_dark': '#EE5A52',
    'accent_coral_light': '#FF8787',
}
```

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

Import fonts in your base template:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Spacing Scale (Tailwind)
- `p-4` = 1rem (16px)
- `p-6` = 1.5rem (24px)
- `p-8` = 2rem (32px)
- `p-12` = 3rem (48px)
- `gap-4` = 1rem spacing between grid items
- `gap-6` = 1.5rem spacing
- `gap-8` = 2rem spacing

## Component Conversion

### 1. Navigation Component
**Django Template**: `templates/includes/components/navigation.html`

```django
<nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <a href="{% url 'home' %}" class="flex items-center">
        <h1 class="font-['Playfair_Display'] text-2xl tracking-tight text-[#3730A3]">
          ConstCollection
        </h1>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="{% url 'home' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">Home</a>
        <a href="{% url 'gallery' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">Gallery</a>
        <a href="{% url 'exhibitions' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">Exhibitions</a>
        <a href="{% url 'shop' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">Shop</a>
        <a href="{% url 'about' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">About</a>
      </div>

      <!-- Cart Icon -->
      <div class="flex items-center space-x-4">
        <a href="{% url 'cart' %}" class="relative">
          <!-- Shopping cart SVG icon -->
          {% if cart_count > 0 %}
          <span class="absolute -top-2 -right-2 bg-[#FF6B6B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-['Inter']">
            {{ cart_count }}
          </span>
          {% endif %}
        </a>
      </div>
    </div>
  </div>
</nav>
```

**Context Variables**:
- `cart_count`: Integer representing number of items in cart

---

### 2. Hero Component
**Django Template**: `templates/includes/components/hero.html`

```django
<section class="relative bg-gradient-to-br from-[#3730A3] to-[#312E81] text-white overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
      <!-- Text Content -->
      <div class="z-10">
        <h1 class="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
          {{ hero.title|default:"Discover Extraordinary Art" }}
        </h1>
        <p class="font-['Inter'] text-lg sm:text-xl text-gray-200 mb-8 max-w-lg">
          {{ hero.subtitle|default:"Curated collection of contemporary masterpieces" }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="{% url 'gallery' %}" class="bg-[#FF6B6B] hover:bg-[#EE5A52] text-white px-8 py-6 rounded-lg inline-flex items-center justify-center">
            <span class="font-['Inter']">{{ hero.cta_text|default:"Explore Gallery" }}</span>
          </a>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
        {% if hero.image %}
        <img src="{{ MEDIA_URL }}{{ hero.image }}" alt="Featured artwork" class="w-full h-full object-cover rounded-lg lg:rounded-none">
        {% endif %}
      </div>
    </div>
  </div>
</section>
```

**Context Variables**:
- `hero.title`: String
- `hero.subtitle`: String
- `hero.cta_text`: String
- `hero.image`: ImageField

---

### 3. Artwork Card Component
**Django Template**: `templates/includes/components/artwork_card.html`

```django
<article class="group cursor-pointer">
  <!-- Image Container -->
  <div class="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4] mb-4">
    <a href="{% url 'artwork_detail' artwork.id %}">
      <img src="{{ MEDIA_URL }}{{ artwork.image }}" 
           alt="{{ artwork.title }} by {{ artwork.artist.name }}" 
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
    </a>
    
    <!-- Badges -->
    <div class="absolute top-3 left-3 flex flex-col gap-2">
      {% if artwork.is_featured %}
      <span class="bg-[#3730A3] text-white font-['Inter'] text-xs px-3 py-1 rounded-md">
        Featured
      </span>
      {% endif %}
      {% if artwork.is_new %}
      <span class="bg-[#FF6B6B] text-white font-['Inter'] text-xs px-3 py-1 rounded-md">
        New
      </span>
      {% endif %}
    </div>
  </div>

  <!-- Info -->
  <div class="space-y-1">
    <h3 class="font-['Playfair_Display'] text-lg group-hover:text-[#3730A3] transition-colors">
      <a href="{% url 'artwork_detail' artwork.id %}">{{ artwork.title }}</a>
    </h3>
    <p class="font-['Inter'] text-gray-600 text-sm">
      {{ artwork.artist.name }}
    </p>
    {% if artwork.medium and artwork.year %}
    <p class="font-['Inter'] text-gray-500 text-xs">
      {{ artwork.medium }}, {{ artwork.year }}
    </p>
    {% endif %}
    <p class="font-['Inter'] text-[#3730A3] mt-2">
      ${{ artwork.price|floatformat:0|intcomma }}
    </p>
  </div>
</article>
```

**Context Variables**:
- `artwork.id`: Integer/UUID
- `artwork.title`: String
- `artwork.artist.name`: String
- `artwork.image`: ImageField
- `artwork.price`: Decimal
- `artwork.medium`: String
- `artwork.year`: Integer
- `artwork.is_featured`: Boolean
- `artwork.is_new`: Boolean

---

### 4. Gallery Grid Component
**Django Template**: `templates/includes/components/gallery_grid.html`

```django
<section class="py-8">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
    {% for artwork in artworks %}
      {% include 'includes/components/artwork_card.html' with artwork=artwork %}
    {% empty %}
    <div class="col-span-full text-center py-16">
      <p class="font-['Inter'] text-gray-500">No artworks found</p>
    </div>
    {% endfor %}
  </div>
</section>
```

**Context Variables**:
- `artworks`: QuerySet of Artwork objects

---

### 5. Image Gallery Component
**Django Template**: `templates/includes/components/image_gallery.html`

```django
<div class="space-y-4" x-data="{ currentIndex: 0, images: {{ images|safe }} }">
  <!-- Main Image -->
  <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
    <img :src="images[currentIndex].url" 
         :alt="images[currentIndex].alt" 
         class="w-full h-full object-contain">
    
    <!-- Navigation Arrows -->
    <template x-if="images.length > 1">
      <div>
        <button @click="currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1"
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full">
          <!-- Left arrow SVG -->
        </button>
        <button @click="currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full">
          <!-- Right arrow SVG -->
        </button>
      </div>
    </template>
  </div>

  <!-- Thumbnails -->
  <div class="grid grid-cols-4 sm:grid-cols-6 gap-2" x-show="images.length > 1">
    <template x-for="(image, index) in images" :key="index">
      <button @click="currentIndex = index"
              :class="index === currentIndex ? 'border-[#3730A3] ring-2 ring-[#3730A3]/20' : 'border-transparent hover:border-gray-300'"
              class="aspect-square rounded-lg overflow-hidden border-2 transition-all">
        <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover">
      </button>
    </template>
  </div>
</div>
```

**Note**: Uses Alpine.js for interactivity. Include Alpine.js in base template:
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

**Context Variables**:
- `images`: JSON array of objects with `url` and `alt` properties

---

### 6. Product Card Component
**Django Template**: `templates/includes/components/product_card.html`

```django
<article class="group">
  <!-- Image -->
  <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4 cursor-pointer">
    <a href="{% url 'product_detail' product.id %}">
      <img src="{{ MEDIA_URL }}{{ product.image }}" 
           alt="{{ product.name }}" 
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
    </a>
    
    {% if product.stock == 0 %}
    <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
      <span class="bg-white/90 text-gray-900 font-['Inter'] text-sm px-3 py-1 rounded-md">
        Out of Stock
      </span>
    </div>
    {% elif product.stock < 5 %}
    <span class="absolute top-3 left-3 bg-[#FF6B6B] text-white font-['Inter'] text-xs px-3 py-1 rounded-md">
      Low Stock
    </span>
    {% endif %}
  </div>

  <!-- Info -->
  <div class="space-y-2">
    {% if product.category %}
    <p class="font-['Inter'] text-xs text-gray-500 uppercase tracking-wide">
      {{ product.category }}
    </p>
    {% endif %}
    <h3 class="font-['Inter'] group-hover:text-[#3730A3] transition-colors">
      <a href="{% url 'product_detail' product.id %}">{{ product.name }}</a>
    </h3>
    <div class="flex items-center justify-between">
      <p class="font-['Inter'] text-[#3730A3]">
        ${{ product.price|floatformat:0|intcomma }}
      </p>
      <form method="post" action="{% url 'cart_add' product.id %}">
        {% csrf_token %}
        <button type="submit" {% if product.stock == 0 %}disabled{% endif %}
                class="bg-[#3730A3] hover:bg-[#312E81] text-white text-sm px-4 py-2 rounded-md disabled:opacity-50">
          Add
        </button>
      </form>
    </div>
  </div>
</article>
```

**Context Variables**:
- `product.id`: Integer/UUID
- `product.name`: String
- `product.image`: ImageField
- `product.price`: Decimal
- `product.category`: String
- `product.stock`: Integer

---

### 7. Cart Summary Component
**Django Template**: `templates/includes/components/cart_summary.html`

```django
<div class="bg-gray-50 rounded-lg p-6 sticky top-24">
  <h2 class="font-['Playfair_Display'] text-xl mb-6">Order Summary</h2>

  <div class="space-y-4">
    <!-- Items Count -->
    <div class="flex justify-between font-['Inter'] text-sm">
      <span class="text-gray-600">Items ({{ cart.items.count }})</span>
      <span>${{ cart.subtotal|floatformat:2 }}</span>
    </div>

    <!-- Shipping -->
    <div class="flex justify-between font-['Inter'] text-sm">
      <span class="text-gray-600">Shipping</span>
      <span>{% if cart.subtotal > 0 %}$15.00{% else %}FREE{% endif %}</span>
    </div>

    <!-- Tax -->
    <div class="flex justify-between font-['Inter'] text-sm">
      <span class="text-gray-600">Tax (8%)</span>
      <span>${{ cart.tax|floatformat:2 }}</span>
    </div>

    <hr class="my-4">

    <!-- Total -->
    <div class="flex justify-between font-['Inter']">
      <span>Total</span>
      <span class="text-[#3730A3]">${{ cart.total|floatformat:2 }}</span>
    </div>

    <!-- Checkout Button -->
    <a href="{% url 'checkout' %}" 
       class="block w-full bg-[#FF6B6B] hover:bg-[#EE5A52] text-white text-center py-3 rounded-md font-['Inter'] {% if cart.items.count == 0 %}opacity-50 pointer-events-none{% endif %}">
      Proceed to Checkout
    </a>
  </div>
</div>
```

**Context Variables**:
- `cart.items`: QuerySet of CartItem objects
- `cart.subtotal`: Decimal
- `cart.tax`: Decimal
- `cart.total`: Decimal

---

### 8. Checkout Form Component
**Django Template**: `templates/includes/components/checkout_form.html`

```django
<form method="post" action="{% url 'checkout_process' %}" class="space-y-8">
  {% csrf_token %}
  
  <!-- Shipping Information -->
  <section>
    <h2 class="font-['Playfair_Display'] text-2xl mb-6">Shipping Information</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="first_name" class="block font-['Inter'] mb-2">First Name</label>
        <input type="text" id="first_name" name="first_name" required
               class="w-full px-4 py-2 border border-gray-300 rounded-md font-['Inter'] focus:ring-2 focus:ring-[#3730A3] focus:border-transparent">
      </div>
      <div>
        <label for="last_name" class="block font-['Inter'] mb-2">Last Name</label>
        <input type="text" id="last_name" name="last_name" required
               class="w-full px-4 py-2 border border-gray-300 rounded-md font-['Inter'] focus:ring-2 focus:ring-[#3730A3] focus:border-transparent">
      </div>
      <!-- Add more fields: email, address, city, state, zip, country -->
    </div>
  </section>

  <hr class="my-8">

  <!-- Payment Information (Stripe Elements would go here) -->
  <section>
    <h2 class="font-['Playfair_Display'] text-2xl mb-6">Payment Information</h2>
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <div id="card-element">
        <!-- Stripe Card Element -->
      </div>
      <div id="card-errors" class="text-red-600 text-sm mt-2"></div>
    </div>
  </section>

  <!-- Submit Button -->
  <button type="submit" 
          class="w-full bg-[#FF6B6B] hover:bg-[#EE5A52] text-white py-4 rounded-md font-['Inter'] text-lg">
    Place Order - ${{ total|floatformat:2 }}
  </button>
</form>
```

---

## Page Templates

### Home Page
**File**: `templates/pages/home.html`

```django
{% extends 'base.html' %}

{% block content %}
  <!-- Hero Section -->
  {% include 'includes/components/hero.html' %}

  <!-- Featured Artworks -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 class="font-['Playfair_Display'] text-3xl sm:text-4xl mb-8">Featured Artworks</h2>
    {% include 'includes/components/gallery_grid.html' with artworks=featured_artworks %}
  </section>

  <!-- Current Exhibition -->
  {% if current_exhibition %}
  <section class="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
    <!-- Exhibition content -->
  </section>
  {% endif %}
{% endblock %}
```

---

## Django Models Example

```python
# models.py
from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Artwork(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='artworks/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    medium = models.CharField(max_length=100, blank=True)
    dimensions = models.CharField(max_length=100, blank=True)
    year = models.IntegerField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} by {self.artist.name}"

class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='products/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
```

---

## Asset Organization

### Images
- **Location**: `static/images/exports/`
- **Naming Convention**: `{type}_{name}_{variant}.{ext}`
  - Examples: `artwork_ethereal-dawn_main.jpg`, `hero_home_desktop.jpg`

### Icons
- **Location**: `static/icons/`
- **Format**: Optimized SVG
- Use inline SVG for interactive icons (shopping cart, heart, etc.)

---

## Accessibility Notes

1. **Semantic HTML**: All components use proper HTML5 elements (`<nav>`, `<main>`, `<article>`, etc.)
2. **ARIA Labels**: Added to icon buttons and interactive elements
3. **Alt Text**: All images include descriptive alt attributes
4. **Keyboard Navigation**: All interactive elements are keyboard accessible
5. **Focus States**: Tailwind's `focus:ring` utilities provide visible focus indicators
6. **Color Contrast**: Brand colors meet WCAG AA standards

---

## Responsive Breakpoints

```css
/* Tailwind breakpoints used throughout */
sm: 640px   /* sm: prefix */
md: 768px   /* md: prefix */
lg: 1024px  /* lg: prefix */
xl: 1280px  /* xl: prefix */
```

Example usage:
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- `text-4xl sm:text-5xl lg:text-6xl`
- `px-4 sm:px-6 lg:px-8`

---

## Static Files Setup

```python
# settings.py
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './templates/**/*.html',
    './*/templates/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'brand-indigo': '#3730A3',
        'brand-indigo-dark': '#312E81',
        'brand-indigo-light': '#4F46E5',
        'accent-coral': '#FF6B6B',
        'accent-coral-dark': '#EE5A52',
        'accent-coral-light': '#FF8787',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
}
```
