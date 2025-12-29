
export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: 'Men' | 'Women' | 'Kids';
}

export type Category = 'Men' | 'Women' | 'Kids';

export interface CategoryData {
  title: Category;
  subLinks: string[];
  products: Product[];
}
