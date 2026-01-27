# ConstCollection

* Live website link (its render, give it a minute or two to load) - [live link](https://constcollection.onrender.com/)
## Table of Contents

- [Project Rationale](#project-rationale)
- [Purpose, Goal, and Target Audience](#purpose-goal-and-target-audience)
- [Business and Customer Goals](#business-and-customer-goals)
- [UI/UX Design](#uiux-design)
- [Database Design](#database-design)
- [Marketing](#marketing)
- [User Stories](#user-stories)
- [Agile Development](#agile-development)
- [Manual Testing](#manual-testing)
- [Automatic Testing](#automatic-testing)
- [Testing Document](#testing-document)
- [App Features](#app-features)
- [CRUD Operations](#crud-operations)
- [Technologies Used](#technologies-used)
- [Deployment Procedures](#deployment-procedures)
- [Future Features](#future-features)

---

## Project Rationale

ConstCollection is a Django-based art gallery and e-commerce platform designed to showcase artwork while providing seamless purchasing and portfolio management capabilities. The project evolved from a React/Figma prototype into a full-stack Django application, combining artistic presentation with robust e-commerce functionality. I wanted to experiment with the AI wireframe generator on Figma, but noticed it heavily relied on React. I prefer and have more experience with Django, so I used AI to help me generate guides on how I could transform the React prototype into a project using Django instead.

### Purpose, Goal, and Target Audience

**Purpose:** To create an integrated platform where artists can showcase their work, manage their portfolio, and sell art alongside curated products.

**Goals:**
- Provide a professional gallery experience for viewing and discovering artwork
- Enable seamless purchasing of artworks and related products
- Manage artist profiles and exhibition information
- Maintain a clean, accessible portfolio section

**Target Audience:**
- Art collectors and enthusiasts
- Artists seeking to showcase and sell their work
- Gallery curators and exhibition managers
- Online shoppers interested in art and curated products

### Business and Customer Goals

**Business Goals:**
- Increase online sales through e-commerce functionality
- Build a community of artists and art buyers
- Expand market reach through a professional web presence
- Streamline art and product management

**Customer Goals:**
- Easily discover and purchase artwork
- Access detailed artist information and exhibition schedules
- Manage shopping cart and checkout efficiently
- View high-quality images and artwork details

## UI/UX Design

**Design Approach:** ConstCollection uses a modern, minimalist design philosophy emphasizing artwork presentation. The design system includes:

**Key Features:**
- **Responsive Layout:** Mobile-first design using Tailwind CSS v4 ensuring excellent experience across all devices
- **Brand Colors:** Custom indigo and coral color palettes for visual hierarchy and brand consistency
- **Typography:** Playfair serif for headings (artistic elegance) and Inter sans-serif for body text (readability)
- **Interactive Elements:** Alpine.js for smooth, lightweight interactivity without heavy JavaScript frameworks
- **Component-Based:** Reusable template components (`_navigation.html`, `_artwork_card.html`, etc.) for consistency

**Design Tools:**
- Figma for prototyping and design specification
- Tailwind CSS for utility-first styling
- Custom design tokens in `input.css` for centralized theming
- Alpine.js for client-side interactivity

**Reference:** Original design prototypes and conversion guides available in `figma-made-code/` directory

## Database Design

**Core Models:**

**Gallery App:**
- `Artist` - Artist profiles with name, bio, image, and social links
- `Artwork` - Individual artworks with title, description, image, price, and artist reference

**Shop App:**
- `Category` - Product categories for organization
- `Product` - Sellable products with title, description, image, price, and category reference

**Pages App:**
- `Exhibition` - Exhibition information with dates, descriptions, and poster images

**Cart:**
- Session-based shopping cart managed via `Cart` class in `cart/cart.py`
- Supports both artwork and product items
- Tracks item count and subtotal for checkout

**Relationships:**
- `Artwork` → `Artist` (ForeignKey)
- `Product` → `Category` (ForeignKey)
- Session-based cart items reference artworks or products by type and ID

**Key Features:**
- Optimized queries using `select_related()` for FK relationships
- Absolute URL patterns via `get_absolute_url()` methods
- Django ORM for database abstraction

## Marketing

ConstCollection leverages multiple marketing channels to reach art enthusiasts and collectors:

**Digital Marketing:**
- Social media integration through artist profiles (Instagram, Twitter, etc.)
- SEO-optimized pages for artwork and product discovery
- Exhibition listings to drive awareness and foot traffic

**Content Marketing:**
- Detailed artist biographies and work descriptions
- Exhibition information and scheduling
- Portfolio section showcasing diverse artistic approaches

**E-Commerce Strategy:**
- Curated product recommendations alongside artwork
- Shopping cart for friction-free purchasing
- Stripe integration for secure payment processing

**Community Building:**
- Artist showcase with social links
- Exhibition calendar for events
- Easy-to-share artwork galleries

## User Stories

**Artist User:**
- As an artist, I want to display my portfolio with high-quality images and detailed descriptions
- As an artist, I want collectors to easily find and purchase my work
- As an artist, I want to link to my social media profiles

**Collector/Buyer:**
- As a collector, I want to browse artworks by artist or category
- As a collector, I want detailed information about each artwork including pricing
- As a collector, I want to add items to a cart and checkout securely
- As a collector, I want to view my purchase history

**Gallery Manager:**
- As a manager, I want to add new artworks and update artist information
- As a manager, I want to organize exhibitions and announce them
- As a manager, I want to manage products and inventory
- As a manager, I want to view sales and customer data

**Visitor:**
- As a visitor, I want to explore the gallery without creating an account
- As a visitor, I want a mobile-friendly experience
- As a visitor, I want to learn about the artists and their work
- As a visitor, I want to discover upcoming exhibitions

## Agile Development

**Methodology:** ConstCollection uses Agile development practices with iterative sprints and continuous improvement.

**Development Workflow:**
1. **Planning** - Define user stories and acceptance criteria
2. **Development** - Implement features in 2-week sprints
3. **Testing** - Manual and automated testing throughout each sprint
4. **Deployment** - Continuous deployment to Render.com

**Key Practices:**
- User story-driven development
- Regular code reviews and refactoring
- Automated testing for regression prevention
- Component-based template architecture for scalability
- Documentation updates with code changes

**Tools & Version Control:**
- Git for version control
- Django ORM for database migrations
- Fixture files for test data management

## Manual Testing

**Testing Scope:**
- User interface functionality across different browsers and devices
- Navigation and routing between pages
- Cart operations (add, remove, update quantities)
- Checkout process end-to-end
- Artwork and product detail pages
- Artist profile pages
- Exhibition listings

**Test Scenarios:**
1. **Gallery Navigation** - Browse artworks, filter by artist, view details
2. **Shopping Cart** - Add/remove items, update quantities, view totals
3. **Checkout Flow** - Fill cart, proceed to checkout, complete payment
4. **Artist Profiles** - View artist details, social links, artwork collection
5. **Responsive Design** - Test on mobile, tablet, and desktop views
6. **Form Validation** - Test form submissions with valid/invalid data
7. **Image Loading** - Verify all media files load correctly

**Testing Tools:**
- Browser DevTools for responsive testing
- Manual testing on Chrome

## Automatic Testing

**Testing Framework:** Python's Django test framework with unittest

**Test Coverage Areas:**
- Model validation and relationships
- View logic and response handling
- URL routing and reversal
- Cart session management
- Context processor functionality
- Form validation and submission

**Running Tests:**

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test gallery
python manage.py test shop
python manage.py test cart
python manage.py test pages

# Run with verbosity
python manage.py test --verbosity=2
```

**Continuous Integration:**
- Tests run automatically before deployment
- Fixtures loaded for consistent test data
- Database is isolated per test run

**Key Test Files:**
- `gallery/tests.py` - Artist and artwork model tests
- `shop/tests.py` - Product and category tests
- `cart/tests.py` - Cart functionality tests
- `pages/tests.py` - Static page tests

## Testing Document

Comprehensive testing documentation is available in the `figma-made-code/` directory:
- **Test Cases** - Detailed manual test cases with expected outcomes
- **Test Results** - Logged results from testing sessions
- **Bug Reports** - Known issues and resolutions
- **Performance Testing** - Load and response time testing

For detailed testing procedures, refer to the guides in the `figma-made-code/` directory and the project's testing best practices documentation.

## App Features

**Gallery Features:**
- Browse all artworks with pagination
- View detailed artwork information (title, description, price, artist)
- Filter artworks by artist
- High-resolution image display
- Artist profile pages with biography and social links
- Responsive gallery grid layout

**Shop Features:**
- Browse products by category
- Product detail pages with descriptions and pricing
- Product filtering and sorting
- Inventory management

**Exhibition Features:**
- View upcoming and past exhibitions
- Exhibition details with dates, descriptions, and images
- Exhibition calendar

**Portfolio Features:**
- Separate portfolio section with curated work
- Professional portfolio display
- Artist showcase

**Shopping Cart Features:**
- Session-based cart (no login required)
- Add/remove items
- Update item quantities
- Real-time cart totals
- Cart summary in header

**Checkout Features:**
- Secure Stripe payment integration
- Order confirmation
- Success page with order details
- Email confirmation (via `cart/emails.py`)

**Navigation & UX:**
- Responsive navigation menu
- Mobile-friendly design
- Alpine.js for smooth interactions
- Footer with site links

## CRUD Operations

**Artwork CRUD (Gallery Admin):**
- **Create** - Add new artworks with title, description, price, image, and artist
- **Read** - View all artworks with filtering and detail pages
- **Update** - Edit artwork information and images
- **Delete** - Remove artworks from the gallery

**Artist CRUD (Gallery Admin):**
- **Create** - Add new artist profiles with bio, image, and social links
- **Read** - Display artist information and their artworks
- **Update** - Edit artist details
- **Delete** - Remove artist profiles

**Product CRUD (Shop Admin):**
- **Create** - Add new products with details, pricing, and categories
- **Read** - Browse and view product details
- **Update** - Modify product information
- **Delete** - Remove products from inventory

**Category CRUD (Shop Admin):**
- **Create** - Create new product categories
- **Read** - View and filter by category
- **Update** - Modify category information
- **Delete** - Remove categories (with product reassignment)

**Exhibition CRUD (Pages Admin):**
- **Create** - Add new exhibitions with details and dates
- **Read** - Display exhibition information and schedules
- **Update** - Edit exhibition details
- **Delete** - Remove past exhibitions

**Cart CRUD (Customer):**
- **Create** - Add items to cart
- **Read** - View cart contents and totals
- **Update** - Modify quantities
- **Delete** - Remove items from cart

All CRUD operations are accessible through Django Admin interface for staff users.

## Technologies Used

**Backend:**
- **Django 6.0** - Web framework
- **Python 3.10+** - Programming language
- **SQLite/PostgreSQL** - Database

**Frontend:**
- **Tailwind CSS v4** - Utility-first CSS framework
- **Alpine.js** - Lightweight JavaScript framework
- **HTML5** - Markup language
- **CSS3** - Styling with custom properties

**Styling & Design:**
- **Tailwind CSS** - Class-based styling
- **Custom Design Tokens** - Brand colors and typography in `input.css`
- **PostCSS** - CSS processing
- **Font Stack** - Playfair (headings), Inter (body)

**Payment Processing:**
- **Stripe API** - Secure payment handling

**Deployment:**
- **Render.com** - Cloud hosting platform
- **WhiteNoise** - Static file serving
- **GitHub** - Version control and CI/CD

**Development Tools:**
- **npm** - Package management for CSS and frontend dependencies
- **Git** - Version control
- **Docker** - Containerization (optional)

**Key Libraries:**
- Django ORM - Database abstraction
- Django Templates - Server-side templating
- Django Admin - Content management interface
- Stripe Python SDK - Payment processing

**Build Process:**
```bash
npm run build:css    # Build Tailwind CSS
npm run watch:css    # Watch mode for development
python manage.py runserver  # Run Django dev server
```

## Deployment Procedures

**Deployment Platform:** Render.com

**Prerequisites:**
- Django project configured with environment variables
- Database migrations up to date
- Static files collected
- Stripe API keys configured
- Media files uploaded

**Local Development Setup:**

```bash
# Clone repository
git clone <repository-url>
cd constcollection-v7

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
npm install

# Build CSS
npm run build:css

# Run migrations
python manage.py migrate

# Load fixture data (optional)
python manage.py loaddata gallery/fixtures/artists.json gallery/fixtures/artworks.json

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

**Deployment to Render.com:**

1. **Connect Repository** - Link GitHub repository to Render
2. **Set Environment Variables** - Configure in Render dashboard:
   - `DJANGO_SECRET_KEY`
   - `DEBUG` (set to False for production)
   - `ALLOWED_HOSTS`
   - `DATABASE_URL`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`

3. **Build Configuration** - Render uses `render.yaml` and `build.sh`:
   ```bash
   # build.sh runs:
   - pip install -r requirements.txt
   - npm install
   - npm run build:css
   - python manage.py collectstatic --noinput
   - python manage.py migrate
   ```

4. **Deploy** - Push to main branch then manually deploy on render.com in the project you created there.

**Post-Deployment:**
- Verify environment variables are set
- Test payment processing with Stripe test keys
- Check media and static files are served correctly
- Verify database migrations completed
- Monitor application logs for errors

**Static Files & Media:**
- CSS built via npm: `npm run build:css`
- Static files collected to `static/` directory
- Media files uploaded to `media/` directory
- WhiteNoise serves static files in production

**Maintenance:**
- Regularly run `python manage.py migrate` after model changes
- Update `requirements.txt` when adding dependencies
- Rebuild CSS with `npm run build:css` after template changes
- Monitor Render logs for errors and performance issues

## Future Features

**Email Service Implementation:**
- Implement a proper email service (SendGrid, Mailgun, or AWS SES) to replace current email functionality
- Automated order confirmation emails with order details and tracking information
- Shipping notification emails
- Invoice generation and delivery
- Email templates with branding and professional formatting
- Transactional email logging and retry mechanisms

**Exhibition Sign-Up Feature:**
- User registration system for exhibition attendance
- Exhibition sign-up form with capacity management
- Email confirmations for registrations
- Event reminder notifications
- Attendee list management in Django Admin
- QR code generation for check-in
- Exhibition feedback and survey collection post-event

**UI/UX Improvements:**
- Enhanced image gallery with lightbox/modal views
- Advanced filtering and search functionality
- User account dashboard for order history and saved items
- Wishlist/favorites feature
- Social sharing buttons for artworks
- Customer reviews and ratings system
- Improved mobile navigation and touch interactions
- Dark mode toggle
- Accessibility improvements (WCAG compliance)
- Performance optimization and lazy loading for images
- Enhanced loading states and animations
