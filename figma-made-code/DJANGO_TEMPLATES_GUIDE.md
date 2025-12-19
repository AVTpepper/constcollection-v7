# Django Templates Conversion Guide - Part 2

This guide continues from DJANGO_SETUP_GUIDE.md with detailed template conversion instructions.

## 5. Template Conversion

### 5.1 Base Template Structure

Create the base template that all pages will extend.

**templates/base.html**:

```django
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{% block meta_description %}ConstCollection - Contemporary art gallery and shop{% endblock %}">
    <title>{% block title %}ConstCollection{% endblock %}</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <link href="{% static 'css/output.css' %}" rel="stylesheet">
    
    <!-- Alpine.js for interactivity -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    {% block extra_css %}{% endblock %}
</head>
<body class="min-h-screen flex flex-col bg-white font-['Inter']">
    
    <!-- Navigation -->
    {% include 'includes/components/navigation.html' %}
    
    <!-- Messages -->
    {% if messages %}
    <div class="fixed top-20 right-4 z-50 space-y-2" x-data="{ show: true }" x-show="show" x-init="setTimeout(() => show = false, 5000)">
        {% for message in messages %}
        <div class="bg-white border-l-4 {% if message.tags == 'success' %}border-green-500{% elif message.tags == 'error' %}border-red-500{% else %}border-blue-500{% endif %} shadow-lg rounded-lg p-4 max-w-sm">
            <div class="flex items-center">
                <div class="flex-1">
                    <p class="font-['Inter'] text-sm">{{ message }}</p>
                </div>
                <button @click="show = false" class="ml-4 text-gray-400 hover:text-gray-600">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
        {% endfor %}
    </div>
    {% endif %}
    
    <!-- Main Content -->
    <main class="flex-1">
        {% block content %}{% endblock %}
    </main>
    
    <!-- Footer -->
    {% include 'includes/components/footer.html' %}
    
    <!-- Custom JavaScript -->
    <script src="{% static 'js/main.js' %}"></script>
    {% block extra_js %}{% endblock %}
</body>
</html>
```

### 5.2 Component Templates

#### Navigation Component

**templates/includes/components/navigation.html**:

```django
{% load static %}

<nav class="bg-white border-b border-gray-200 sticky top-0 z-50" x-data="{ mobileMenuOpen: false }">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      
      <!-- Logo -->
      <a href="{% url 'pages:home' %}" class="flex items-center">
        <h1 class="font-['Playfair_Display'] text-2xl tracking-tight text-[#3730A3]">
          ConstCollection
        </h1>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="{% url 'pages:home' %}" 
           class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors {% if request.resolver_match.url_name == 'home' %}text-[#3730A3]{% endif %}">
          Home
        </a>
        <a href="{% url 'gallery:artwork_list' %}" 
           class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors {% if 'gallery' in request.path %}text-[#3730A3]{% endif %}">
          Gallery
        </a>
        <a href="{% url 'exhibitions:exhibition_list' %}" 
           class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors {% if 'exhibitions' in request.path %}text-[#3730A3]{% endif %}">
          Exhibitions
        </a>
        <a href="{% url 'shop:product_list' %}" 
           class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors {% if 'shop' in request.path %}text-[#3730A3]{% endif %}">
          Shop
        </a>
        <a href="{% url 'pages:about' %}" 
           class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors {% if request.resolver_match.url_name == 'about' %}text-[#3730A3]{% endif %}">
          About
        </a>
      </div>

      <!-- Right Icons -->
      <div class="flex items-center space-x-4">
        <!-- Search (optional) -->
        <button class="hidden sm:flex text-gray-700 hover:text-[#3730A3]" aria-label="Search">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        <!-- User Icon -->
        <a href="#" class="text-gray-700 hover:text-[#3730A3]" aria-label="Account">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </a>
        
        <!-- Cart -->
        <a href="{% url 'cart:cart_detail' %}" class="relative" aria-label="Shopping cart">
          <svg class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {% if cart|length > 0 %}
          <span class="absolute -top-2 -right-2 bg-[#FF6B6B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-['Inter']">
            {{ cart|length }}
          </span>
          {% endif %}
        </a>
        
        <!-- Mobile menu button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-gray-700"
          aria-label="Toggle menu"
          :aria-expanded="mobileMenuOpen"
        >
          <svg x-show="!mobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg x-show="mobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div x-show="mobileMenuOpen" 
         x-transition
         class="md:hidden py-4 border-t border-gray-200">
      <div class="flex flex-col space-y-4">
        <a href="{% url 'pages:home' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">
          Home
        </a>
        <a href="{% url 'gallery:artwork_list' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">
          Gallery
        </a>
        <a href="{% url 'exhibitions:exhibition_list' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">
          Exhibitions
        </a>
        <a href="{% url 'shop:product_list' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">
          Shop
        </a>
        <a href="{% url 'pages:about' %}" class="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors">
          About
        </a>
      </div>
    </div>
  </div>
</nav>
```

