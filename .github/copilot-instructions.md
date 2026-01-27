# ConstCollection - AI Coding Instructions

## Architecture Overview

Django 6.0 art gallery & e-commerce site converted from a React/Figma prototype. Key apps:
- **gallery/** - Artworks and artists (models: `Artist`, `Artwork`)
- **shop/** - Products and categories (models: `Category`, `Product`)
- **cart/** - Session-based shopping cart (see `cart/cart.py` for `Cart` class)
- **pages/** - Static pages (home, about, exhibitions)
- **portfolio/** - Separate portfolio section with its own base template

## Tech Stack & Key Files

| Layer | Technology | Key Files |
|-------|------------|-----------|
| Backend | Django 6.0 | `config/settings.py`, `config/urls.py` |
| Frontend | Tailwind CSS v4 + Alpine.js | `input.css`, `tailwind.config.js` |
| Styling | Custom design tokens | `input.css` (@theme block defines colors/fonts) |
| Deployment | Render.com + WhiteNoise | `render.yaml`, `build.sh` |
| Payments | Stripe | `cart/views.py` (checkout flow) |

## Development Commands

```bash
# Build Tailwind CSS (required after template/class changes)
npm run build:css

# Watch mode for CSS development
npm run watch:css

# Run Django server
python manage.py runserver

# Load fixture data
python manage.py loaddata gallery/fixtures/artists.json gallery/fixtures/artworks.json
```

## Template Patterns

### Component Structure
Templates use includes in `templates/components/`:
```django
{% include 'components/_navigation.html' %}
{% include 'components/_artwork_card.html' with artwork=artwork %}
```

### Alpine.js for Interactivity
All interactive UI uses Alpine.js (loaded via CDN in `base.html`):
```html
<div x-data="{ open: false }" x-show="open" @click="open = !open">
```
Common patterns: `x-data`, `x-show`, `x-cloak`, `@click`, `:class` bindings.

### Media File References
Images use CharField paths, not ImageField:
```django
<img src="{% get_media_prefix %}{{ artwork.image }}" alt="{{ artwork.title }}">
```

## Design System

**Brand colors** (use via Tailwind classes):
- `brand-indigo` / `brand-indigo-dark` / `brand-indigo-light` - Primary
- `accent-coral` / `accent-coral-dark` / `accent-coral-light` - CTAs

**Typography**:
- `font-playfair` - Headings (serif)
- `font-inter` - Body text (sans-serif)

**Custom CSS classes** defined in `input.css`:
- `.btn-primary`, `.btn-secondary`, `.btn-outline` - Buttons
- `.card` - Card containers
- `.page-container` - Max-width wrapper with padding
- `.badge-featured`, `.badge-new` - Artwork badges

## Cart Implementation

Session-based cart in `cart/cart.py`. Available globally via context processor:
```python
# In templates: {{ cart.item_count }}, {{ cart.subtotal }}
# Adding items requires item_type ('artwork' or 'product') + item_id
```

## Code Conventions

1. **Views**: Function-based views with `select_related()` for FK optimization
2. **URLs**: Each app has own `urls.py`, included in `config/urls.py`
3. **Models**: Use `get_absolute_url()` returning `reverse()` calls
4. **Templates**: Prefix partials with `_` (e.g., `_artwork_card.html`)

## Reference Documentation

The `figma-made-code/` directory contains original React prototype and conversion guides:
- `DJANGO_SETUP_GUIDE.md` - Full setup instructions
- `DJANGO_TEMPLATES_GUIDE.md` - Template conversion patterns
- `BUILD_PROCESS.md` - Page/component build checklist
