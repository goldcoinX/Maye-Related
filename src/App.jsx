import React, { useState, useEffect } from 'react';
import { ShoppingBag, Play, Pause, X, ChevronRight, DoorOpen, Loader2, Instagram, Youtube, Music, Headphones, Smartphone } from 'lucide-react';

const SCENES = {
  hotel: {
    id: 'hotel',
    name: 'The Hotel',
    background: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1781626534/home_ready_hotel_azeki6.png',
    products: [
      { id: 'h1', name: 'The Getaway Guitar', price: 450, x: '73%', y: '67%', desc: 'Strum your way out. Classic acoustic guitar used in the sessions.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' },
      { id: 'h2', name: 'Black Leather Briefcase', price: 150, x: '63%', y: '78%', desc: 'Secure the bag. Premium black leather briefcase.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' },
      { id: 'h3_door', name: 'Enter Bonny & Clyde Room', isDoor: true, targetScene: 'room', x: '33%', y: '65%' },
      { id: 'h4_escape', name: 'Drive Out (The Escape)', isDoor: true, targetScene: 'escape', x: '10%', y: '78%' }
    ]
  },
  room: {
    id: 'room',
    name: 'Bonny & Clyde Room',
    background: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2560&auto=format&fit=crop',
    products: [
      { id: 'p4', name: 'Mayé Red Plaid Suit', price: 350, x: '35%', y: '50%', desc: 'Tailored two-piece red plaid suit.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' },
      { id: 'p5', name: 'Bonny Black Moto Jacket', price: 180, x: '75%', y: '55%', desc: 'Official Bonny Moto Leather Jacket.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop' }
    ]
  },
  escape: {
    id: 'escape',
    name: 'The Escape',
    background: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=2560&auto=format&fit=crop',
    products: [
      { id: 'p8', name: 'Suga & Spice Vinyl', price: 35, x: '50%', y: '60%', desc: 'Limited edition yellow translucent vinyl.', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop' }
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
    const img = new Image();
    img.src = scene.background;
    img.onload = () => { setIsLoading(false); setIsLoaded(true); };
  }, [currentSceneKey, scene.background]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black text-white font-sans">
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ backgroundImage: `url(${scene.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Header */}
      <nav className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40">
        <div className="text-xl md:text-2xl font-serif font-bold tracking-widest">MAYÉ</div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-3 text-white/70">
            <a href="https://www.instagram.com/lu__maye" target="_blank" rel="noreferrer"><Instagram size={18} /></a>
            <a href="https://www.youtube.com/@lu_maye" target="_blank" rel="noreferrer"><Youtube size={18} /></a>
            <a href="https://www.tiktok.com/@lu_maye" target="_blank" rel="noreferrer"><Smartphone size={18} /></a>
            <a href="https://open.spotify.com/artist/7nREcJOl7efyzyDi5eIDYS" target="_blank" rel="noreferrer"><Headphones size={18} /></a>
            <a href="https://music.apple.com/us/artist/mayé/1648129929" target="_blank" rel="noreferrer"><Music size={18} /></a>
          </div>
          <button className="flex items-center gap-1 bg-black/50 px-3 py-1.5 rounded-full border border-white/10 text-xs hover:bg-black/80 transition-colors">
            <ShoppingBag size={14} /> <span>({cartCount})</span>
          </button>
        </div>
      </nav>

      {/* Hotspots */}
      {isLoaded && scene.products.map((p) => (
        <button
          key={p.id}
          onClick={() => p.isDoor ? setCurrentSceneKey(p.targetScene) : setActiveProduct(p)}
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
          style={{ left: p.x, top: p.y }}
        >
          <span className="absolute animate-ping w-8 h-8 rounded-full border border-white/50" />
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
            {p.isDoor ? <DoorOpen size={14} /> : <ChevronRight size={14} />}
          </div>
        </button>
      ))}

      {/* Product Sidebar */}
      {activeProduct && (
        <div className="absolute right-0 top-0 h-full w-full md:w-[400px] bg-black/90 backdrop-blur-2xl z-50 p-6 flex flex-col border-l border-white/10 shadow-2xl">
          <button onClick={() => setActiveProduct(null)} className="absolute top-4 right-4 p-2"><X size={24} /></button>
          <div className="flex-1 mt-10">
            <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-64 object-cover rounded-lg mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-2">{activeProduct.name}</h2>
            <p className="text-xl text-yellow-500 mb-6">${activeProduct.price}</p>
            <p className="text-gray-300 leading-relaxed">{activeProduct.desc}</p>
          </div>
          <button onClick={() => { setCartCount(c => c + 1); setActiveProduct(null); }} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors">
            Add to Cart
          </button>
        </div>
      )}

      {/* Footer Controls */}
      <div className="absolute bottom-6 w-full px-4 flex justify-between items-center z-40">
        <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-black/50 rounded-full backdrop-blur border border-white/10">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div className="flex gap-1 p-1 bg-black/50 rounded-full backdrop-blur border border-white/10">
          {Object.values(SCENES).map((s) => (
            <button key={s.id} onClick={() => setCurrentSceneKey(s.id)} className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase ${currentSceneKey === s.id ? 'bg-white text-black' : 'text-gray-400'}`}>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
