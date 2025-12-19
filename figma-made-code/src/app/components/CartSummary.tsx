import { ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartSummaryProps {
  items: CartItem[];
  onCheckout?: () => void;
}

export function CartSummary({ items, onCheckout }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-5 w-5 text-[#3730A3]" />
        <h2 className="font-['Playfair_Display'] text-xl">Order Summary</h2>
      </div>

      <div className="space-y-4">
        {/* Items Count */}
        <div className="flex justify-between font-['Inter'] text-sm">
          <span className="text-gray-600">Items ({items.length})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between font-['Inter'] text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE'}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between font-['Inter'] text-sm">
          <span className="text-gray-600">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between font-['Inter']">
          <span>Total</span>
          <span className="text-[#3730A3]">${total.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <Button 
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full bg-[#FF6B6B] hover:bg-[#EE5A52] text-white py-6"
          size="lg"
        >
          <span className="font-['Inter']">Proceed to Checkout</span>
        </Button>

        {/* Additional Info */}
        <div className="pt-4 space-y-2">
          <p className="font-['Inter'] text-xs text-gray-500 flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Secure checkout
          </p>
          <p className="font-['Inter'] text-xs text-gray-500 flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free returns within 30 days
          </p>
        </div>
      </div>
    </div>
  );
}
