import { ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  stock?: number;
  onAddToCart?: (id: string) => void;
  onClick?: () => void;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  category,
  stock = 0,
  onAddToCart,
  onClick
}: ProductCardProps) {
  const isOutOfStock = stock === 0;

  return (
    <article className="group">
      {/* Image */}
      <div 
        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4 cursor-pointer"
        onClick={onClick}
      >
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white/90 text-gray-900 font-['Inter']">
              Out of Stock
            </Badge>
          </div>
        )}

        {!isOutOfStock && stock < 5 && (
          <Badge className="absolute top-3 left-3 bg-[#FF6B6B] text-white font-['Inter']">
            Low Stock
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2">
        {category && (
          <p className="font-['Inter'] text-xs text-gray-500 uppercase tracking-wide">
            {category}
          </p>
        )}
        <h3 
          className="font-['Inter'] group-hover:text-[#3730A3] transition-colors cursor-pointer"
          onClick={onClick}
        >
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="font-['Inter'] text-[#3730A3]">
            ${price.toLocaleString()}
          </p>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(id);
            }}
            disabled={isOutOfStock}
            className="bg-[#3730A3] hover:bg-[#312E81] text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span className="font-['Inter'] text-sm">Add</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
