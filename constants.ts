
import { CategoryData, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'OVERSIZED WOOL COAT', price: '$2,450', category: 'Men', image: 'https://picsum.photos/seed/kobe1/800/1200' },
  { id: '2', name: 'SILK MIDI DRESS', price: '$1,800', category: 'Women', image: 'https://picsum.photos/seed/kobe2/800/1200' },
  { id: '3', name: 'CASHMERE TURTLENECK', price: '$950', category: 'Men', image: 'https://picsum.photos/seed/kobe3/800/1200' },
  { id: '4', name: 'LEATHER CHELSEA BOOTS', price: '$1,100', category: 'Men', image: 'https://picsum.photos/seed/kobe4/800/1200' },
  { id: '5', name: 'STRUCTURED BLAZER', price: '$3,200', category: 'Women', image: 'https://picsum.photos/seed/kobe5/800/1200' },
  { id: '6', name: 'COTTON ESSENTIAL TEE', price: '$150', category: 'Kids', image: 'https://picsum.photos/seed/kobe6/800/1200' },
];

export const CATEGORIES: CategoryData[] = [
  {
    title: 'Men',
    subLinks: ['New Arrivals', 'Essentials', 'Outerwear', 'Footwear'],
    products: MOCK_PRODUCTS.filter(p => p.category === 'Men'),
  },
  {
    title: 'Women',
    subLinks: ['New Arrivals', 'Essentials', 'Outerwear', 'Footwear'],
    products: MOCK_PRODUCTS.filter(p => p.category === 'Women'),
  },
  {
    title: 'Kids',
    subLinks: ['New Arrivals', 'Essentials', 'Outerwear', 'Footwear'],
    products: MOCK_PRODUCTS.filter(p => p.category === 'Kids'),
  },
];
