
import React from 'react';
import { Product } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '').replace(',', ''));
    return sum + price;
  }, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/5 backdrop-blur-sm z-[60] transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-8 md:p-16">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black">Your Archive ({items.length})</h2>
            <button onClick={onClose} className="text-black/30 hover:text-black transition-colors text-[10px] uppercase tracking-[0.2em]">Close</button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-10 pr-4 scrollbar-hide">
            {items.length === 0 ? (
              <div className="text-black/20 text-[10px] uppercase tracking-[0.3em] h-full flex items-center justify-center">
                Archive is empty.
              </div>
            ) : (
              items.map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-20 aspect-[3/4] bg-gray-50 overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover grayscale" alt="" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-[9px] font-black tracking-widest uppercase">{item.name}</h3>
                      <button onClick={() => onRemove(i)} className="text-[8px] opacity-20 hover:opacity-100 transition-opacity">Remove</button>
                    </div>
                    <p className="text-[9px] font-light mt-2 opacity-40">{item.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="pt-10 border-t border-black/5 space-y-8">
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-widest font-light opacity-40">Estimated Total</span>
                <span className="text-xl font-black">${totalPrice.toLocaleString()}</span>
              </div>
              <button className="w-full bg-black text-white text-[10px] uppercase tracking-[0.5em] font-black py-6 hover:bg-black/90 transition-all">
                Finalize Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
