import { ArtworkCardProps } from '../components/ArtworkCard';
import { ProductCardProps } from '../components/ProductCard';

export const mockArtworks: ArtworkCardProps[] = [
  {
    id: '1',
    title: 'Ethereal Dawn',
    artist: 'Marina Chen',
    price: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    medium: 'Oil on Canvas',
    dimensions: '36 x 48 inches',
    year: 2023,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '2',
    title: 'Urban Rhythms',
    artist: 'James Rodriguez',
    price: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1577083300740-a36ecb92b67f?w=800',
    medium: 'Acrylic on Canvas',
    dimensions: '30 x 40 inches',
    year: 2023,
    isNew: true,
  },
  {
    id: '3',
    title: 'Abstract Solitude',
    artist: 'Sophie Laurent',
    price: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
    medium: 'Mixed Media',
    dimensions: '48 x 60 inches',
    year: 2022,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Coastal Memories',
    artist: 'David Kim',
    price: 1950,
    imageUrl: 'https://images.unsplash.com/photo-1578926078829-d60a4a8bc9a9?w=800',
    medium: 'Watercolor',
    dimensions: '24 x 32 inches',
    year: 2023,
  },
  {
    id: '5',
    title: 'Midnight Garden',
    artist: 'Elena Volkova',
    price: 5600,
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    medium: 'Oil on Canvas',
    dimensions: '40 x 50 inches',
    year: 2023,
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Digital Dreams',
    artist: 'Alex Turner',
    price: 3100,
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
    medium: 'Digital Print',
    dimensions: '32 x 44 inches',
    year: 2023,
  },
  {
    id: '7',
    title: 'Tranquil Shores',
    artist: 'Maria Santos',
    price: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800',
    medium: 'Oil on Canvas',
    dimensions: '28 x 36 inches',
    year: 2022,
  },
  {
    id: '8',
    title: 'Geometric Harmony',
    artist: 'Thomas Wright',
    price: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800',
    medium: 'Acrylic on Canvas',
    dimensions: '36 x 48 inches',
    year: 2023,
    isNew: true,
  },
];

export const mockProducts: ProductCardProps[] = [
  {
    id: 'p1',
    name: 'Limited Edition Print - Ethereal Dawn',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    category: 'Prints',
    stock: 25,
  },
  {
    id: 'p2',
    name: 'Art Book: Contemporary Masters',
    price: 65,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    category: 'Books',
    stock: 42,
  },
  {
    id: 'p3',
    name: 'Gallery Tote Bag',
    price: 35,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
    category: 'Merchandise',
    stock: 3,
  },
  {
    id: 'p4',
    name: 'Signed Poster Set (3)',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    category: 'Prints',
    stock: 0,
  },
  {
    id: 'p5',
    name: 'Artist Series Notebook',
    price: 28,
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800',
    category: 'Stationery',
    stock: 58,
  },
  {
    id: 'p6',
    name: 'Framed Mini Print Collection',
    price: 185,
    imageUrl: 'https://images.unsplash.com/photo-1577083300740-a36ecb92b67f?w=800',
    category: 'Prints',
    stock: 12,
  },
];

export interface Exhibition {
  id: string;
  title: string;
  artist: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  isCurrent?: boolean;
  isUpcoming?: boolean;
}

export const mockExhibitions: Exhibition[] = [
  {
    id: 'e1',
    title: 'Whispers of Color',
    artist: 'Marina Chen',
    description: 'A stunning exploration of light and emotion through abstract expressionism.',
    startDate: '2024-12-01',
    endDate: '2025-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    isCurrent: true,
  },
  {
    id: 'e2',
    title: 'Urban Landscapes',
    artist: 'James Rodriguez',
    description: 'Contemporary perspectives on city life and architecture.',
    startDate: '2025-01-20',
    endDate: '2025-03-05',
    imageUrl: 'https://images.unsplash.com/photo-1577083300740-a36ecb92b67f?w=800',
    isUpcoming: true,
  },
  {
    id: 'e3',
    title: 'Nature Reimagined',
    artist: 'Sophie Laurent',
    description: 'Mixed media works celebrating the beauty of the natural world.',
    startDate: '2025-03-15',
    endDate: '2025-04-30',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
    isUpcoming: true,
  },
];
