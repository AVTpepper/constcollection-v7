import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface NavigationProps {
  cartItemCount?: number;
  onNavigate?: (page: string) => void;
}

export function Navigation({ cartItemCount = 0, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: 'home' },
    { label: 'Gallery', path: 'gallery' },
    { label: 'Exhibitions', path: 'exhibitions' },
    { label: 'Shop', path: 'shop' },
    { label: 'About', path: 'about' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate?.(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center"
            aria-label="ConstCollection home"
          >
            <h1 className="font-['Playfair_Display'] text-2xl tracking-tight text-[#3730A3]">
              ConstCollection
            </h1>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Button>
            <button
              onClick={() => handleNavClick('cart')}
              className="relative"
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-['Inter']">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="font-['Inter'] text-gray-700 hover:text-[#3730A3] transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
