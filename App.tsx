
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewArrivals from './components/NewArrivals';
import CategorySection from './components/CategorySection';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import LoadingOverlay from './components/LoadingOverlay';
import Cart from './components/Cart';
import { CATEGORIES } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  const sectionRefs = {
    men: useRef<HTMLDivElement>(null),
    women: useRef<HTMLDivElement>(null),
    kids: useRef<HTMLDivElement>(null),
    top: useRef<HTMLDivElement>(null),
    newArrivals: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  useEffect(() => {
    if (isLoading || isCartOpen || selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading, isCartOpen, selectedProduct]);

  const scrollToSection = (id: string) => {
    const ref = (sectionRefs as any)[id];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    // Close detail view if navigating
    setSelectedProduct(null);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-white selection:bg-black selection:text-white">
      {isLoading && <LoadingOverlay onLoadingComplete={() => setIsLoading(false)} />}
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
      />

      {/* Product Detail Overlay/Page */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
          onProductSelect={handleProductSelect}
        />
      )}

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header 
          onNavigate={scrollToSection} 
          cartCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
        />
        
        <main className="flex-grow">
          {/* Top Hero Section */}
          <div ref={sectionRefs.top}>
            <Hero onShopClick={() => scrollToSection('newArrivals')} />
          </div>

          {/* New Arrivals Flow Section */}
          <div ref={sectionRefs.newArrivals}>
            <NewArrivals onAddToCart={handleProductSelect} />
          </div>
          
          <div className="py-20 md:py-40">
            {CATEGORIES.map((category) => (
              <div key={category.title} ref={(sectionRefs as any)[category.title.toLowerCase()]}>
                <CategorySection data={category} onAddToCart={handleProductSelect} />
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