#### Footer Component

**templates/includes/components/footer.html**:

```django
<footer class="bg-[#3730A3] text-white mt-16" role="contentinfo">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <!-- Brand -->
      <div>
        <h3 class="font-['Playfair_Display'] text-2xl mb-4">
          ConstCollection
        </h3>
        <p class="font-['Inter'] text-gray-300 text-sm">
          Curating exceptional contemporary art for discerning collectors.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="font-['Inter'] mb-4">Quick Links</h4>
        <ul class="space-y-2 font-['Inter'] text-sm">
          <li>
            <a href="{% url 'gallery:artwork_list' %}" class="text-gray-300 hover:text-[#FF6B6B] transition-colors">
              Gallery
            </a>
          </li>
          <li>
            <a href="{% url 'exhibitions:exhibition_list' %}" class="text-gray-300 hover:text-[#FF6B6B] transition-colors">
              Exhibitions
            </a>
          </li>
          <li>
            <a href="{% url 'shop:product_list' %}" class="text-gray-300 hover:text-[#FF6B6B] transition-colors">
              Shop
            </a>
          </li>
          <li>
            <a href="{% url 'pages:about' %}" class="text-gray-300 hover:text-[#FF6B6B] transition-colors">
              About Us
            </a>
          </li>
        </ul>
      </div>

      <!-- Support -->
      <div>
        <h4 class="font-['Inter'] mb-4">Support</h4>
        <ul class="space-y-2 font-['Inter'] text-sm">
          <li>
            <a href="#" class="text-gray-300 hover:text-[#FF6B6B] transition-colors">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" class="text-gray-300 hover:text-[#FF6B6B] transition-colors">
              Shipping Info
            </a>
          </li>
          <li>
            <a href="#" class="text-gray-300 hover:text-[#FF6B6B] transition-colors">
              Returns
            </a>
          </li>
          <li>
            <a href="#" class="text-gray-300 hover:text-[#FF6B6B] transition-colors">
              FAQ
            </a>
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h4 class="font-['Inter'] mb-4">Stay Connected</h4>
        <p class="font-['Inter'] text-gray-300 text-sm mb-4">
          Subscribe to our newsletter for updates.
        </p>
        <div class="flex space-x-4">
          <a href="https://instagram.com" class="text-gray-300 hover:text-[#FF6B6B] transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://facebook.com" class="text-gray-300 hover:text-[#FF6B6B] transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://twitter.com" class="text-gray-300 hover:text-[#FF6B6B] transition-colors" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="mailto:info@constcollection.com" class="text-gray-300 hover:text-[#FF6B6B] transition-colors" aria-label="Email">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="border-t border-white/20 mt-8 pt-8 text-center">
      <p class="font-['Inter'] text-gray-300 text-sm">
        © {% now "Y" %} ConstCollection. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

#### Artwork Card Component

**templates/includes/components/artwork_card.html**:

```django
{% load static %}

