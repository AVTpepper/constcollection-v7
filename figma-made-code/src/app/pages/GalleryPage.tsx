import { useState } from 'react';
import { GalleryGrid } from '../components/GalleryGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { ArtworkCardProps } from '../components/ArtworkCard';

interface GalleryPageProps {
  artworks: ArtworkCardProps[];
  onArtworkClick: (id: string) => void;
}

export function GalleryPage({ artworks, onArtworkClick }: GalleryPageProps) {
  const [sortBy, setSortBy] = useState('featured');
  const [filterMedium, setFilterMedium] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique mediums for filter
  const mediums = ['all', ...new Set(artworks.map(a => a.medium).filter(Boolean))];

  // Filter and sort artworks
  let filteredArtworks = [...artworks];
  
  if (filterMedium !== 'all') {
    filteredArtworks = filteredArtworks.filter(a => a.medium === filterMedium);
  }

  switch (sortBy) {
    case 'price-low':
      filteredArtworks.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredArtworks.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredArtworks.sort((a, b) => (b.year || 0) - (a.year || 0));
      break;
    case 'artist':
      filteredArtworks.sort((a, b) => a.artist.localeCompare(b.artist));
      break;
    default: // featured
      filteredArtworks.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl mb-4">
          Gallery
        </h1>
        <p className="font-['Inter'] text-gray-600 text-lg">
          Explore our curated collection of {artworks.length} contemporary artworks
        </p>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <span className="font-['Inter']">Filters</span>
        </Button>

        <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${showFilters ? 'block' : 'hidden sm:flex'}`}>
          <div className="w-full sm:w-48">
            <Select value={filterMedium} onValueChange={setFilterMedium}>
              <SelectTrigger className="font-['Inter']">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                {mediums.map((medium) => (
                  <SelectItem key={medium} value={medium} className="font-['Inter']">
                    {medium === 'all' ? 'All Mediums' : medium}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="font-['Inter']">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured" className="font-['Inter']">Featured</SelectItem>
                <SelectItem value="newest" className="font-['Inter']">Newest</SelectItem>
                <SelectItem value="price-low" className="font-['Inter']">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="font-['Inter']">Price: High to Low</SelectItem>
                <SelectItem value="artist" className="font-['Inter']">Artist Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="font-['Inter'] text-sm text-gray-600">
          Showing {filteredArtworks.length} {filteredArtworks.length === 1 ? 'artwork' : 'artworks'}
        </p>
      </div>

      {/* Gallery Grid */}
      <GalleryGrid artworks={filteredArtworks} onArtworkClick={onArtworkClick} />
    </div>
  );
}
