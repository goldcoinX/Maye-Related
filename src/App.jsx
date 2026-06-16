import React, { useState, useEffect } from 'react';
import { ShoppingBag, Play, Pause, X, MapPin, ChevronRight, DoorOpen, Loader2 } from 'lucide-react';

const SCENES = {
  hotel: {
    id: 'hotel',
    name: 'The Hotel',
    background: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1781575579/hotel-bg_szc4ai.png',
    products: [
      { id: 'h1', name: 'The Getaway Guitar', price: 450, x: '82%', y: '60%', desc: 'Strum your way out. Classic acoustic guitar used in the sessions.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' },
      { id: 'h2', name: 'Black Leather Briefcase', price: 150, x: '70%', y: '75%', desc: 'Secure the bag. Premium black leather briefcase.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' },
      { id: 'h3_door', name: 'Enter Bonny & Clyde Room', isDoor: true, targetScene: 'room', x: '30%', y: '65%' },
      { id: 'h4_escape', name: 'Drive Out (The Escape)', isDoor: true, targetScene: 'escape', x: '18%', y: '58%' }
    ]
  },
  room: {
    id: 'room',
    name: 'Bonny & Clyde Room',
    background: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2560&auto=format&fit=crop',
    products: [
      { id: 'p4', name: 'Mayé Red Plaid Suit', price: 350, x: '35%', y: '50%', desc: 'Tailored two-piece red plaid suit.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' },
      { id: 'p5', name: 'Bonny Black Moto Jacket', price: 180, x: '75%', y: '55%', desc: 'Official Bonny Moto Leather Jacket.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop' },
      { id: 'p6', name: 'The Crimson Rose', price: 15, x: '60%', y: '45%', desc: 'A preserved, everlasting crimson rose.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop' },
      { id: 'p7', name: 'Getaway Money Briefcase', price: 120, x: '45%', y: '75%', desc: 'Secure aluminum briefcase.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' }
    ]
  },
  escape: {
    id: 'escape',
    name: 'The Escape',
    background: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=2560&auto=format&fit=crop',
    products: [
      { id: 'p8', name: 'Suga & Spice Vinyl', price: 35, x: '50%', y: '60%', desc: 'Limited edition yellow translucent vinyl.', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop' },
      { id: 'p9', name: 'Bonny Pleated Mini-Skirt', price: 45, x: '70%', y: '50%', desc: 'Classic black pleated mini.', image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=500&auto=format&fit=crop' }
    ]
  }
};

export default function App() {
  const [currentSceneKey, setCurrentSceneKey] = useState('hotel');
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const scene = SCENES[currentSceneKey];

  useEffect(() => {
    setIsLoading(true);
    setIsLoaded(false);
    const img = new Image();
    img.src = scene.background;
    img.onload = () => { setIsLoading(false); setTimeout(() => setIsLoaded(true), 50); };
    img.onerror = () => { setIsLoading(false); setIsLoaded(true); };
    if (img.complete) { setIsLoading(false); setIsLoaded(true); }
  }, [currentSceneKey]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      )}

      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        style={{ backgroundImage: `url(${scene.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40">
        <div className="flex gap-8 items-center text-sm font-medium tracking-widest uppercase">
          <button className="hover:text-yellow-400 transition-colors hidden md:block">Albums</button>
          <button className="hover:text-yellow-400 transition-colors">Shop All</button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-xl font-serif tracking-widest font-bold">MAYÉ <span className="text-yellow-500 italic">RELATED</span></div>
        <button className="flex items-center gap-2 hover:text-yellow-400 transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          <ShoppingBag size={18} /> <span>Cart ({cartCount})</span>
        </button>
      </nav>

      {isLoaded && scene.products.map((product) => (
        <button
          key={product.id}
          onClick={() => product.isDoor ? setCurrentSceneKey(product.targetScene) : setActiveProduct(product)}
          className="absolute group z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: product.x, top: product.y }}
        >
          <span className={`absolute inset-0 rounded-full border-2 animate-ping ${product.isDoor ? 'border-yellow-500/50' : 'border-white/50'}`} />
          <span className={`relative flex items-center justify-center w-8 h-8 rounded-full border ${product.isDoor ? 'bg-yellow-500/20 border-yellow-400' : 'bg-white/20 border-white/40'}`}>
            {product.isDoor ? <DoorOpen size={16} className="text-yellow-400" /> : <ChevronRight size={16} />}
          </span>
        </button>
      ))}

      <div className={`absolute top-0 right-0 h-full w-full md:w-[400px] bg-black/90 backdrop-blur-xl border-l border-white/10 p-8 z-50 transition-transform ${activeProduct ? 'translate-x-0' : 'translate-x-full'}`}>
        {activeProduct && (
          <>
            <button onClick={() => setActiveProduct(null)} className="absolute top-6 right-6 p-2"><X size={20} /></button>
            <div className="mt-12 overflow-y-auto">
              <img src={activeProduct.image} alt={activeProduct.name} className="w-full aspect-square object-cover rounded-lg mb-6" />
              <h2 className="text-2xl font-serif font-bold mb-2">{activeProduct.name}</h2>
              <p className="text-yellow-500 text-xl font-medium mb-6">${activeProduct.price}</p>
              <p className="text-sm text-gray-300 leading-relaxed mb-8">{activeProduct.desc}</p>
            </div>
            <button onClick={() => setCartCount(c => c + 1)} className="w-full py-4 bg-white text-black font-bold uppercase hover:bg-yellow-500">Add to Cart</button>
          </>
        )}
      </div>

      <div className="absolute bottom-8 w-full px-4 flex justify-between items-center z-40">
        <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10">
          <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <div>
            <p className="text-xs font-bold tracking-wider">SUGA & SPICE</p>
            <p className="text-[10px] text-gray-400 uppercase">Mayé X Bonny</p>
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
          {Object.values(SCENES).map((s) => (
            <button key={s.id} onClick={() => setCurrentSceneKey(s.id)} className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${currentSceneKey === s.id ? 'bg-white text-black' : 'text-gray-400'}`}>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
