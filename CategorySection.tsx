
import React, { useEffect, useRef, useState } from 'react';
import { CategoryData, Product } from '../types';
import ProductCard from './ProductCard';

interface CategorySectionProps {
  data: CategoryData;
  onAddToCart: (product: Product) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ data, onAddToCart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-32 px-8 md:px-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase">{data.title}</h2>
            <nav className="flex flex-wrap gap-x-8 gap-y-2">
              {data.subLinks.map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-[10px] uppercase tracking-[0.2em] font-light hover:opacity-100 opacity-40 transition-opacity"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <a href="#" className="text-[10px] uppercase tracking-[0.3em] font-bold pb-1 border-b border-black inline-block h-fit">
            Explore All {data.title}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-black/5 border border-black/5">
          {data.products.slice(0, 3).map((product, idx) => (
            <div 
              key={product.id} 
              className={`transition-all duration-1000 delay-${idx * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <ProductCard product={product} onAdd={() => onAddToCart(product)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
