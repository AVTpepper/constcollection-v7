import { ArrowLeft } from 'lucide-react';
import { CheckoutForm } from '../components/CheckoutForm';
import { CartItem } from '../components/CartSummary';
import { Separator } from '../components/ui/separator';

interface CheckoutPageProps {
  items: CartItem[];
  onBack?: () => void;
  onSubmit?: (data: any) => void;
}

export function CheckoutPage({ items, onBack, onSubmit }: CheckoutPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 font-['Inter'] text-gray-600 hover:text-[#3730A3] mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </button>

      {/* Page Header */}
      <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm total={total} onSubmit={onSubmit} />
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="font-['Playfair_Display'] text-xl mb-6">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-['Inter'] text-sm truncate">
                      {item.name}
                    </p>
                    <p className="font-['Inter'] text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-['Inter'] text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between font-['Inter'] text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-['Inter'] text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE'}</span>
              </div>
              <div className="flex justify-between font-['Inter'] text-sm">
                <span className="text-gray-600">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-['Inter'] text-lg">
                <span>Total</span>
                <span className="text-[#3730A3]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
