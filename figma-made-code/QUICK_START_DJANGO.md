# ConstCollection - Quick Start Django Guide

This is a condensed quick-start guide. For detailed instructions, see the full guides:
- `DJANGO_SETUP_GUIDE.md` - Project setup, models, views, URLs
- `DJANGO_TEMPLATES_GUIDE.md` - Template conversion and components
- `DJANGO_CART_TAILWIND_GUIDE.md` - Cart system and Tailwind setup
- `DJANGO_ADMIN_DEPLOY_GUIDE.md` - Admin configuration and deployment

---

## 🚀 Quick Setup (30 Minutes)

### Step 1: Create Project (5 min)

```bash
# Create directory and virtual environment
mkdir constcollection && cd constcollection
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Django and dependencies
pip install Django Pillow python-decouple psycopg2-binary django-crispy-forms crispy-tailwind stripe whitenoise gunicorn

# Create Django project and apps
django-admin startproject config .
python manage.py startapp gallery
python manage.py startapp shop
python manage.py startapp cart
python manage.py startapp orders
python manage.py startapp exhibitions
python manage.py startapp pages
```

### Step 2: Configure Settings (5 min)

**config/settings.py** - Add to `INSTALLED_APPS`:
```python
INSTALLED_APPS = [
    # ... default apps
    'crispy_forms',
    'crispy_tailwind',
    'gallery',
    'shop',
    'cart',
    'orders',
    'exhibitions',
    'pages',
]
```

Add to `MIDDLEWARE`:
```python
'whitenoise.middleware.WhiteNoiseMiddleware',  # After SecurityMiddleware
```

Add static/media configuration:
```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

CRISPY_ALLOWED_TEMPLATE_PACKS = "tailwind"
CRISPY_TEMPLATE_PACK = "tailwind"
```

### Step 3: Create Models (5 min)

Copy model code from `DJANGO_SETUP_GUIDE.md` sections 3.1-3.4 into:
- `gallery/models.py` - Artist, Artwork
- `shop/models.py` - Category, Product
- `exhibitions/models.py` - Exhibition
- `orders/models.py` - Order, OrderItem

Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Step 4: Setup Tailwind (5 min)

```bash
# Install Node.js dependencies
npm init -y
npm install -D tailwindcss

# Initialize Tailwind
npx tailwindcss init
```

Create `static/css/input.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Update `tailwind.config.js`:
```javascript
module.exports = {
  content: ['./templates/**/*.html'],
  theme: {
    extend: {
      colors: {
        'brand-indigo': '#3730A3',
        'accent-coral': '#FF6B6B',
      },
    },
  },
}
```

Add to `package.json` scripts:
```json
"scripts": {
  "dev": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch",
  "build": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --minify"
}
```

Build CSS:
```bash
npm run dev  # In a separate terminal
```

### Step 5: Create Templates (5 min)

Create directory structure:
```
templates/
├── base.html
├── includes/
│   └── components/
│       ├── navigation.html
│       ├── footer.html
│       ├── artwork_card.html
│       └── product_card.html
└── pages/
    ├── home.html
    ├── gallery.html
    ├── artwork_detail.html
    ├── shop.html
    └── cart.html
```

Copy template code from `DJANGO_TEMPLATES_GUIDE.md` sections 5.1-5.3.

### Step 6: Create Views & URLs (3 min)

Copy view code from `DJANGO_SETUP_GUIDE.md` sections 4.1-4.3 into:
- `gallery/views.py`
- `shop/views.py`
- `pages/views.py`

Create URL files and copy from section 4.4:
- `gallery/urls.py`
- `shop/urls.py`
- `pages/urls.py`

Update `config/urls.py`:
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
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### Step 7: Setup Cart System (2 min)

Copy cart code from `DJANGO_CART_TAILWIND_GUIDE.md` section 8.1-8.4:
- `cart/cart.py` - Cart class
- `cart/context_processors.py` - Context processor
- `cart/views.py` - Cart views
- `cart/urls.py` - Cart URLs

Add to `settings.py`:
```python
TEMPLATES[0]['OPTIONS']['context_processors'].append('cart.context_processors.cart')
SESSION_COOKIE_AGE = 86400 * 30
CART_SESSION_ID = 'cart'
```

---

## 📦 Directory Structure

```
constcollection/
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── gallery/
│   ├── models.py (Artist, Artwork)
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── shop/
│   ├── models.py (Category, Product)
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── cart/
│   ├── cart.py
│   ├── views.py
│   ├── urls.py
│   └── context_processors.py
├── orders/
│   ├── models.py (Order, OrderItem)
│   ├── forms.py
│   ├── views.py
│   └── admin.py
├── exhibitions/
│   ├── models.py (Exhibition)
│   ├── views.py
│   └── admin.py
├── pages/
│   ├── views.py
│   └── urls.py
├── templates/
│   ├── base.html
│   ├── includes/components/
│   └── pages/
├── static/
│   ├── css/
│   │   ├── input.css
│   │   └── output.css
│   ├── js/
│   └── images/
├── media/
│   ├── artworks/
│   ├── products/
│   └── exhibitions/
├── manage.py
├── requirements.txt
├── package.json
└── tailwind.config.js
```

---

## 🎨 Key Components Reference

### Navigation
```django
{% include 'includes/components/navigation.html' %}
```
**Variables needed**: `cart` (from context processor)

### Artwork Card
```django
{% include 'includes/components/artwork_card.html' with artwork=artwork %}
```
**Variables needed**: `artwork` object

### Product Card
```django
{% include 'includes/components/product_card.html' with product=product %}
```
**Variables needed**: `product` object

### Footer
```django
{% include 'includes/components/footer.html' %}
```
**Variables needed**: None

---

## 🔧 Common Commands

### Development
```bash
# Run Django server
python manage.py runserver

