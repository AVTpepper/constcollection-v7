import { Hero } from '../components/Hero';
import { GalleryGrid } from '../components/GalleryGrid';
import { Button } from '../components/ui/button';
import { ArrowRight, Calendar, ShoppingBag } from 'lucide-react';
import { ArtworkCardProps } from '../components/ArtworkCard';
import { Exhibition } from '../data/mockData';

interface HomePageProps {
  featuredArtworks: ArtworkCardProps[];
  currentExhibition?: Exhibition;
  onNavigate: (page: string) => void;
  onArtworkClick: (id: string) => void;
}

export function HomePage({ 
  featuredArtworks, 
  currentExhibition,
  onNavigate,
  onArtworkClick 
}: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <Hero 
        onCTAClick={() => onNavigate('gallery')}
        imageUrl="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200"
      />

      {/* Featured Artworks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl mb-2">
              Featured Artworks
            </h2>
            <p className="font-['Inter'] text-gray-600">
              Handpicked masterpieces from our curated collection
            </p>
          </div>
          <Button 
            onClick={() => onNavigate('gallery')}
            variant="outline"
            className="hidden sm:flex border-[#3730A3] text-[#3730A3] hover:bg-[#3730A3] hover:text-white"
          >
            <span className="font-['Inter']">View All</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <GalleryGrid 
          artworks={featuredArtworks.slice(0, 4)} 
          onArtworkClick={onArtworkClick}
        />
      </section>

      {/* Current Exhibition */}
      {currentExhibition && (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 text-[#FF6B6B] mb-4">
                  <Calendar className="h-5 w-5" />
                  <span className="font-['Inter'] uppercase text-sm tracking-wide">
                    Current Exhibition
                  </span>
                </div>
                <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl mb-4">
                  {currentExhibition.title}
                </h2>
                <p className="font-['Inter'] text-xl text-gray-600 mb-4">
                  {currentExhibition.artist}
                </p>
                <p className="font-['Inter'] text-gray-700 mb-6 leading-relaxed">
                  {currentExhibition.description}
                </p>
                <p className="font-['Inter'] text-sm text-gray-500 mb-6">
                  {new Date(currentExhibition.startDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric' 
                  })} - {new Date(currentExhibition.endDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <Button 
                  onClick={() => onNavigate('exhibitions')}
                  className="bg-[#3730A3] hover:bg-[#312E81] text-white"
                  size="lg"
                >
                  <span className="font-['Inter']">View Exhibition Details</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={currentExhibition.imageUrl}
                    alt={currentExhibition.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Shop CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#3730A3] rounded-2xl p-8 sm:p-12 text-white text-center">
          <ShoppingBag className="h-12 w-12 mx-auto mb-6 text-[#FF6B6B]" />
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl mb-4">
            Shop Art & Merchandise
          </h2>
          <p className="font-['Inter'] text-gray-200 mb-8 max-w-2xl mx-auto">
            Discover prints, books, and exclusive items from our collection. Perfect for art enthusiasts and collectors.
          </p>
          <Button 
            onClick={() => onNavigate('shop')}
            className="bg-[#FF6B6B] hover:bg-[#EE5A52] text-white"
            size="lg"
          >
            <span className="font-['Inter']">Browse Shop</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
