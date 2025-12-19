import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#3730A3] text-white mt-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-['Playfair_Display'] text-2xl mb-4">
              ConstCollection
            </h3>
            <p className="font-['Inter'] text-gray-300 text-sm">
              Curating exceptional contemporary art for discerning collectors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Inter'] mb-4">Quick Links</h4>
            <ul className="space-y-2 font-['Inter'] text-sm">
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#exhibitions" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Exhibitions
                </a>
              </li>
              <li>
                <a href="#shop" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-['Inter'] mb-4">Support</h4>
            <ul className="space-y-2 font-['Inter'] text-sm">
              <li>
                <a href="#contact" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#shipping" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#returns" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-['Inter'] mb-4">Stay Connected</h4>
            <p className="font-['Inter'] text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for updates.
            </p>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://instagram.com" 
                className="text-gray-300 hover:text-[#FF6B6B] transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                className="text-gray-300 hover:text-[#FF6B6B] transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-gray-300 hover:text-[#FF6B6B] transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@constcollection.com" 
                className="text-gray-300 hover:text-[#FF6B6B] transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="font-['Inter'] text-gray-300 text-sm">
            © {new Date().getFullYear()} ConstCollection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
