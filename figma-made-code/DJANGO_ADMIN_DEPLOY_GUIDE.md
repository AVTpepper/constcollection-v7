# Django Admin & Deployment Guide - Part 4 (Final)

This is the final part of the Django conversion guide covering admin configuration and deployment.

## 9. Admin Configuration

### 9.1 Gallery Admin

**gallery/admin.py**:

```python
from django.contrib import admin
from django.utils.html import format_html
from .models import Artist, Artwork

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    """Artist admin"""
    list_display = ['name', 'website', 'created_at']
    search_fields = ['name', 'bio']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'bio', 'photo')
        }),
        ('Social Media', {
            'fields': ('website', 'instagram'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    """Artwork admin"""
    list_display = [
        'thumbnail', 'title', 'artist', 'medium', 'year', 
        'price', 'is_available', 'is_featured', 'is_new'
    ]
    list_filter = ['is_available', 'is_featured', 'is_new', 'medium', 'year']
    search_fields = ['title', 'artist__name', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_available', 'is_featured', 'is_new']
    list_per_page = 25
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'artist', 'description')
        }),
        ('Images', {
            'fields': ('image_main', 'image_detail_1', 'image_detail_2')
        }),
        ('Specifications', {
            'fields': ('medium', 'dimensions', 'year')
        }),
        ('Pricing & Availability', {
            'fields': ('price', 'is_available')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'is_new')
        }),
        ('SEO', {
            'fields': ('meta_description',),
            'classes': ('collapse',)
        }),
    )
    
    def thumbnail(self, obj):
        """Display thumbnail in list view"""
        if obj.image_main:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.image_main.url
            )
        return '-'
    thumbnail.short_description = 'Image'
    
    actions = ['make_featured', 'remove_featured', 'mark_as_new', 'mark_available']
    
    def make_featured(self, request, queryset):
        """Mark artworks as featured"""
        updated = queryset.update(is_featured=True)
        self.message_user(request, f'{updated} artwork(s) marked as featured.')
    make_featured.short_description = 'Mark selected as featured'
    
    def remove_featured(self, request, queryset):
        """Remove featured status"""
        updated = queryset.update(is_featured=False)
        self.message_user(request, f'{updated} artwork(s) unmarked as featured.')
    remove_featured.short_description = 'Remove featured status'
    
    def mark_as_new(self, request, queryset):
        """Mark artworks as new"""
        updated = queryset.update(is_new=True)
        self.message_user(request, f'{updated} artwork(s) marked as new.')
    mark_as_new.short_description = 'Mark selected as new'
    
    def mark_available(self, request, queryset):
        """Mark artworks as available"""
        updated = queryset.update(is_available=True)
        self.message_user(request, f'{updated} artwork(s) marked as available.')
    mark_available.short_description = 'Mark as available'
```

### 9.2 Shop Admin

**shop/admin.py**:

```python
from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Category admin"""
    list_display = ['name', 'slug', 'product_count']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    
    def product_count(self, obj):
        """Display product count"""
        return obj.products.count()
    product_count.short_description = 'Products'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Product admin"""
    list_display = [
        'thumbnail', 'name', 'category', 'price', 
        'stock', 'stock_status', 'is_active'
    ]
    list_filter = ['is_active', 'category', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['price', 'stock', 'is_active']
    list_per_page = 25
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'category', 'description')
        }),
        ('Image', {
            'fields': ('image',)
        }),
        ('Pricing & Stock', {
            'fields': ('price', 'stock')
        }),
        ('Availability', {
            'fields': ('is_active',)
        }),
    )
    
    def thumbnail(self, obj):
        """Display thumbnail"""
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url
            )
        return '-'
    thumbnail.short_description = 'Image'
    
    def stock_status(self, obj):
        """Display stock status with color"""
        if obj.stock == 0:
            color = 'red'
            text = 'Out of Stock'
        elif obj.stock < 5:
            color = 'orange'
            text = 'Low Stock'
        else:
            color = 'green'
            text = 'In Stock'
        return format_html(
            '<span style="color: {};">{}</span>',
            color, text
        )
    stock_status.short_description = 'Status'
    
    actions = ['mark_active', 'mark_inactive', 'restock']
    
    def mark_active(self, request, queryset):
        """Mark products as active"""
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} product(s) marked as active.')
    mark_active.short_description = 'Mark as active'
    
    def mark_inactive(self, request, queryset):
        """Mark products as inactive"""
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} product(s) marked as inactive.')
    mark_inactive.short_description = 'Mark as inactive'
```

### 9.3 Exhibitions Admin

**exhibitions/admin.py**:

