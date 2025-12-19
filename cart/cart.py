from decimal import Decimal


CART_SESSION_ID = 'cart'


class Cart:
    """Session-based shopping cart."""

    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(CART_SESSION_ID)
        if not cart:
            cart = self.session[CART_SESSION_ID] = {}
        self.cart = cart

    def add(self, item_type, item_id, name, price, image, quantity=1, update_quantity=False):
        """
        Add an item to the cart or update its quantity.
        item_type: 'artwork' or 'product'
        """
        key = f"{item_type}_{item_id}"
        if key not in self.cart:
            self.cart[key] = {
                'type': item_type,
                'id': str(item_id),
                'name': name,
                'price': str(price),
                'image': image,
                'quantity': 0,
            }
        if update_quantity:
            self.cart[key]['quantity'] = quantity
        else:
            self.cart[key]['quantity'] += quantity
        self.save()

    def remove(self, item_type, item_id):
        """Remove an item from the cart."""
        key = f"{item_type}_{item_id}"
        if key in self.cart:
            del self.cart[key]
            self.save()

    def update_quantity(self, item_type, item_id, quantity):
        """Update the quantity of an item."""
        key = f"{item_type}_{item_id}"
        if key in self.cart:
            if quantity > 0:
                self.cart[key]['quantity'] = quantity
            else:
                del self.cart[key]
            self.save()

    def save(self):
        """Mark the session as modified to save changes."""
        self.session.modified = True

    def clear(self):
        """Remove cart from session."""
        del self.session[CART_SESSION_ID]
        self.save()

    def __iter__(self):
        """Iterate over cart items and add computed fields."""
        for key, item in self.cart.items():
            item_copy = item.copy()
            item_copy['price'] = Decimal(item['price'])
            item_copy['total_price'] = item_copy['price'] * item['quantity']
            item_copy['key'] = key
            yield item_copy

    def __len__(self):
        """Count total items in the cart."""
        return sum(item['quantity'] for item in self.cart.values())

    @property
    def subtotal(self):
        """Calculate subtotal before shipping and tax."""
        return sum(
            Decimal(item['price']) * item['quantity']
            for item in self.cart.values()
        )

    @property
    def shipping(self):
        """Flat rate shipping."""
        if len(self.cart) == 0:
            return Decimal('0.00')
        return Decimal('15.00')

    @property
    def tax(self):
        """Calculate 8% tax on subtotal."""
        return (self.subtotal * Decimal('0.08')).quantize(Decimal('0.01'))

    @property
    def total(self):
        """Calculate grand total."""
        return self.subtotal + self.shipping + self.tax

    @property
    def item_count(self):
        """Total number of items."""
        return len(self)