<article class="group cursor-pointer">
  <!-- Image Container -->
  <div class="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4] mb-4">
    <a href="{{ artwork.get_absolute_url }}">
      <img src="{{ artwork.image_main.url }}" 
           alt="{{ artwork.title }} by {{ artwork.artist.name }}" 
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
           loading="lazy">
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
    
    <!-- Like Button (requires Alpine.js state) -->
    <div x-data="{ liked: false }">
      <button
        @click.prevent="liked = !liked"
        class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
        :aria-label="liked ? 'Unlike artwork' : 'Like artwork'"
      >
        <svg 
          class="h-5 w-5 transition-colors"
          :class="liked ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-gray-600'"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Info -->
  <div class="space-y-1">
    <h3 class="font-['Playfair_Display'] text-lg group-hover:text-[#3730A3] transition-colors">
      <a href="{{ artwork.get_absolute_url }}">{{ artwork.title }}</a>
    </h3>
    <p class="font-['Inter'] text-gray-600 text-sm">
      {{ artwork.artist.name }}
    </p>
    {% if artwork.medium and artwork.year %}
    <p class="font-['Inter'] text-gray-500 text-xs">
      {{ artwork.get_medium_display }}, {{ artwork.year }}
    </p>
    {% endif %}
    <p class="font-['Inter'] text-[#3730A3] mt-2">
      ${{ artwork.price|floatformat:0 }}
    </p>
  </div>
</article>
```

#### Product Card Component

**templates/includes/components/product_card.html**:

```django
{% load static %}

<article class="group">
  <!-- Image -->
  <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4 cursor-pointer">
    <a href="{{ product.get_absolute_url }}">
      <img src="{{ product.image.url }}" 
           alt="{{ product.name }}" 
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           loading="lazy">
    </a>
    
    {% if not product.is_in_stock %}
    <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
      <span class="bg-white/90 text-gray-900 font-['Inter'] text-sm px-3 py-1 rounded-md">
        Out of Stock
      </span>
    </div>
    {% elif product.is_low_stock %}
    <span class="absolute top-3 left-3 bg-[#FF6B6B] text-white font-['Inter'] text-xs px-3 py-1 rounded-md">
      Low Stock
    </span>
    {% endif %}
  </div>

  <!-- Info -->
  <div class="space-y-2">
    {% if product.category %}
    <p class="font-['Inter'] text-xs text-gray-500 uppercase tracking-wide">
      {{ product.category.name }}
    </p>
    {% endif %}
    <h3 class="font-['Inter'] group-hover:text-[#3730A3] transition-colors">
      <a href="{{ product.get_absolute_url }}">{{ product.name }}</a>
    </h3>
    <div class="flex items-center justify-between">
      <p class="font-['Inter'] text-[#3730A3]">
        ${{ product.price|floatformat:0 }}
      </p>
      <form method="post" action="{% url 'cart:cart_add' product.id %}">
        {% csrf_token %}
        <input type="hidden" name="quantity" value="1">
        <input type="hidden" name="override" value="False">
        <button type="submit" 
                {% if not product.is_in_stock %}disabled{% endif %}
                class="bg-[#3730A3] hover:bg-[#312E81] text-white text-sm px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span class="font-['Inter']">Add</span>
        </button>
      </form>
    </div>
  </div>
