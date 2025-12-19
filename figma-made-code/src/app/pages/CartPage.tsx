import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem, CartSummary } from '../components/CartSummary';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export function CartPage({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  onContinueShopping 
}: CartPageProps) {
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg 
              className="h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl mb-4">
            Your cart is empty
          </h1>
          <p className="font-['Inter'] text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button 
            onClick={onContinueShopping}
            className="bg-[#3730A3] hover:bg-[#312E81] text-white"
            size="lg"
          >
            <span className="font-['Inter']">Continue Shopping</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <button 
        onClick={onContinueShopping}
        className="flex items-center gap-2 font-['Inter'] text-gray-600 hover:text-[#3730A3] mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </button>

      {/* Page Header */}
      <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <article 
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6"
            >
              <div className="flex gap-4">
                {/* Item Image */}
                {item.imageUrl && (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-['Inter'] text-lg pr-4">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem?.(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="font-['Inter'] text-[#3730A3] mb-4">
                    ${item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <span className="font-['Inter'] text-sm text-gray-600">
                      Quantity:
                    </span>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-1 border-x font-['Inter'] min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Cart Summary */}
        <div>
          <CartSummary items={items} onCheckout={onCheckout} />
        </div>
      </div>
    </div>
  );
}
