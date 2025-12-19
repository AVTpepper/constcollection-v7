import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl mb-6">
            About ConstCollection
          </h1>
          <p className="font-['Inter'] text-lg text-gray-700 leading-relaxed mb-6">
            Since our founding in 2010, ConstCollection has been dedicated to showcasing exceptional contemporary art 
            and connecting collectors with emerging and established artists from around the world.
          </p>
          <p className="font-['Inter'] text-lg text-gray-700 leading-relaxed">
            Our carefully curated collection represents diverse perspectives and artistic movements, 
            making contemporary art accessible to collectors at every level.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1567155351752-5b7524c6d597?w=1200"
            alt="ConstCollection Gallery Interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <Separator className="my-16" />

      {/* Mission & Values */}
      <section className="mb-16">
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl mb-8 text-center">
          Our Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#3730A3] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-xl mb-3">Curated Excellence</h3>
            <p className="font-['Inter'] text-gray-600">
              Every piece in our collection is carefully selected for its artistic merit and cultural significance.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-xl mb-3">Artist Support</h3>
            <p className="font-['Inter'] text-gray-600">
              We champion emerging artists and provide a platform for their work to reach wider audiences.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#3730A3] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-xl mb-3">Global Reach</h3>
            <p className="font-['Inter'] text-gray-600">
              Connecting collectors worldwide with exceptional contemporary art from diverse cultures.
            </p>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl mb-8 text-center">
          Our Team
        </h2>
        <p className="font-['Inter'] text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Our passionate team of curators, art advisors, and specialists brings decades of combined experience 
          in the contemporary art world.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Sarah Mitchell', role: 'Founder & Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
            { name: 'David Chen', role: 'Chief Curator', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
            { name: 'Emma Rodriguez', role: 'Art Advisor', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
            { name: 'Michael Thompson', role: 'Collections Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto w-48">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Inter'] mb-1">{member.name}</h3>
              <p className="font-['Inter'] text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-12">
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl mb-8 text-center">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#3730A3] rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-['Inter'] mb-2">Visit Us</h3>
            <p className="font-['Inter'] text-sm text-gray-600">
              123 Gallery Street<br />
              Arts District, NY 10001
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#3730A3] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-['Inter'] mb-2">Call Us</h3>
            <p className="font-['Inter'] text-sm text-gray-600">
              +1 (555) 123-4567<br />
              Mon-Fri, 9am-6pm EST
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#3730A3] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-['Inter'] mb-2">Email Us</h3>
            <p className="font-['Inter'] text-sm text-gray-600">
              info@constcollection.com<br />
              sales@constcollection.com
            </p>
          </div>
        </div>
        <div className="text-center">
          <Button className="bg-[#FF6B6B] hover:bg-[#EE5A52] text-white" size="lg">
            <span className="font-['Inter']">Send Us a Message</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
