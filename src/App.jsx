import React, { useState, useEffect } from 'react';
import { ShoppingBag, Play, Pause, X, MapPin, ChevronRight, DoorOpen } from 'lucide-react';

// --- DATA ---
const SCENES = {
  hotel: {
    id: 'hotel',
    name: 'The Hotel',
    background: 'https://uploads.onecompiler.io/44jjpumhc/1781428187587/Untitled%20design.png',
    products: [
      { 
        id: 'h1', 
        name: 'The Getaway Guitar', 
        price: 450, 
        x: '82%', y: '60%', 
        desc: 'Strum your way out. Classic acoustic guitar used in the sessions.',
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop'
      },
      { 
        id: 'h2', 
        name: 'Black Leather Briefcase', 
        price: 150, 
        x: '70%', y: '75%', 
        desc: 'Secure the bag. Premium black leather briefcase.',
        image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop'
      },
      {
        id: 'h3_door',
        name: 'Enter Bonny & Clyde Room',
        isDoor: true,
        targetScene: 'room',
        x: '30%', y: '65%'
      },
      {
        id: 'h4_escape',
        name: 'Drive Out (The Escape)',
        isDoor: true,
        targetScene: 'escape',
        x: '18%', y: '58%'
      }
    ]
  },
  room: {
    id: 'room',
    name: 'Bonny & Clyde Room',
    background: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2560&auto=format&fit=crop',
    products: [
      { 
        id: 'p4', 
        name: 'Mayé Red Plaid Suit', 
        price: 350, 
        x: '35%', y: '50%', 
        desc: 'Tailored two-piece red plaid suit. As worn by Mayé while counting the stash.',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop'
      },
      { 
        id: 'p5', 
        name: 'Bonny Black Moto Jacket', 
        price: 180, 
        x: '75%', y: '55%', 
        desc: '"You like it when I dress up..." Official Bonny Moto Leather Jacket.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop'
      },
      { 
        id: 'p6', 
        name: 'The Crimson Rose', 
        price: 15, 
        x: '60%', y: '45%', 
        desc: 'A preserved, everlasting crimson rose. "I do care baby..."',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop'
      },
      { 
        id: 'p7', 
        name: 'Getaway Money Briefcase', 
        price: 120, 
        x: '45%', y: '75%', 
        desc: 'Secure aluminum briefcase filled with prop $100 bills.',
        image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop'
      }
    ]
  },
  escape: {
    id: 'escape',
    name: 'The Escape',
    // Note: Swap this URL with your escape driving screenshot in production
    background: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=2560&auto=format&fit=crop',
    products: [
      { 
        id: 'p8', 
        name: 'Suga & Spice Vinyl (Yellow Edition)', 
        price: 35, 
        x: '50%', y: '60%', 
        desc: 'Limited edition yellow translucent vinyl featuring the Beatnasti instrumental.',
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop'
      },
      {
        id: 'p9',
        name: 'Bonny Pleated Mini-Skirt',
        price: 45,
        x: '70%', y: '50%',
        desc: '"Put my little skirt on..." Classic black pleated mini.',
        image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=500&auto=format&fit=crop'
      }
    ]
  }
};

