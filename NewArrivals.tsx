
import React, { useRef, useEffect } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface NewArrivalsProps {
  onAddToCart: (product: Product) => void;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ onAddToCart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate products for infinite marquee effect
  const displayProducts = [...MOCK_PRODUCTS, ...MOCK_PRODUCTS, ...MOCK_PRODUCTS];

  return (
    <section className="py-40 bg-white overflow-hidden border-t border-black/5">
      <div className="px-8 md:px-16 mb-20">
        <h2 className="text-[10px] uppercase tracking-[1.2em] font-black text-black/20 mb-4">Latest Release</h2>
        <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
          New Arrivals
        </h3>
      </div>

      <div className="relative group">
        {/* The Marquee Container */}
        <div className="flex overflow-hidden select-none">
          <div className="flex animate-marquee group-hover:pause whitespace-nowrap">
            {displayProducts.map((product, idx) => (
              <div 
                key={`${product.id}-${idx}`}
                className="inline-block w-[300px] md:w-[450px] px-4 cursor-pointer"
                onClick={() => onAddToCart(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 group/item">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale brightness-95 group-hover/item:scale-110 group-hover/item:brightness-75 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 bg-black/10 backdrop-blur-sm">
                    <span className="text-white text-[10px] uppercase tracking-[0.4em] font-black mb-2">View Piece</span>
                    <div className="w-8 h-px bg-white/40" />
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase">{product.name}</span>
                    <span className="text-[8px] font-light tracking-[0.1em] opacity-40 mt-1 uppercase">{product.category} Collection</span>
                  </div>
                  <span className="text-[10px] font-black tracking-widest">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Grid Overlay (Subtle) */}
        <div className="absolute inset-0 pointer-events-none border-y border-black/5 flex justify-between px-16">
           <div className="w-px h-full bg-black/[0.02]" />
           <div className="w-px h-full bg-black/[0.02]" />
           <div className="w-px h-full bg-black/[0.02]" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default NewArrivals;
