# ConstCollection - Art Gallery & Shop Prototype

A fully responsive React prototype for a Django art gallery and shop, featuring comprehensive wireframes, reusable components, and complete documentation for Django conversion.

## 🎨 Project Overview

ConstCollection is a high-fidelity interactive prototype showcasing:
- Contemporary art gallery with filtering and sorting
- E-commerce shop for prints and merchandise
- Exhibition management system
- Complete checkout flow with Stripe integration mockup
- Responsive design for mobile, tablet, and desktop

## 🎯 Design System

### Brand Colors
- **Deep Indigo** (`#3730A3`) - Primary brand color
- **Warm Coral** (`#FF6B6B`) - Accent/CTA color

### Typography
- **Headings**: Playfair Display (serif) - Elegant, classical
- **Body Text**: Inter (sans-serif) - Clean, modern readability

### Breakpoints
- Mobile: 0px - 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

## 📱 Pages & Features

### 1. Home Page
- Hero section with CTA
- Featured artworks grid
- Current exhibition spotlight
- Shop promotion section

### 2. Gallery Page
- Filterable artwork grid (by medium)
- Sortable (featured, price, newest, artist)
- Responsive grid layout (1-4 columns)
- Featured and "New" badges

### 3. Artwork Detail Page
- Multi-image gallery with thumbnails
- Artwork specifications (medium, dimensions, year)
- Artist information
- Add to cart functionality
- Like/save feature
- Inquiry CTA

### 4. Shop Page
- Product grid with categories
- Stock indicators (Out of Stock, Low Stock)
- Quick add to cart
- Category filtering

### 5. Cart Page
- Item management (update quantity, remove)
- Order summary with tax and shipping
- Empty state handling
- Checkout CTA

### 6. Checkout Page
- Shipping information form
- Mock Stripe payment UI
- Order summary sidebar
- Secure checkout indicators

### 7. Exhibitions Page
- Current, upcoming, and past exhibitions
- Exhibition cards with dates
- Visit information section

### 8. About Page
- Gallery story and mission
- Team members
- Contact information

## 🧩 Component Library

### Navigation Components
- **Navigation**: Sticky header with cart counter
- **Footer**: Multi-column footer with social links

### Display Components
- **Hero**: Full-width hero with image and CTA
- **ArtworkCard**: Card with image, artist, price, badges
- **ProductCard**: Product display with stock status
- **GalleryGrid**: Responsive grid wrapper

### Interactive Components
- **ImageGallery**: Multi-image carousel with thumbnails
- **CartSummary**: Order summary with totals
- **CheckoutForm**: Complete checkout form with Stripe mockup

### UI Components
All shadcn/ui components available:
- Buttons, Inputs, Select, Badges
- Cards, Separators, Tabs
- And more...

## 📦 Installation & Usage

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔄 Django Conversion

See `DJANGO_CONVERSION_GUIDE.md` for detailed instructions on converting this React prototype to Django templates.

### Quick Start for Django

1. **Templates Structure**:
```
templates/
├── base.html
├── pages/
│   ├── home.html
│   ├── gallery.html
│   ├── artwork_detail.html
│   ├── shop.html
│   ├── cart.html
│   ├── checkout.html
│   ├── exhibitions.html
│   └── about.html
└── includes/
    └── components/
        ├── navigation.html
        ├── footer.html
        ├── hero.html
        ├── artwork_card.html
        ├── product_card.html
        ├── gallery_grid.html
        ├── image_gallery.html
        ├── cart_summary.html
        └── checkout_form.html
```

2. **Required Django Apps**:
- Gallery (artworks, artists)
- Shop (products, categories)
- Cart (shopping cart management)
- Orders (checkout, order history)
- Exhibitions (exhibition management)

3. **Key Django Models**:
```python
# Core models needed
- Artist
- Artwork
- Product
- Category
- CartItem
- Order
- Exhibition
```

## 🎨 Design Tokens

All design tokens are available in `design-tokens.json`:
- Colors (brand, neutral, semantic)
- Typography (fonts, sizes, weights)
- Spacing scale
- Border radius
- Shadows
- Breakpoints
- Component specifications

### Using Tokens in Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-indigo': '#3730A3',
        'accent-coral': '#FF6B6B',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
}
```

## 📸 Assets & Images

### Image Sources
All images in this prototype use Unsplash for demonstration purposes.

### For Production (Django)
Organize assets as:
```
static/
├── images/
│   └── exports/
│       ├── artwork_{name}_main.jpg
│       ├── hero_{page}_desktop.jpg
│       └── ...
└── icons/
    ├── cart.svg
    ├── heart.svg
    └── ...

media/
├── artworks/
├── products/
└── exhibitions/
```

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators (Tailwind focus rings)
- Alt text on all images
- Screen reader friendly
- WCAG AA color contrast

## 📱 Responsive Design

### Mobile (< 640px)
- Single column layouts
- Mobile-optimized navigation
- Touch-friendly targets (44px minimum)
- Stacked form fields

### Tablet (640px - 1024px)
- 2-3 column grids
- Optimized spacing
- Hamburger menu optional

### Desktop (1024px+)
- 3-4 column grids
- Full navigation visible
- Hover states and interactions
- Sticky elements

## 🛠 Technology Stack

### Current (React Prototype)
- React 18
- TypeScript
- Tailwind CSS 4.0
- Vite
- shadcn/ui components
- Lucide React icons

### Target (Django)
- Django 4.x+
- Tailwind CSS 3.x
- Alpine.js (for interactivity)
- Stripe (payments)
- PostgreSQL (database)

## 📋 Component Props Reference

### ArtworkCard
```typescript
{
  id: string
  title: string
  artist: string
  price: number
  imageUrl: string
  medium?: string
  dimensions?: string
  year?: number
  isFeatured?: boolean
  isNew?: boolean
}
```

### ProductCard
```typescript
{
  id: string
  name: string
  price: number
  imageUrl: string
  category?: string
  stock?: number
}
```

### CartItem
```typescript
{
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}
```

### Exhibition
```typescript
{
  id: string
  title: string
  artist: string
  description: string
  startDate: string
  endDate: string
  imageUrl: string
  isCurrent?: boolean
  isUpcoming?: boolean
}
```

## 🚀 Features to Add (Future Enhancements)

- [ ] User authentication (login/register)
- [ ] Artist portfolios
- [ ] Advanced search
- [ ] Wishlist functionality
- [ ] Order history
- [ ] Newsletter signup
- [ ] Social sharing
- [ ] Print preview/AR view
- [ ] Virtual exhibition tours
- [ ] Artist commission requests

## 📝 Django Implementation Checklist

- [ ] Set up Django project structure
- [ ] Create database models
- [ ] Set up Tailwind CSS
- [ ] Convert components to Django templates
- [ ] Implement views and URL routing
- [ ] Set up media/static files
- [ ] Integrate Stripe for payments
- [ ] Add user authentication
- [ ] Implement cart session management
- [ ] Create admin interface
- [ ] Add email notifications
- [ ] Deploy to production

## 📄 License

This prototype is provided as-is for ConstCollection project development.

## 🤝 Contributing

This is a prototype for conversion to Django. See `DJANGO_CONVERSION_GUIDE.md` for implementation guidelines.

## 📞 Support

For questions about this prototype or Django conversion, refer to the documentation files:
- `README.md` - This file
- `DJANGO_CONVERSION_GUIDE.md` - Detailed conversion guide
- `design-tokens.json` - Design system tokens

---

**Built with care for the art community** 🎨
