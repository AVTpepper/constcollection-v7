# Complete Django Conversion Guide - Step by Step

This guide provides detailed instructions for converting the ConstCollection React prototype to a full Django application.

## Table of Contents
1. [Project Setup](#1-project-setup)
2. [Django Apps Structure](#2-django-apps-structure)
3. [Database Models](#3-database-models)
4. [Views & URLs](#4-views--urls)
5. [Template Conversion](#5-template-conversion)
6. [Static Files & Tailwind](#6-static-files--tailwind)
7. [Forms](#7-forms)
8. [Cart & Session Management](#8-cart--session-management)
9. [Admin Configuration](#9-admin-configuration)
10. [Deployment](#10-deployment)

---

## 1. Project Setup

### 1.1 Create Virtual Environment

```bash
# Create project directory
mkdir constcollection
cd constcollection

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### 1.2 Install Dependencies

Create `requirements.txt`:

```txt
Django==4.2.7
Pillow==10.1.0
python-decouple==3.8
psycopg2-binary==2.9.9
django-crispy-forms==2.1
crispy-tailwind==0.5.0
stripe==7.4.0
django-environ==0.11.2
whitenoise==6.6.0
gunicorn==21.2.0
```

Install:
```bash
pip install -r requirements.txt
```

### 1.3 Create Django Project

```bash
# Create Django project
django-admin startproject config .

# Create apps
python manage.py startapp gallery
python manage.py startapp shop
python manage.py startapp cart
python manage.py startapp orders
python manage.py startapp exhibitions
python manage.py startapp pages
```

### 1.4 Project Structure

```
constcollection/
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── gallery/              # Artworks and artists
├── shop/                 # Products and merchandise
├── cart/                 # Shopping cart
├── orders/               # Order processing
├── exhibitions/          # Exhibition management
├── pages/                # Static pages (home, about)
├── static/
│   ├── css/
│   │   └── output.css    # Compiled Tailwind CSS
│   ├── js/
│   │   └── main.js       # Custom JavaScript
│   └── images/
├── media/                # User uploaded files
├── templates/
│   ├── base.html
│   ├── includes/
│   │   └── components/
│   └── pages/
├── manage.py
└── requirements.txt
```

---

## 2. Django Apps Structure

### 2.1 Configure Settings

**config/settings.py**:

```python
import os
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='your-secret-key-here')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=lambda v: [s.strip() for s in v.split(',')])

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party
    'crispy_forms',
    'crispy_tailwind',
    
    # Local apps
    'gallery.apps.GalleryConfig',
    'shop.apps.ShopConfig',
    'cart.apps.CartConfig',
    'orders.apps.OrdersConfig',
    'exhibitions.apps.ExhibitionsConfig',
    'pages.apps.PagesConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # For static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media',
                'cart.context_processors.cart',  # Custom context processor
            ],
        },
    },
]

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='constcollection'),
        'USER': config('DB_USER', default='postgres'),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# For development, you can use SQLite:
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files (User uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Crispy Forms
CRISPY_ALLOWED_TEMPLATE_PACKS = "tailwind"
CRISPY_TEMPLATE_PACK = "tailwind"

# Session configuration
SESSION_COOKIE_AGE = 86400 * 30  # 30 days
CART_SESSION_ID = 'cart'

# Stripe
STRIPE_PUBLIC_KEY = config('STRIPE_PUBLIC_KEY', default='')
STRIPE_SECRET_KEY = config('STRIPE_SECRET_KEY', default='')
STRIPE_WEBHOOK_SECRET = config('STRIPE_WEBHOOK_SECRET', default='')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```

### 2.2 Create .env File

**.env** (don't commit to git):

```env
SECRET_KEY=your-very-secret-key-here-change-this
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=constcollection
DB_USER=postgres
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432

STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

### 2.3 Create .gitignore

**.gitignore**:

```
# Python
*.py[cod]
*$py.class
__pycache__/
*.so
.Python
venv/
env/
ENV/

# Django
*.log
db.sqlite3
db.sqlite3-journal
/media
/staticfiles

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Tailwind
node_modules/
```

---

## 3. Database Models

### 3.1 Gallery App Models

**gallery/models.py**:

```python
from django.db import models
from django.urls import reverse
from django.utils.text import slugify

class Artist(models.Model):
    """Artist model"""
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='artists/', blank=True, null=True)
    website = models.URLField(blank=True)
    instagram = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('gallery:artist_detail', kwargs={'slug': self.slug})


class Artwork(models.Model):
    """Artwork model"""
    MEDIUM_CHOICES = [
        ('oil', 'Oil on Canvas'),
        ('acrylic', 'Acrylic on Canvas'),
        ('watercolor', 'Watercolor'),
        ('mixed', 'Mixed Media'),
        ('digital', 'Digital Print'),
        ('sculpture', 'Sculpture'),
        ('photography', 'Photography'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='artworks')
    description = models.TextField()
    
    # Images
    image_main = models.ImageField(upload_to='artworks/')
    image_detail_1 = models.ImageField(upload_to='artworks/', blank=True, null=True)
    image_detail_2 = models.ImageField(upload_to='artworks/', blank=True, null=True)
    
    # Specifications
    medium = models.CharField(max_length=50, choices=MEDIUM_CHOICES)
    dimensions = models.CharField(max_length=100, help_text='e.g., 36 x 48 inches')
    year = models.IntegerField()
    
    # Pricing & Availability
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    
    # SEO
    meta_description = models.CharField(max_length=160, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Artworks'
        
    def __str__(self):
        return f"{self.title} by {self.artist.name}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(f"{self.title}-{self.artist.name}")
            self.slug = base_slug
            # Ensure unique slug
            counter = 1
            while Artwork.objects.filter(slug=self.slug).exists():
                self.slug = f"{base_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('gallery:artwork_detail', kwargs={'slug': self.slug})
    
    def get_all_images(self):
        """Return list of all artwork images"""
        images = [{'url': self.image_main.url, 'alt': f"{self.title} - Main view"}]
        if self.image_detail_1:
            images.append({'url': self.image_detail_1.url, 'alt': f"{self.title} - Detail 1"})
        if self.image_detail_2:
            images.append({'url': self.image_detail_2.url, 'alt': f"{self.title} - Detail 2"})
        return images
```

### 3.2 Shop App Models

**shop/models.py**:

```python
from django.db import models
from django.urls import reverse
from django.utils.text import slugify

class Category(models.Model):
    """Product category"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Categories'
        
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    """Shop product model"""
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('shop:product_detail', kwargs={'slug': self.slug})
    
    @property
    def is_in_stock(self):
        return self.stock > 0
    
    @property
    def is_low_stock(self):
        return 0 < self.stock < 5
```

### 3.3 Exhibitions App Models

**exhibitions/models.py**:

```python
from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.utils import timezone

class Exhibition(models.Model):
    """Exhibition model"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    artist = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='exhibitions/')
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=200, default='Main Gallery')
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-start_date']
        
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('exhibitions:exhibition_detail', kwargs={'slug': self.slug})
    
    @property
    def is_current(self):
        today = timezone.now().date()
        return self.start_date <= today <= self.end_date
    
    @property
    def is_upcoming(self):
        today = timezone.now().date()
        return self.start_date > today
    
    @property
    def is_past(self):
        today = timezone.now().date()
        return self.end_date < today
```

### 3.4 Orders App Models

**orders/models.py**:

```python
from django.db import models
from django.contrib.auth.models import User
from gallery.models import Artwork
from shop.models import Product

class Order(models.Model):
    """Order model"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    # Customer info
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    
    # Shipping address
    address = models.CharField(max_length=250)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    
    # Order details
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Payment
    stripe_payment_intent = models.CharField(max_length=250, blank=True)
    paid = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"Order #{self.id}"
    
    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())
    
    def get_subtotal(self):
        return self.get_total_cost()
    
    def get_shipping(self):
        return 15.00 if self.get_subtotal() > 0 else 0
    
    def get_tax(self):
        return self.get_subtotal() * 0.08
    
    def get_total(self):
        return self.get_subtotal() + self.get_shipping() + self.get_tax()


class OrderItem(models.Model):
    """Order item model"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    
    # Can be either artwork or product
    artwork = models.ForeignKey(Artwork, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Item details (stored to preserve at time of order)
    item_name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f"{self.item_name} x {self.quantity}"
    
    def get_cost(self):
        return self.price * self.quantity
```

### 3.5 Run Migrations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

---

## 4. Views & URLs

### 4.1 Gallery Views

**gallery/views.py**:

```python
from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from .models import Artwork, Artist

class ArtworkListView(ListView):
    """Gallery page - list all artworks"""
    model = Artwork
    template_name = 'pages/gallery.html'
    context_object_name = 'artworks'
    paginate_by = 12
    
    def get_queryset(self):
        queryset = Artwork.objects.filter(is_available=True)
        
        # Filter by medium
        medium = self.request.GET.get('medium')
        if medium and medium != 'all':
            queryset = queryset.filter(medium=medium)
        
        # Sort
        sort = self.request.GET.get('sort', 'featured')
        if sort == 'price-low':
            queryset = queryset.order_by('price')
        elif sort == 'price-high':
            queryset = queryset.order_by('-price')
        elif sort == 'newest':
            queryset = queryset.order_by('-year', '-created_at')
        elif sort == 'artist':
            queryset = queryset.order_by('artist__name')
        else:  # featured
            queryset = queryset.order_by('-is_featured', '-created_at')
        
        return queryset
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['medium_choices'] = Artwork.MEDIUM_CHOICES
        context['current_medium'] = self.request.GET.get('medium', 'all')
        context['current_sort'] = self.request.GET.get('sort', 'featured')
        return context


class ArtworkDetailView(DetailView):
    """Artwork detail page"""
    model = Artwork
    template_name = 'pages/artwork_detail.html'
    context_object_name = 'artwork'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['images'] = self.object.get_all_images()
        return context


class ArtistDetailView(DetailView):
    """Artist detail page"""
    model = Artist
    template_name = 'pages/artist_detail.html'
    context_object_name = 'artist'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['artworks'] = self.object.artworks.filter(is_available=True)
        return context
```

**gallery/urls.py**:

```python
from django.urls import path
from . import views

app_name = 'gallery'

urlpatterns = [
    path('', views.ArtworkListView.as_view(), name='artwork_list'),
    path('artwork/<slug:slug>/', views.ArtworkDetailView.as_view(), name='artwork_detail'),
    path('artist/<slug:slug>/', views.ArtistDetailView.as_view(), name='artist_detail'),
]
```

### 4.2 Shop Views

**shop/views.py**:

```python
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Product, Category

class ProductListView(ListView):
    """Shop page"""
    model = Product
    template_name = 'pages/shop.html'
    context_object_name = 'products'
    paginate_by = 12
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        
        # Filter by category
        category = self.request.GET.get('category')
        if category and category != 'all':
            queryset = queryset.filter(category__slug=category)
        
        # Sort
        sort = self.request.GET.get('sort', 'featured')
        if sort == 'price-low':
            queryset = queryset.order_by('price')
        elif sort == 'price-high':
            queryset = queryset.order_by('-price')
        elif sort == 'name':
            queryset = queryset.order_by('name')
        else:
            queryset = queryset.order_by('-created_at')
        
        return queryset
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['current_category'] = self.request.GET.get('category', 'all')
        context['current_sort'] = self.request.GET.get('sort', 'featured')
        return context


class ProductDetailView(DetailView):
    """Product detail page"""
    model = Product
    template_name = 'pages/product_detail.html'
    context_object_name = 'product'
```

**shop/urls.py**:

```python
from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    path('', views.ProductListView.as_view(), name='product_list'),
    path('product/<slug:slug>/', views.ProductDetailView.as_view(), name='product_detail'),
]
```

### 4.3 Pages Views

**pages/views.py**:

```python
from django.shortcuts import render
from gallery.models import Artwork
from exhibitions.models import Exhibition
from django.views.generic import TemplateView

class HomePageView(TemplateView):
    """Home page"""
    template_name = 'pages/home.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['featured_artworks'] = Artwork.objects.filter(
            is_featured=True, 
            is_available=True
        )[:4]
        context['current_exhibition'] = Exhibition.objects.filter(
            is_published=True
        ).order_by('-start_date').first()
        return context


class AboutPageView(TemplateView):
    """About page"""
    template_name = 'pages/about.html'
```

**pages/urls.py**:

```python
from django.urls import path
from . import views

app_name = 'pages'

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
    path('about/', views.AboutPageView.as_view(), name='about'),
]
```

### 4.4 Main URLs Configuration

**config/urls.py**:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pages.urls')),
    path('gallery/', include('gallery.urls')),
    path('shop/', include('shop.urls')),
    path('cart/', include('cart.urls')),
    path('orders/', include('orders.urls')),
    path('exhibitions/', include('exhibitions.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

---

*This is Part 1 of the guide. Continue to the next section for Template Conversion...*
