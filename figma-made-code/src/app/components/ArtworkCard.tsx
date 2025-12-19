import { Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

export interface ArtworkCardProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  medium?: string;
  dimensions?: string;
  year?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  onClick?: () => void;
}

export function ArtworkCard({
  title,
  artist,
  price,
  imageUrl,
  medium,
  year,
  isFeatured,
  isNew,
  onClick
}: ArtworkCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4] mb-4">
        <ImageWithFallback
          src={imageUrl}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
              <Eye className="h-6 w-6 text-[#3730A3]" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isFeatured && (
            <Badge className="bg-[#3730A3] text-white font-['Inter']">
              Featured
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-[#FF6B6B] text-white font-['Inter']">
              New
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          aria-label={isLiked ? 'Unlike artwork' : 'Like artwork'}
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isLiked ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-['Playfair_Display'] text-lg group-hover:text-[#3730A3] transition-colors">
          {title}
        </h3>
        <p className="font-['Inter'] text-gray-600 text-sm">
          {artist}
        </p>
        {medium && year && (
          <p className="font-['Inter'] text-gray-500 text-xs">
            {medium}, {year}
          </p>
        )}
        <p className="font-['Inter'] text-[#3730A3] mt-2">
          ${price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