```python
from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import Exhibition

@admin.register(Exhibition)
class ExhibitionAdmin(admin.ModelAdmin):
    """Exhibition admin"""
    list_display = [
        'thumbnail', 'title', 'artist', 'start_date', 
        'end_date', 'exhibition_status', 'is_published'
    ]
    list_filter = ['is_published', 'start_date']
    search_fields = ['title', 'artist', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_published']
    date_hierarchy = 'start_date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'artist', 'description', 'image')
        }),
        ('Schedule', {
            'fields': ('start_date', 'end_date', 'location')
        }),
        ('Publishing', {
            'fields': ('is_published',)
        }),
    )
    
    def thumbnail(self, obj):
        """Display thumbnail"""
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url
            )
        return '-'
    thumbnail.short_description = 'Image'
    
    def exhibition_status(self, obj):
        """Display exhibition status with color"""
        today = timezone.now().date()
        if obj.start_date <= today <= obj.end_date:
            color = 'green'
            text = 'Current'
        elif obj.start_date > today:
            color = 'blue'
            text = 'Upcoming'
        else:
            color = 'gray'
            text = 'Past'
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color, text
        )
    exhibition_status.short_description = 'Status'
```

### 9.4 Orders Admin

**orders/admin.py**:

```python
from django.contrib import admin
from django.utils.html import format_html
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    """Inline for order items"""
    model = OrderItem
    raw_id_fields = ['artwork', 'product']
    extra = 0
    readonly_fields = ['item_name', 'price', 'get_cost']
    
    def get_cost(self, obj):
        return f'${obj.get_cost():.2f}'
    get_cost.short_description = 'Total'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """Order admin"""
    list_display = [
        'id', 'customer_name', 'email', 'status', 
        'payment_status', 'total_cost', 'created_at'
    ]
    list_filter = ['status', 'paid', 'created_at']
    search_fields = ['id', 'first_name', 'last_name', 'email']
    readonly_fields = ['created_at', 'updated_at', 'get_total_cost']
    list_editable = ['status']
    date_hierarchy = 'created_at'
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Customer Information', {
            'fields': ('user', 'first_name', 'last_name', 'email')
        }),
        ('Shipping Address', {
            'fields': ('address', 'city', 'state', 'zip_code', 'country')
        }),
        ('Order Details', {
            'fields': ('status', 'created_at', 'updated_at', 'get_total_cost')
        }),
        ('Payment', {
            'fields': ('paid', 'stripe_payment_intent')
        }),
    )
    
    def customer_name(self, obj):
        """Display customer full name"""
        return f'{obj.first_name} {obj.last_name}'
    customer_name.short_description = 'Customer'
    
    def payment_status(self, obj):
        """Display payment status with color"""
        if obj.paid:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Paid</span>'
            )
        return format_html(
            '<span style="color: red; font-weight: bold;">✗ Unpaid</span>'
        )
    payment_status.short_description = 'Payment'
    
    def total_cost(self, obj):
        """Display total cost"""
        return f'${obj.get_total():.2f}'
    total_cost.short_description = 'Total'
    
    def get_total_cost(self, obj):
        """Display detailed cost breakdown"""
        subtotal = obj.get_subtotal()
        shipping = obj.get_shipping()
        tax = obj.get_tax()
        total = obj.get_total()
        return format_html(
            '<strong>Subtotal:</strong> ${:.2f}<br>'
            '<strong>Shipping:</strong> ${:.2f}<br>'
            '<strong>Tax:</strong> ${:.2f}<br>'
            '<strong>Total:</strong> ${:.2f}',
            subtotal, shipping, tax, total
        )
    get_total_cost.short_description = 'Cost Breakdown'
    
    actions = ['mark_as_processing', 'mark_as_shipped']
    
    def mark_as_processing(self, request, queryset):
        """Mark orders as processing"""
        updated = queryset.update(status='processing')
        self.message_user(request, f'{updated} order(s) marked as processing.')
    mark_as_processing.short_description = 'Mark as processing'
    
    def mark_as_shipped(self, request, queryset):
        """Mark orders as shipped"""
        updated = queryset.update(status='shipped')
        self.message_user(request, f'{updated} order(s) marked as shipped.')
    mark_as_shipped.short_description = 'Mark as shipped'
```

### 9.5 Customize Admin Site

**config/admin.py** (create this file):

```python
from django.contrib import admin

# Customize admin site
admin.site.site_header = "ConstCollection Administration"
admin.site.site_title = "ConstCollection Admin"
admin.site.index_title = "Welcome to ConstCollection Administration"
```

Import in `config/__init__.py`:
```python
default_app_config = 'config.apps.ConfigConfig'
```

---

## 10. Deployment

### 10.1 Production Settings

Create **config/settings_prod.py**:

