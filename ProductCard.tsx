
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <div 
      className="group relative aspect-[3/4] overflow-hidden bg-white cursor-pointer"
      onClick={onAdd}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-105 group-hover:brightness-50 transition-all duration-700 ease-out"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[4px]">
        <h3 className="text-white text-[10px] font-black tracking-[0.3em] mb-2">{product.name}</h3>
        <p className="text-white text-[9px] font-light tracking-[0.2em] mb-8">{product.price}</p>
        <div className="text-white text-[8px] uppercase tracking-[0.5em] font-black py-3 px-8 border border-white/20 hover:border-white transition-colors">
          View Detail
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
