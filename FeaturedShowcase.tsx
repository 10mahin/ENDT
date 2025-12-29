
import React, { useState, useEffect, useRef } from 'react';

interface FeaturedShowcaseProps {
  onShopClick: () => void;
}

const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({ onShopClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full bg-[#f9f9f9] overflow-hidden flex items-center justify-center perspective-[2000px]"
    >
      {/* Background Floating Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mousePos.x * -1}px, ${mousePos.y * -1}px, -100px)` }}
      >
        <span className="text-[25vw] font-black text-black/[0.02] tracking-tighter uppercase leading-none">
          Archive
        </span>
      </div>

      {/* Main 3D Card */}
      <div 
        className={`relative z-10 w-[80%] max-w-[1200px] aspect-[16/9] transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
        style={{ 
          transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Shadow Layer */}
        <div className="absolute inset-10 bg-black/5 blur-3xl rounded-full translate-z-[-50px]" />

        {/* Image Container */}
        <div className="absolute inset-0 bg-white shadow-[0_50px_100px_rgba(0,0,0,0.08)] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop" 
            alt="Featured Product"
            className="w-full h-full object-cover grayscale brightness-90 hover:brightness-100 transition-all duration-1000"
            style={{ transform: `scale(1.1) translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Layers with varying depths */}
        <div 
          className="absolute bottom-20 left-20 text-white pointer-events-none"
          style={{ transform: 'translateZ(80px)' }}
        >
          <span className="text-[10px] uppercase tracking-[1em] font-black opacity-60 mb-4 block">New Revelation</span>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
            VOID-TEX <br/> SHELL
          </h3>
          <p className="text-[10px] uppercase tracking-[0.4em] font-light max-w-xs opacity-80 leading-relaxed">
            Engineered from recycled architectural fibers. Water-resistant. Breathable. Eternal.
          </p>
        </div>

        <div 
          className="absolute top-20 right-20 pointer-events-auto"
          style={{ transform: 'translateZ(120px)' }}
        >
          <button 
            onClick={onShopClick}
            className="bg-black text-white px-12 py-6 text-[10px] uppercase tracking-[0.8em] font-black hover:bg-white hover:text-black transition-all duration-500 shadow-2xl border border-black"
          >
            Explore Piece
          </button>
        </div>

        {/* Detail specs at a deep layer */}
        <div 
          className="absolute top-20 left-20 text-black/20 text-[8px] uppercase tracking-[0.5em] font-black"
          style={{ transform: 'translateZ(40px)' }}
        >
          Collection 2024 / No. 001
        </div>
      </div>

      {/* Interactive Floating Particles/Elements */}
      <div 
        className="absolute top-1/4 right-1/4 w-12 h-12 border border-black/5 rounded-full"
        style={{ transform: `translate3d(${mousePos.x * 2}px, ${mousePos.y * 2}px, 50px)` }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-32 h-px bg-black/10"
        style={{ transform: `translate3d(${mousePos.x * -3}px, ${mousePos.y * -3}px, 30px) rotate(45deg)` }}
      />
    </section>
  );
};

export default FeaturedShowcase;