```python
from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Database (use environment variables)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# AWS S3 for media files (optional)
# AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
# AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```

### 10.2 Collect Static Files

```bash
# Build Tailwind CSS for production
npm run build

# Collect static files
python manage.py collectstatic --noinput
```

### 10.3 Database Migration

```bash
# Make migrations
python manage.py makemigrations

# Show migration SQL
python manage.py sqlmigrate gallery 0001

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 10.4 Heroku Deployment

Create **Procfile**:
```
web: gunicorn config.wsgi --log-file -
release: python manage.py migrate
```

Create **runtime.txt**:
```
python-3.11.5
```

Deploy commands:
```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create constcollection

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set SECRET_KEY='your-secret-key'
heroku config:set DEBUG=False
heroku config:set STRIPE_PUBLIC_KEY='your-stripe-public-key'
heroku config:set STRIPE_SECRET_KEY='your-stripe-secret-key'

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate

# Create superuser
heroku run python manage.py createsuperuser

# Collect static files
heroku run python manage.py collectstatic --noinput
```

### 10.5 DigitalOcean Deployment

1. **Create Droplet**
   - Ubuntu 22.04
   - Install Python, PostgreSQL, Nginx

2. **Install Requirements**
```bash
sudo apt update
sudo apt install python3-pip python3-venv postgresql nginx
```

3. **Setup Project**
```bash
cd /var/www
git clone your-repo
cd constcollection
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

4. **Configure Nginx**

Create **/etc/nginx/sites-available/constcollection**:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        alias /var/www/constcollection/staticfiles/;
    }
    
    location /media/ {
        alias /var/www/constcollection/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/constcollection/constcollection.sock;
    }
}
```

5. **Create Systemd Service**

Create **/etc/systemd/system/constcollection.service**:
```ini
[Unit]
Description=ConstCollection Django App
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/constcollection
Environment="PATH=/var/www/constcollection/venv/bin"
ExecStart=/var/www/constcollection/venv/bin/gunicorn --workers 3 --bind unix:/var/www/constcollection/constcollection.sock config.wsgi:application

[Install]
WantedBy=multi-user.target
```

6. **Start Services**
```bash
sudo systemctl start constcollection
sudo systemctl enable constcollection
sudo systemctl restart nginx
```

### 10.6 Testing Checklist

Before deployment, test:

- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works on all devices
- [ ] Forms submit successfully
- [ ] Cart add/remove/update works
- [ ] Checkout process completes
- [ ] Admin panel is accessible
- [ ] Email notifications work
- [ ] Search functionality
- [ ] 404/500 error pages
- [ ] SSL certificate installed
- [ ] Database backups configured
- [ ] Media files served correctly
- [ ] Static files cached properly

### 10.7 Performance Optimization

**Add to settings.py**:

```python
# Caching
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}

# Session cache
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

# Template caching
TEMPLATES[0]['OPTIONS']['loaders'] = [
    ('django.template.loaders.cached.Loader', [
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    ]),
]
```

### 10.8 Monitoring & Maintenance

**Install Sentry for error tracking**:

```bash
pip install sentry-sdk
```

**Add to settings.py**:
```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn=config('SENTRY_DSN'),
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)
```

---

## Summary

You now have a complete Django conversion of the ConstCollection React prototype:

1. ✅ **Project Structure** - Organized Django apps
2. ✅ **Database Models** - Gallery, Shop, Cart, Orders, Exhibitions
3. ✅ **Views & URLs** - Class-based and function views
4. ✅ **Templates** - Django templates with Tailwind CSS
5. ✅ **Static Files** - Tailwind CSS setup and optimization
6. ✅ **Forms** - Django forms with validation
7. ✅ **Cart** - Session-based shopping cart
8. ✅ **Admin** - Fully customized admin interface
9. ✅ **Deployment** - Production-ready configuration
10. ✅ **Testing** - Deployment checklist

### Next Steps:

1. **Add Features**:
   - User authentication (login/register)
   - Wishlist functionality
   - Product reviews
   - Order email notifications
   - Admin dashboard analytics

2. **Optimize**:
   - Image optimization
   - Database query optimization
   - CDN integration
   - Progressive Web App (PWA)

3. **Security**:
   - Regular security updates
   - Penetration testing
   - GDPR compliance
   - Backup strategy

### Helpful Commands:

```bash
# Development
python manage.py runserver
npm run dev  # Watch Tailwind changes

# Database
python manage.py makemigrations
python manage.py migrate
python manage.py dbshell

# Static files
python manage.py collectstatic
npm run build

# Testing
python manage.py test
python manage.py check --deploy

# Shell
python manage.py shell
python manage.py shell_plus  # If django-extensions installed
```

Good luck with your ConstCollection Django project! 🎨
