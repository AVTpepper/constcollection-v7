import { ArtworkCard, ArtworkCardProps } from './ArtworkCard';

interface GalleryGridProps {
  artworks: ArtworkCardProps[];
  onArtworkClick?: (id: string) => void;
}

export function GalleryGrid({ artworks, onArtworkClick }: GalleryGridProps) {
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            {...artwork}
            onClick={() => onArtworkClick?.(artwork.id)}
          />
        ))}
      </div>
      
      {artworks.length === 0 && (
        <div className="text-center py-16">
          <p className="font-['Inter'] text-gray-500">No artworks found</p>
        </div>
      )}
    </section>
  );
}
