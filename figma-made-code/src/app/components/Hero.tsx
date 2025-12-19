import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCTAClick?: () => void;
  imageUrl?: string;
}

export function Hero({ 
  title = "Discover Extraordinary Art",
  subtitle = "Curated collection of contemporary masterpieces from emerging and established artists",
  ctaText = "Explore Gallery",
  onCTAClick,
  imageUrl
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#3730A3] to-[#312E81] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
          {/* Text Content */}
          <div className="z-10">
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              {title}
            </h1>
            <p className="font-['Inter'] text-lg sm:text-xl text-gray-200 mb-8 max-w-lg">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onCTAClick}
                className="bg-[#FF6B6B] hover:bg-[#EE5A52] text-white px-8 py-6 group"
                size="lg"
              >
                <span className="font-['Inter']">{ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#3730A3] px-8 py-6"
                size="lg"
              >
                <span className="font-['Inter']">View Exhibitions</span>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
            <div className="relative h-[400px] lg:h-full rounded-lg lg:rounded-none overflow-hidden">
              {imageUrl ? (
                <ImageWithFallback
                  src={imageUrl}
                  alt="Featured artwork"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#FF6B6B]/20 to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 border-4 border-white/30 rounded-full" />
                    <p className="font-['Inter'] text-white/60">Featured Artwork</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3730A3]/50 to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B6B]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
    </section>
  );
}
