import { Calendar, MapPin, Clock } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Exhibition } from '../data/mockData';

interface ExhibitionsPageProps {
  exhibitions: Exhibition[];
  onExhibitionClick?: (id: string) => void;
}

export function ExhibitionsPage({ exhibitions, onExhibitionClick }: ExhibitionsPageProps) {
  const currentExhibitions = exhibitions.filter(e => e.isCurrent);
  const upcomingExhibitions = exhibitions.filter(e => e.isUpcoming);
  const pastExhibitions = exhibitions.filter(e => !e.isCurrent && !e.isUpcoming);

  const ExhibitionCard = ({ exhibition }: { exhibition: Exhibition }) => (
    <article className="group cursor-pointer" onClick={() => onExhibitionClick?.(exhibition.id)}>
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-gray-100">
        <img
          src={exhibition.imageUrl}
          alt={exhibition.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {exhibition.isCurrent && (
            <Badge className="bg-[#FF6B6B] text-white font-['Inter']">
              Now Showing
            </Badge>
          )}
          {exhibition.isUpcoming && (
            <Badge className="bg-[#3730A3] text-white font-['Inter']">
              Upcoming
            </Badge>
          )}
        </div>

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="font-['Inter'] text-sm mb-2">{exhibition.artist}</p>
          <h3 className="font-['Playfair_Display'] text-2xl mb-2 group-hover:text-[#FF6B6B] transition-colors">
            {exhibition.title}
          </h3>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 font-['Inter']">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(exhibition.startDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })} - {new Date(exhibition.endDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        <p className="font-['Inter'] text-gray-700 line-clamp-2">
          {exhibition.description}
        </p>
      </div>
    </article>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl mb-4">
          Exhibitions
        </h1>
        <p className="font-['Inter'] text-gray-600 text-lg">
          Explore our current and upcoming exhibitions
        </p>
      </div>

      {/* Current Exhibitions */}
      {currentExhibitions.length > 0 && (
        <section className="mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl mb-8">
            Currently on View
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentExhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Exhibitions */}
      {upcomingExhibitions.length > 0 && (
        <section className="mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl mb-8">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingExhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            ))}
          </div>
        </section>
      )}

      {/* Past Exhibitions */}
      {pastExhibitions.length > 0 && (
        <section>
          <h2 className="font-['Playfair_Display'] text-3xl mb-8">
            Past Exhibitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastExhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            ))}
          </div>
        </section>
      )}

      {/* Visit Info */}
      <section className="mt-16 bg-gradient-to-br from-[#3730A3] to-[#312E81] rounded-2xl p-8 sm:p-12 text-white">
        <h2 className="font-['Playfair_Display'] text-3xl mb-6">
          Plan Your Visit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-6 w-6 text-[#FF6B6B]" />
              <h3 className="font-['Inter']">Location</h3>
            </div>
            <p className="font-['Inter'] text-gray-200">
              123 Gallery Street<br />
              Arts District, NY 10001
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-6 w-6 text-[#FF6B6B]" />
              <h3 className="font-['Inter']">Hours</h3>
            </div>
            <p className="font-['Inter'] text-gray-200">
              Tuesday - Sunday<br />
              10:00 AM - 6:00 PM
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-6 w-6 text-[#FF6B6B]" />
              <h3 className="font-['Inter']">Admission</h3>
            </div>
            <p className="font-['Inter'] text-gray-200">
              Free for all visitors<br />
              Groups welcome
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