</article>
```

### 5.3 Page Templates

#### Home Page

**templates/pages/home.html**:

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Home - ConstCollection{% endblock %}

{% block content %}

<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-[#3730A3] to-[#312E81] text-white overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
      
      <!-- Text Content -->
      <div class="z-10">
        <h1 class="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
          Discover Extraordinary Art
        </h1>
        <p class="font-['Inter'] text-lg sm:text-xl text-gray-200 mb-8 max-w-lg">
          Curated collection of contemporary masterpieces from emerging and established artists
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="{% url 'gallery:artwork_list' %}" 
             class="bg-[#FF6B6B] hover:bg-[#EE5A52] text-white px-8 py-6 rounded-lg inline-flex items-center justify-center group transition-colors">
            <span class="font-['Inter']">Explore Gallery</span>
            <svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="{% url 'exhibitions:exhibition_list' %}" 
             class="border-2 border-white text-white hover:bg-white hover:text-[#3730A3] px-8 py-6 rounded-lg inline-flex items-center justify-center transition-colors">
            <span class="font-['Inter']">View Exhibitions</span>
          </a>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
        <div class="relative h-[400px] lg:h-full rounded-lg lg:rounded-none overflow-hidden">
          {% if featured_artworks.0.image_main %}
          <img src="{{ featured_artworks.0.image_main.url }}" alt="Featured artwork" class="w-full h-full object-cover">
          {% else %}
          <div class="w-full h-full bg-gradient-to-br from-[#FF6B6B]/20 to-transparent flex items-center justify-center">
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-4 border-4 border-white/30 rounded-full"></div>
              <p class="font-['Inter'] text-white/60">Featured Artwork</p>
            </div>
          </div>
          {% endif %}
          <div class="absolute inset-0 bg-gradient-to-t from-[#3730A3]/50 to-transparent lg:bg-gradient-to-r"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Decorative Elements -->
  <div class="absolute top-0 right-0 w-64 h-64 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B6B]/5 rounded-full blur-3xl"></div>
</section>

<!-- Featured Artworks -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h2 class="font-['Playfair_Display'] text-3xl sm:text-4xl mb-2">
        Featured Artworks
      </h2>
      <p class="font-['Inter'] text-gray-600">
        Handpicked masterpieces from our curated collection
      </p>
    </div>
    <a href="{% url 'gallery:artwork_list' %}" 
       class="hidden sm:flex items-center border border-[#3730A3] text-[#3730A3] hover:bg-[#3730A3] hover:text-white px-6 py-2 rounded-md transition-colors">
      <span class="font-['Inter']">View All</span>
      <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  </div>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
    {% for artwork in featured_artworks %}
      {% include 'includes/components/artwork_card.html' %}
    {% empty %}
      <div class="col-span-full text-center py-16">
        <p class="font-['Inter'] text-gray-500">No featured artworks at this time</p>
      </div>
    {% endfor %}
  </div>
</section>

<!-- Current Exhibition -->
{% if current_exhibition %}
<section class="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="order-2 lg:order-1">
        <div class="flex items-center gap-2 text-[#FF6B6B] mb-4">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="font-['Inter'] uppercase text-sm tracking-wide">
            Current Exhibition
          </span>
        </div>
        <h2 class="font-['Playfair_Display'] text-3xl sm:text-4xl mb-4">
          {{ current_exhibition.title }}
        </h2>
        <p class="font-['Inter'] text-xl text-gray-600 mb-4">
          {{ current_exhibition.artist }}
        </p>
        <p class="font-['Inter'] text-gray-700 mb-6 leading-relaxed">
          {{ current_exhibition.description }}
        </p>
        <p class="font-['Inter'] text-sm text-gray-500 mb-6">
          {{ current_exhibition.start_date|date:"F j" }} - {{ current_exhibition.end_date|date:"F j, Y" }}
        </p>
        <a href="{{ current_exhibition.get_absolute_url }}" 
           class="inline-flex items-center bg-[#3730A3] hover:bg-[#312E81] text-white px-8 py-3 rounded-md transition-colors">
          <span class="font-['Inter']">View Exhibition Details</span>
          <svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
      <div class="order-1 lg:order-2">
        <div class="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
          <img src="{{ current_exhibition.image.url }}" alt="{{ current_exhibition.title }}" class="w-full h-full object-cover">
        </div>
      </div>
    </div>
  </div>
</section>
{% endif %}

<!-- Shop CTA -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div class="bg-[#3730A3] rounded-2xl p-8 sm:p-12 text-white text-center">
    <svg class="h-12 w-12 mx-auto mb-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
    <h2 class="font-['Playfair_Display'] text-3xl sm:text-4xl mb-4">
      Shop Art & Merchandise
    </h2>
    <p class="font-['Inter'] text-gray-200 mb-8 max-w-2xl mx-auto">
      Discover prints, books, and exclusive items from our collection. Perfect for art enthusiasts and collectors.
    </p>
    <a href="{% url 'shop:product_list' %}" 
       class="inline-flex items-center bg-[#FF6B6B] hover:bg-[#EE5A52] text-white px-8 py-3 rounded-md transition-colors">
      <span class="font-['Inter']">Browse Shop</span>
      <svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  </div>
</section>

{% endblock %}
```

*Continue to the next file for Gallery and Shop page templates...*
