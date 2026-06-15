import React, { useState, useEffect } from 'react';
import { ShoppingBag, Play, Pause, X, MapPin, ChevronRight, DoorOpen, Loader2 } from 'lucide-react';

// --- DATA ---
const SCENES = {
  hotel: {
    id: 'hotel',
    name: 'The Hotel',
    background: 'https://uploads.onecompiler.io/44jjpumhc/1781428187587/Untitled%20design.png',
    products: [
      { id: 'h1', name: 'The Getaway Guitar', price: 450, x: '82%', y: '60%', desc: 'Classic acoustic guitar used in the sessions.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' },
      { id: 'h2', name: 'Black Leather Briefcase', price: 150, x: '70%', y: '75%', desc: 'Premium black leather briefcase.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' },
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
      { id: 'p6', name: 'The Crimson Rose', price: 15, x: '60%', y: '45%', desc: 'Everlasting crimson rose.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop' },
      { id: 'p7', name: 'Getaway Money Briefcase', price: 120, x: '45%', y: '75%', desc: 'Secure aluminum briefcase.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' }
    ]
  },
  escape: {
    id: 'escape',
    name: 'The Escape',
    background: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=2560&auto=format&fit=crop',
    products: [
      { id: 'p8', name: 'Suga & Spice Vinyl (Yellow Edition)', price: 35, x: '50%', y: '60%', desc: 'Limited edition yellow vinyl.', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop' },
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

  useEffect(() => {
    setIsLoading(true);
    const img = new Image();
    img.src = SCENES[currentSceneKey].background;
    img.onload = () => setIsLoading(false);
  }, [currentSceneKey]);

  return (
    <div className="relative w-full h-screen bg-black text-white font-sans overflow-hidden">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${SCENES[currentSceneKey].background})` }}
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40">
        <div className="text-2xl font-bold tracking-widest italic">MAYÉ <span className="text-yellow-500 not-italic">RELATED</span></div>
        <button className="flex items-center gap-2 hover:text-yellow-400 transition-colors uppercase text-sm tracking-widest">
          <ShoppingBag size={18} /> Cart ({cartCount})
        </button>
      </nav>

      {/* Hotspots */}
      {!isLoading && SCENES[currentSceneKey].products.map((product) => (
        <button
          key={product.id}
          onClick={() => product.isDoor ? setCurrentSceneKey(product.targetScene) : setActiveProduct(product)}
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: product.x, top: product.y }}
        >
          <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:bg-yellow-500 transition-all">
            {product.isDoor ? <DoorOpen size={16} /> : <ChevronRight size={16} />}
          </div>
        </button>
      ))}

      {/* Footer Controls */}
      <div className="absolute bottom-8 w-full px-8 flex justify-between items-end z-40">
        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-yellow-500/20 transition-all">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <div className="flex gap-2">
          {Object.values(SCENES).map(s => (
            <button key={s.id} onClick={() => setCurrentSceneKey(s.id)} className={`px-4 py-2 text-xs uppercase tracking-widest ${currentSceneKey === s.id ? 'text-white' : 'text-gray-500'}`}>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}