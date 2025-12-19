import { useState } from 'react';
import { ProductCard, ProductCardProps } from '../components/ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

interface ShopPageProps {
  products: ProductCardProps[];
  onProductClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export function ShopPage({ products, onProductClick, onAddToCart }: ShopPageProps) {
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories for filter
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter and sort products
  let filteredProducts = [...products];
  
  if (filterCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
  }

  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl mb-4">
          Shop
        </h1>
        <p className="font-['Inter'] text-gray-600 text-lg">
          Art prints, books, and exclusive merchandise
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
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="font-['Inter']">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="font-['Inter']">
                    {category === 'all' ? 'All Categories' : category}
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
                <SelectItem value="name" className="font-['Inter']">Name</SelectItem>
                <SelectItem value="price-low" className="font-['Inter']">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="font-['Inter']">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="font-['Inter'] text-sm text-gray-600">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => onProductClick?.(product.id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="font-['Inter'] text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
}