# Watch Tailwind CSS changes (separate terminal)
npm run dev

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Production
```bash
# Build Tailwind CSS
npm run build

# Collect static files
python manage.py collectstatic

# Run with Gunicorn
gunicorn config.wsgi
```

---

## 📊 Database Models Quick Reference

### Artwork
```python
Artwork.objects.filter(is_featured=True)
Artwork.objects.filter(is_available=True)
artwork.get_absolute_url()
artwork.get_all_images()
```

### Product
```python
Product.objects.filter(is_active=True)
product.is_in_stock  # Boolean property
product.is_low_stock  # Boolean property
product.get_absolute_url()
```

### Exhibition
```python
Exhibition.objects.filter(is_published=True)
exhibition.is_current  # Property
exhibition.is_upcoming  # Property
```

### Cart
```python
cart = Cart(request)
cart.add(item, quantity=1)
cart.remove(item_key)
cart.get_total()
len(cart)  # Item count
```

---

## 🎯 URLs Reference

```python
# Pages
'pages:home'              # /
'pages:about'             # /about/

# Gallery
'gallery:artwork_list'    # /gallery/
'gallery:artwork_detail'  # /gallery/artwork/<slug>/
'gallery:artist_detail'   # /gallery/artist/<slug>/

# Shop
'shop:product_list'       # /shop/
'shop:product_detail'     # /shop/product/<slug>/

# Cart
'cart:cart_detail'        # /cart/
'cart:cart_add'           # /cart/add/<id>/
'cart:cart_remove'        # /cart/remove/<key>/

# Orders
'orders:checkout'         # /orders/checkout/
```

---

## 🎨 Tailwind Classes Reference

### Brand Colors
```html
<!-- Indigo (Primary) -->
text-[#3730A3]
bg-[#3730A3]
hover:bg-[#312E81]
border-[#3730A3]

<!-- Coral (Accent) -->
text-[#FF6B6B]
bg-[#FF6B6B]
hover:bg-[#EE5A52]
```

### Typography
```html
<!-- Headings (Playfair Display) -->
font-['Playfair_Display']

<!-- Body (Inter) -->
font-['Inter']
```

### Common Patterns
```html
<!-- Button Primary -->
class="bg-[#FF6B6B] hover:bg-[#EE5A52] text-white px-8 py-3 rounded-md font-['Inter']"

<!-- Button Secondary -->
class="bg-[#3730A3] hover:bg-[#312E81] text-white px-8 py-3 rounded-md font-['Inter']"

<!-- Button Outline -->
class="border-2 border-[#3730A3] text-[#3730A3] hover:bg-[#3730A3] hover:text-white px-8 py-3 rounded-md font-['Inter']"

<!-- Card -->
class="bg-white border border-gray-200 rounded-lg p-6"

<!-- Input -->
class="w-full px-4 py-2 border border-gray-300 rounded-md font-['Inter'] focus:ring-2 focus:ring-[#3730A3]"
```

---

## 🔍 Testing Checklist

- [ ] Home page loads
- [ ] Gallery page shows artworks
- [ ] Artwork detail page displays
- [ ] Shop page shows products
- [ ] Add to cart works
- [ ] Cart page displays items
- [ ] Cart quantity update works
- [ ] Remove from cart works
- [ ] Checkout form displays
- [ ] Admin panel accessible
- [ ] Images upload correctly
- [ ] Forms validate properly
- [ ] Mobile responsive
- [ ] Tailwind CSS compiled

---

## 🚨 Common Issues & Solutions

### Issue: Static files not loading
**Solution**:
```bash
python manage.py collectstatic
# Make sure DEBUG=True in development
# Check STATIC_URL and STATICFILES_DIRS in settings.py
```

### Issue: Tailwind classes not applying
**Solution**:
```bash
# Make sure Tailwind is running
npm run dev
# Check tailwind.config.js content paths
# Refresh browser with Ctrl+F5
```

### Issue: Images not displaying
**Solution**:
```python
# settings.py - Make sure these exist:
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# urls.py - Add in DEBUG mode:
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### Issue: Cart not persisting
**Solution**:
```python
# settings.py - Add:
SESSION_COOKIE_AGE = 86400 * 30
CART_SESSION_ID = 'cart'

# Make sure session middleware is enabled
# Make sure context processor is added
```

---

## 📚 Additional Resources

- **Full Guides**: See `DJANGO_SETUP_GUIDE.md`, `DJANGO_TEMPLATES_GUIDE.md`, `DJANGO_CART_TAILWIND_GUIDE.md`, `DJANGO_ADMIN_DEPLOY_GUIDE.md`
- **Design Tokens**: `design-tokens.json`
- **Wireframes**: `WIREFRAME_ANNOTATIONS.md`
- **React Prototype**: Browse through `/src/app/` for reference

---

## 🎯 Next Steps After Setup

1. **Populate Database**:
   ```bash
   python manage.py createsuperuser
   # Login to admin at http://localhost:8000/admin
   # Add artists, artworks, products, exhibitions
   ```

2. **Customize Templates**:
   - Update hero text in `templates/pages/home.html`
   - Add real content to About page
   - Customize footer links

3. **Add Features**:
   - User authentication
   - Wishlist
   - Product reviews
   - Email notifications
   - Order tracking

4. **Deploy**:
   - See `DJANGO_ADMIN_DEPLOY_GUIDE.md` section 10
   - Choose Heroku, DigitalOcean, or AWS

---

**Ready to start? Run these commands:**

```bash
source venv/bin/activate
python manage.py runserver
# In another terminal:
npm run dev
# Visit http://localhost:8000
```

🎨 **Happy coding!**
