
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('Global / English');

  return (
    <footer className="bg-black pt-64 pb-32 px-10 md:px-24 border-t border-white/10 text-white selection:bg-black selection:text-white">
      <div className="max-w-[2200px] mx-auto">
        {/* Top Tier: Newsletter & Global Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-40">
          <div className="lg:col-span-5 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-white">Join our email list</h4>
            <p className="text-[10px] font-light leading-relaxed opacity-40 uppercase tracking-[0.2em] text-white">
              Get exclusive deals and early access to new products.
            </p>
            <div className="relative group max-w-lg pt-4 flex">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL" 
                className="w-full bg-white text-black py-5 px-6 text-[11px] uppercase tracking-[0.4em] outline-none placeholder:text-black/30 transition-all duration-500 font-bold"
              />
              <button className="bg-white text-black border-l border-black/5 px-8 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-black hover:text-white transition-all duration-500">
                Join
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-white">Region</h4>
            <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-light group">
              <span className="opacity-40 group-hover:opacity-100 transition-opacity text-white">{region}</span>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-20 group-hover:translate-x-1 transition-transform">
                <path d="M1 1L4 4L7 1" stroke="white" strokeWidth="1"/>
              </svg>
            </button>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-white">Concierge</h4>
            <div className="space-y-4 text-[10px] uppercase tracking-[0.4em] font-light">
              <p className="opacity-40 text-white">T. +44 (0) 20 7000 0000</p>
              <a href="mailto:concierge@endt.studio" className="block opacity-40 hover:opacity-100 transition-opacity text-white">concierge@endt.studio</a>
            </div>
          </div>
        </div>

        {/* Middle Tier: Main Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16">
          <div className="space-y-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Utilities</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] font-light">
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Search Archive</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Your Account</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Cart / Archive</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Order Tracking</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">The House</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] font-light">
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Heritage</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Atelier</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Sustainability</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Careers</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Services</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] font-light">
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Shipping</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Returns</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Store Locator</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Appointments</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Legal</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] font-light">
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Privacy Policy</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Terms of Use</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Cookies</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Social</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] font-light">
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Instagram</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">Vimeo</a></li>
              <li><a href="#" className="opacity-60 hover:opacity-100 transition-all text-white">TikTok</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