export default function App() {
  const [currentSceneKey, setCurrentSceneKey] = useState('hotel');
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const scene = SCENES[currentSceneKey];

  // Simulated loading effect for premium feel
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [currentSceneKey]);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* Background Environment */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-70' : 'opacity-0 scale-105'}`}
        style={{
          backgroundImage: `url(${scene.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transitionProperty: 'opacity, transform'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40">
        <div className="flex gap-8 items-center text-sm font-medium tracking-widest uppercase">
          <button className="hover:text-yellow-400 transition-colors hidden md:block">Albums</button>
          <button className="hover:text-yellow-400 transition-colors hidden md:block">Projects</button>
          <button className="hover:text-yellow-400 transition-colors">Shop All</button>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-serif tracking-widest font-bold whitespace-nowrap">
          MAYÉ <span className="text-yellow-500 italic">RELATED</span>
        </div>

        <button className="flex items-center gap-2 hover:text-yellow-400 transition-colors text-sm font-medium tracking-widest uppercase">
          <ShoppingBag size={18} />
          <span>Cart ({cartCount})</span>
        </button>
      </nav>

      {/* Interactive Hotspots */}
      {isLoaded && scene.products.map((product) => (
        <button
          key={product.id}
          onClick={() => {
            if (product.isDoor) {
              setActiveProduct(null);
              setCurrentSceneKey(product.targetScene);
            } else {
              setActiveProduct(product);
            }
          }}
          className="absolute group z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: product.x, top: product.y }}
        >
          {/* Pulsing ring */}
          <span className={`absolute inset-0 rounded-full border-2 animate-ping ${product.isDoor ? 'border-yellow-500/50' : 'border-white/50'}`} />
          {/* Main button dot */}
          <span className={`relative flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md border transition-all duration-300 ${
            product.isDoor 
              ? 'bg-yellow-500/20 border-yellow-400 group-hover:bg-yellow-500' 
              : 'bg-white/20 border-white/40 group-hover:bg-yellow-500 group-hover:border-yellow-400'
          }`}>
            {product.isDoor ? (
              <DoorOpen size={16} className="text-yellow-400 group-hover:text-black" />
            ) : (
              <ChevronRight size={16} className="text-white group-hover:text-black" />
            )}
          </span>
          {/* Hover Label */}
          <span className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-medium tracking-wider bg-black/60 px-3 py-1 rounded backdrop-blur-sm pointer-events-none">
            {product.name}
          </span>
        </button>
      ))}

      {/* Product Slide-out Panel */}
      <div 
        className={`absolute top-0 right-0 h-full w-full md:w-[400px] bg-black/80 backdrop-blur-xl border-l border-white/10 p-8 z-50 transform transition-transform duration-500 ease-out flex flex-col ${
          activeProduct ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {activeProduct && (
          <>
            <button 
              onClick={() => setActiveProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex-1 mt-12 overflow-y-auto no-scrollbar">
              <div className="w-full aspect-square bg-gray-900 rounded-lg mb-6 overflow-hidden relative">
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop' }}
                />
              </div>
              
              <h2 className="text-2xl font-serif font-bold mb-2">{activeProduct.name}</h2>
              <p className="text-yellow-500 text-xl font-medium mb-6">${activeProduct.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
              
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed mb-8">
                <p>{activeProduct.desc}</p>
              </div>
              
              {/* Sizing (Skip for non-apparel items like Rose/Car/Briefcase) */}
              {!['p1', 'p6', 'p7', 'p8'].includes(activeProduct.id) && (
                <div className="space-y-3 mb-8">
                  <label className="text-xs tracking-widest uppercase text-gray-400">Size</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button key={size} className="w-10 h-10 rounded border border-white/20 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors rounded-none"
            >
              Add to Cart
            </button>
          </>
        )}
      </div>

      {/* Bottom Controls (Music & Scene Navigation) */}
      <div className="absolute bottom-8 w-full px-4 md:px-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 z-40 pointer-events-none">
        
        {/* Music Player */}
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 pointer-events-auto self-start md:self-auto">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-yellow-500 transition-colors flex-shrink-0"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
          </button>
          <div className="pr-4">
            <p className="text-xs font-bold tracking-wider">SUGA & SPICE</p>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Mayé X Bonny</p>
          </div>
          {isPlaying && (
            <div className="flex gap-1 pr-4 h-4 items-end">
              <div className="w-1 bg-yellow-500 animate-[bounce_1s_infinite] h-full" />
              <div className="w-1 bg-yellow-500 animate-[bounce_0.8s_infinite] h-2/3" />
              <div className="w-1 bg-yellow-500 animate-[bounce_1.2s_infinite] h-full" />
            </div>
          )}
        </div>

        {/* Scene Switcher */}
        <div className="flex flex-col items-center md:items-end gap-3 pointer-events-auto">
          <span className="text-xs tracking-widest uppercase text-gray-400 flex items-center gap-2">
            <MapPin size={12} /> Explore
          </span>
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            {Object.values(SCENES).map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveProduct(null);
                  setCurrentSceneKey(s.id);
                }}
                className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  currentSceneKey === s.id 
                    ? 'bg-white text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}