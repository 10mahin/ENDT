
import React, { useEffect, useState, useRef } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onProductSelect: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart, onProductSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    // Reset scroll position when product changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    return () => clearTimeout(timer);
  }, [product]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 700);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div 
      ref={scrollContainerRef}
      className={`fixed inset-0 z-[80] bg-white overflow-y-auto transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      {/* Sticky Header for Detail View */}
      <nav className="sticky top-0 left-0 w-full h-24 px-8 md:px-16 flex items-center justify-between z-20 bg-white/80 backdrop-blur-md border-b border-black/5">
        <button 
          onClick={handleClose}
          className="text-[10px] uppercase tracking-[0.6em] font-black group flex items-center gap-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-2 transition-transform duration-500">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Collection
        </button>
        <span className="text-[12px] font-black tracking-[1em] opacity-20 ml-8 hidden md:block">ENDT ARCHIVE ITEM No. 00{product.id}</span>
        <div className="w-24" /> {/* Spacer */}
      </nav>

      {/* Hero Product Section */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
        {/* Left Side: Large Image Gallery */}
        <div className="w-full lg:w-3/5 h-[70vh] lg:h-auto bg-[#F5F5F5] relative overflow-hidden group">
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover grayscale transition-transform duration-[2000ms] ${isVisible ? 'scale-100 blur-0' : 'scale-110 blur-xl'}`}
          />
          <div className="absolute inset-0 border-[40px] border-white/10 pointer-events-none" />
        </div>

        {/* Right Side: Information */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-24 bg-white border-l border-black/5">
          <div className={`max-w-lg w-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-[10px] uppercase tracking-[0.8em] font-black opacity-30 mb-4 block">
              {product.category} Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 uppercase">
              {product.name}
            </h1>
            <p className="text-2xl font-light tracking-tighter mb-12 opacity-60">
              {product.price}
            </p>

            <div className="space-y-12 mb-16">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black mb-4 text-black/40">The Narrative</h4>
                <p className="text-[13px] leading-relaxed opacity-60 font-light">
                  Expertly tailored in our London atelier, the {product.name.toLowerCase()} embodies the core philosophy of ENDT. Minimalist structure meets ultra-refined materials, creating a silhouette that is both architectural and organic.
                </p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black mb-4 text-black/40">Technical Specs</h4>
                <ul className="text-[11px] uppercase tracking-[0.2em] font-light space-y-2 opacity-50">
                  <li>— 100% Sustainable Architectural Fiber</li>
                  <li>— Hand-finished Seams</li>
                  <li>— Signature ENDT Hardware</li>
                  <li>— Made in United Kingdom</li>
                </ul>
              </div>

              <div className="grid grid-cols-4 gap-4">
                 {['S', 'M', 'L', 'XL'].map(size => (
                   <button key={size} className="border border-black/10 py-4 text-[10px] font-black hover:border-black transition-colors uppercase tracking-widest">
                     {size}
                   </button>
                 ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-black text-white text-[11px] uppercase tracking-[0.6em] font-black py-8 border border-black hover:bg-white hover:text-black transition-all duration-700"
              >
                Add to Archive
              </button>
              <button className="w-full bg-transparent text-black text-[10px] uppercase tracking-[0.4em] font-light py-4 opacity-40 hover:opacity-100 transition-opacity">
                Size & Fit Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="bg-[#fcfcfc] py-40 px-8 md:px-16 border-t border-black/5">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-[10px] uppercase tracking-[1.2em] font-black text-black/20 mb-4">Perspective</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                Related Items
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((p) => (
                <div key={p.id} className="group">
                  <ProductCard product={p} onAdd={() => onProductSelect(p)} />
                  <div className="mt-8 flex justify-between items-center px-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{p.name}</span>
                    <span className="text-[10px] font-light opacity-40">{p.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-[10px] uppercase tracking-[0.5em] opacity-20">
                End of Archive Category
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detail Footer */}
      <div className="py-20 text-center border-t border-black/5 opacity-20">
        <span className="text-[9px] uppercase tracking-[1em] font-black">ENDT ARCHIVE 2024</span>
      </div>
    </div>
  );
};

export default ProductDetail;
