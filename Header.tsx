
import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onNavigate: (id: string) => void;
  onOpenCart: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenCart, cartCount }) => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isScrolled = scrollY > 20;

  const navLinkClass = (id: string) => `
    relative py-1 group cursor-pointer transition-all duration-700 ease-out
    ${hoveredLink === id || (id === 'categories' && isCategoryOpen) ? 'text-black translate-y-[-1px]' : 'text-black/30'}
  `;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-8 px-6 pointer-events-none">
      <div className="relative flex flex-col items-center w-full pointer-events-none" ref={dropdownRef}>
        <header 
          className={`
            pointer-events-auto
            relative z-20 flex items-center justify-between
            transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1)
            bg-white/5 backdrop-blur-[32px]
            border border-white/40
            shadow-[0_10px_40px_rgba(0,0,0,0.03)]
            rounded-full overflow-visible
            ${isScrolled ? 'w-[75%] max-w-[1200px] h-14 px-10' : 'w-[92%] max-w-[1700px] h-20 px-16'}
          `}
        >
          {/* Optical Glass Highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
          
          {/* Left Side: Navigation */}
          <nav className="flex items-center space-x-12 text-[13px] uppercase tracking-[0.4em] font-bold">
            <button 
              onClick={() => onNavigate('top')}
              className={navLinkClass('home')}
              onMouseEnter={() => setHoveredLink('home')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Home
            </button>
            
            {/* Categories Wrapper for local dropdown positioning */}
            <div className="relative h-full flex items-center">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={navLinkClass('categories')}
                onMouseEnter={() => setHoveredLink('categories')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Categories
              </button>

              {/* Local Category Dropdown Menu */}
              <div 
                className={`
                  pointer-events-auto
                  absolute top-full left-0 mt-4
                  transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1)
                  ${isCategoryOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
                  min-w-[300px]
                `}
              >
                <div className="bg-white/95 backdrop-blur-3xl border border-black/5 rounded-2xl py-6 px-10 shadow-2xl flex flex-col space-y-4">
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => {
                        onNavigate(cat.toLowerCase());
                        setIsCategoryOpen(false);
                      }}
                      className="text-[13px] uppercase tracking-[0.4em] font-bold text-black/40 hover:text-black transition-colors duration-300 text-left"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Center: Brand Identity */}
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center pointer-events-none">
            <h1 className={`font-black tracking-[1.2em] translate-x-[0.6em] transition-all duration-1000 ease-in-out
              ${isScrolled ? 'text-[15px]' : 'text-2xl md:text-3xl'}`}>
              ENDT
            </h1>
          </div>

          {/* Right Side: Action & Search */}
          <nav className="flex items-center space-x-12 text-[13px] uppercase tracking-[0.4em] font-bold">
            <button 
              onClick={onOpenCart}
              className={`${navLinkClass('shop')} border-x border-black/5 px-6 flex items-center gap-3`}
              onMouseEnter={() => setHoveredLink('shop')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Shop {cartCount > 0 && <span className="bg-black text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">{cartCount}</span>}
            </button>
            
            {/* Search Bar Component */}
            <div className="relative flex items-center group/search">
              <input 
                type="text" 
                placeholder="SEARCH" 
                className="bg-transparent border-b border-black/10 w-24 md:w-40 py-1 text-[13px] tracking-[0.2em] outline-none placeholder:text-black/20 focus:w-48 focus:border-black/40 transition-all duration-700 uppercase font-bold"
              />
              <div className="ml-4 opacity-20 group-hover/search:opacity-100 transition-opacity cursor-pointer">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                   <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
              </div>
            </div>
          </nav>

          {/* Inner Lens Polish */}
          <div className="absolute inset-0 pointer-events-none border-[0.5px] border-black/5 rounded-full" />
        </header>
      </div>
    </div>
  );
};

export default Header;
