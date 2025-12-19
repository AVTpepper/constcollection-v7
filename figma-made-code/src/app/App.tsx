import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { ArtworkDetailPage } from './pages/ArtworkDetailPage';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ExhibitionsPage } from './pages/ExhibitionsPage';
import { AboutPage } from './pages/AboutPage';
import { mockArtworks, mockProducts, mockExhibitions } from './data/mockData';
import { CartItem } from './components/CartSummary';
import { toast, Toaster } from 'sonner';

type Page = 'home' | 'gallery' | 'artwork-detail' | 'shop' | 'cart' | 'checkout' | 'exhibitions' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Get featured artworks for home page
  const featuredArtworks = mockArtworks.filter(a => a.isFeatured);
  const currentExhibition = mockExhibitions.find(e => e.isCurrent);

  // Navigation handlers
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleArtworkClick = (id: string) => {
    setSelectedArtworkId(id);
    setCurrentPage('artwork-detail');
    window.scrollTo(0, 0);
  };

  // Cart handlers
  const handleAddToCart = (id: string) => {
    // Find the item (could be artwork or product)
    const artwork = mockArtworks.find(a => a.id === id);
    const product = mockProducts.find(p => p.id === id);
    
    const item = artwork || product;
    if (!item) return;

    const cartItem: CartItem = {
      id: item.id,
      name: 'title' in item ? item.title : item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
    };

    setCartItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        toast.success('Updated quantity in cart');
        return prev.map(i => 
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success('Added to cart');
      return [...prev, cartItem];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Removed from cart');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
    window.scrollTo(0, 0);
  };

  const handleCheckoutSubmit = (data: any) => {
    console.log('Order submitted:', data);
    toast.success('Order placed successfully!');
    setCartItems([]);
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  // Get cart item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Get selected artwork for detail page
  const selectedArtwork = selectedArtworkId 
    ? mockArtworks.find(a => a.id === selectedArtworkId)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Inter']">
      <Toaster position="top-center" />
      
      <Navigation 
        cartItemCount={cartItemCount}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            featuredArtworks={featuredArtworks}
            currentExhibition={currentExhibition}
            onNavigate={handleNavigate}
            onArtworkClick={handleArtworkClick}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            artworks={mockArtworks}
            onArtworkClick={handleArtworkClick}
          />
        )}

        {currentPage === 'artwork-detail' && selectedArtwork && (
          <ArtworkDetailPage
            artwork={selectedArtwork}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentPage('gallery')}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={mockProducts}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onContinueShopping={() => setCurrentPage('shop')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            onBack={() => setCurrentPage('cart')}
            onSubmit={handleCheckoutSubmit}
          />
        )}

        {currentPage === 'exhibitions' && (
          <ExhibitionsPage
            exhibitions={mockExhibitions}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}
      </main>

      <Footer />
    </div>
  );
}
