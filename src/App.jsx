I completely understand your frustration. The code you pasted is missing the product sidebar, the music player logic, and the background audio element, which breaks the experience you’ve worked so hard to build.

I have taken the exact code you just provided (with your new `SOCIAL_LINKS` array and your updated coordinates) and **merged it with the missing sidebar, the working audio player, and the custom icons so it doesn't crash Cloudflare.**

This is the **absolute final, 100% complete file**. Nothing is cut.

Copy everything below and paste it into `src/App.jsx`.

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, X, ChevronRight, DoorOpen, Loader2, Music, Headphones, Smartphone } from 'lucide-react';

// Custom Icon components to bypass the Lucide version error on Cloudflare
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const SCENES = {
  hotel: {
    id: 'hotel',
    name: 'The Hotel',
    background: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1781626534/home_ready_hotel_azeki6.png',
    products: [
      { 
        id: 'h1', 
        name: 'The Getaway Guitar', 
        price: 450, 
        x: '73%', y: '67%', 
        desc: 'Strum your way out. Classic acoustic guitar used in the sessions.',
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop'
      },
      { 
        id: 'h2', 
        name: 'Black Leather Briefcase', 
        price: 150, 
        x: '63%', y: '78%', 
        desc: 'Secure the bag. Premium black leather briefcase.',
        image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop'
      },
      {
        id: 'h3_door',
        name: 'Enter Bonny & Clyde Room',
        isDoor: true,
        targetScene: 'room',
        x: '33%', y: '65%'
      },
      {
        id: 'h4_escape',
        name: 'Drive Out (The Escape)',
        isDoor: true,
        targetScene: 'escape',
        x: '10%', y: '78%'
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
    background: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=2560&auto=format&fit=crop',
    products: [
      { 
        id: 'p8', 
        name: 'Suga & Spice Vinyl', 
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

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/lu__maye' },
  { name: 'YouTube', icon: YoutubeIcon, url: 'https://www.youtube.com/@lu_maye' },
  { name: 'TikTok', icon: Smartphone, url: 'https://www.tiktok.com/@lu_maye' },
  { name: 'Spotify', icon: Headphones, url: 'https://open.spotify.com/artist/7nREcJOl7efyzyDi5eIDYS' },
  { name: 'Apple Music', icon: Music, url: 'https://music.apple.com/us/artist/mayé/1648129929' },
];

export default function App() {
  const [currentSceneKey, setCurrentSceneKey] = useState('hotel');
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Audio reference for the music player
  const audioRef = useRef(null);

  const scene = SCENES[currentSceneKey];

  // Handle Image Preloading
  useEffect(() => {
    setIsLoading(true);
    setIsLoaded(false);
    
    const img = new Image();
    img.src = scene.background;
    
    const handleLoadComplete = () => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 50); 
    };

    img.onload = handleLoadComplete;
    img.onerror = () => {
      console.error("Failed to load background:", img.src);
      handleLoadComplete(); 
    };

    if (img.complete) {
      handleLoadComplete();
    }
  }, [currentSceneKey, scene.background]);

  // Handle Music Playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/suga-and-spice.mp3" loop />
      
      {/* Aggressive CSS Override for full screen */}
      <style>{`
        html, body, #root, #__next, div[id*="root"] {
          margin: 0 !important;
          padding: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          max-width: none !important;
          overflow: hidden !important;
          background-color: #000000 !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] bg-black">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      )}

      {/* Background Image Container */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${scene.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40">
        <div className="text-xl md:text-2xl font-serif font-bold tracking-widest drop-shadow-md select-none">MAYÉ</div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer" 
                className="group relative hover:text-yellow-400 transition-colors p-2 text-white/80"
              >
                <link.icon size={18} />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-black text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap pointer-events-none transition-opacity shadow-lg">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10 text-xs md:text-sm tracking-widest uppercase backdrop-blur-md hover:bg-black/70 focus:outline-none transition-colors">
            <ShoppingBag size={14} className="md:w-4 md:h-4" /> 
            <span>Cart ({cartCount})</span>
          </button>
        </div>
      </nav>

      {/* Hotspots */}
      {isLoaded && scene.products.map((p) => (
        <button
          key={p.id}
          onClick={() => {
            if (p.isDoor) {
              setActiveProduct(null);
              setCurrentSceneKey(p.targetScene);
            } else {
              setActiveProduct(p);
            }
          }}
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center group focus:outline-none"
          style={{ left: p.x, top: p.y }}
        >
          <span className={`absolute inset-0 rounded-full border-2 animate-ping ${p.isDoor ? 'border-yellow-500/50' : 'border-white/50'}`} />
          <div className={`w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors ${
            p.isDoor 
              ? 'bg-yellow-500/20 border-yellow-400 group-hover:bg-yellow-500' 
              : 'bg-white/20 border-white/30 group-hover:bg-yellow-500 group-hover:border-yellow-400'
          }`}>
            {p.isDoor ? <DoorOpen size={16} className="text-yellow-400 group-hover:text-black" /> : <ChevronRight size={16} className="text-white group-hover:text-black" />}
          </div>
          {/* Tooltip for the product name */}
          <span className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] md:text-xs font-medium tracking-wider bg-black/80 px-3 py-1 rounded backdrop-blur-sm pointer-events-none border border-white/10">
            {p.name}
          </span>
        </button>
      ))}

      {/* Product Details Sidebar */}
      <div 
        className={`absolute top-0 right-0 h-full w-full md:w-[400px] bg-black/90 backdrop-blur-2xl z-50 p-6 flex flex-col border-l border-white/10 shadow-2xl transform transition-transform duration-500 ease-out ${
          activeProduct ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {activeProduct && (
          <>
            <button 
              onClick={() => setActiveProduct(null)} 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
            >
              <X size={20} />
            </button>
            <div className="flex-1 mt-12 overflow-y-auto no-scrollbar">
              <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-64 object-cover rounded-lg mb-6 opacity-90" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">{activeProduct.name}</h2>
              <p className="text-xl text-yellow-500 font-medium mb-6">${activeProduct.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
              <p className="text-gray-300 leading-relaxed text-sm">{activeProduct.desc}</p>
              
              {/* Size Selector for wearable items */}
              {!['h1', 'h2', 'p6', 'p7', 'p8'].includes(activeProduct.id) && (
                <div className="space-y-3 mt-8">
                  <label className="text-xs tracking-widest uppercase text-gray-400">Size</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button key={size} className="w-10 h-10 rounded border border-white/20 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-all text-xs font-bold focus:outline-none">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => { setCartCount(c => c + 1); }} 
              className="w-full mt-6 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors focus:outline-none"
            >
              Add to Cart
            </button>
          </>
        )}
      </div>

      {/* Footer Controls */}
      <div className="absolute bottom-6 w-full px-4 md:px-6 flex justify-between items-center z-40 pointer-events-none">
        
        {/* Play Button & Equalizer */}
        <div className="flex items-center gap-3 bg-black/50 p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-yellow-500 transition-colors focus:outline-none"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-1" />}
          </button>
          <div className="pr-2 md:pr-4 select-none hidden sm:block">
            <p className="text-[10px] md:text-xs font-bold tracking-wider">SUGA & SPICE</p>
            <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest">Mayé X Bonny</p>
          </div>
          {isPlaying && (
            <div className="flex gap-1 pr-3 h-3 md:h-4 items-end">
              <div className="w-1 bg-yellow-500 animate-[bounce_1s_infinite] h-full" />
              <div className="w-1 bg-yellow-500 animate-[bounce_0.8s_infinite] h-2/3" />
              <div className="w-1 bg-yellow-500 animate-[bounce_1.2s_infinite] h-full" />
            </div>
          )}
        </div>
        
        {/* Scene Navigation */}
        <div className="flex gap-1 p-1 bg-black/50 rounded-full backdrop-blur-md border border-white/10 overflow-x-auto pointer-events-auto">
          {Object.values(SCENES).map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveProduct(null);
                setCurrentSceneKey(s.id);
              }}
              className={`px-3 md:px-4 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all focus:outline-none ${
                currentSceneKey === s.id ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
