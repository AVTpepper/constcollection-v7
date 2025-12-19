import { useState } from 'react';
import { ImageGallery } from '../components/ImageGallery';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Heart, Share2, ShoppingCart, Ruler, Calendar, Palette } from 'lucide-react';
import { ArtworkCardProps } from '../components/ArtworkCard';

interface ArtworkDetailPageProps {
  artwork: ArtworkCardProps;
  onAddToCart?: (id: string) => void;
  onBack?: () => void;
}

export function ArtworkDetailPage({ artwork, onAddToCart, onBack }: ArtworkDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Mock multiple images for gallery
  const images = [
    { url: artwork.imageUrl, alt: `${artwork.title} - Main view` },
    { url: artwork.imageUrl, alt: `${artwork.title} - Detail view 1` },
    { url: artwork.imageUrl, alt: `${artwork.title} - Detail view 2` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 font-['Inter'] text-sm text-gray-600">
          <li>
            <button onClick={onBack} className="hover:text-[#3730A3]">
              Gallery
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-900">{artwork.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <ImageGallery images={images} />
        </div>

        {/* Artwork Details */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              {artwork.isFeatured && (
                <Badge className="bg-[#3730A3] text-white font-['Inter'] mb-3">
                  Featured
                </Badge>
              )}
              <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl mb-2">
                {artwork.title}
              </h1>
              <p className="font-['Inter'] text-xl text-gray-700">
                {artwork.artist}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                aria-label={isLiked ? 'Unlike artwork' : 'Like artwork'}
              >
                <Heart 
                  className={`h-5 w-5 ${
                    isLiked ? 'fill-[#FF6B6B] text-[#FF6B6B]' : ''
                  }`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Share artwork"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <p className="font-['Inter'] text-3xl text-[#3730A3] mb-6">
            ${artwork.price.toLocaleString()}
          </p>

          <Separator className="my-6" />

          {/* Specifications */}
          <div className="space-y-4 mb-6">
            <h2 className="font-['Inter'] text-sm uppercase tracking-wide text-gray-500">
              Specifications
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {artwork.medium && (
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-['Inter'] text-sm text-gray-500">Medium</p>
                    <p className="font-['Inter']">{artwork.medium}</p>
                  </div>
                </div>
              )}
              {artwork.dimensions && (
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-['Inter'] text-sm text-gray-500">Dimensions</p>
                    <p className="font-['Inter']">{artwork.dimensions}</p>
                  </div>
                </div>
              )}
              {artwork.year && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-['Inter'] text-sm text-gray-500">Year</p>
                    <p className="font-['Inter']">{artwork.year}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-['Inter'] text-sm uppercase tracking-wide text-gray-500 mb-3">
              About this Artwork
            </h2>
            <p className="font-['Inter'] text-gray-700 leading-relaxed">
              This exceptional piece showcases {artwork.artist}'s distinctive style and mastery of {artwork.medium?.toLowerCase()}. 
              The artwork represents a significant work in the artist's oeuvre, demonstrating their unique vision and technical excellence. 
              Each piece is authenticated and comes with a certificate of authenticity.
            </p>
          </div>

          <Separator className="my-6" />

          {/* Purchase Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-['Inter']">
                Quantity:
              </label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x font-['Inter']"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <Button 
              onClick={() => onAddToCart?.(artwork.id)}
              className="w-full bg-[#FF6B6B] hover:bg-[#EE5A52] text-white py-6"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span className="font-['Inter']">Add to Cart</span>
            </Button>

            <Button 
              variant="outline"
              className="w-full border-[#3730A3] text-[#3730A3] hover:bg-[#3730A3] hover:text-white py-6"
              size="lg"
            >
              <span className="font-['Inter']">Inquire About This Piece</span>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <ul className="space-y-2 font-['Inter'] text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Certificate of Authenticity included
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Professional packaging and insured shipping
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-day money-back guarantee
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
