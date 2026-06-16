import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, X, ChevronRight, DoorOpen, Loader2, Music, Headphones, Smartphone } from 'lucide-react';

// Custom Icon components to prevent build errors on Cloudflare
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
  const audioRef = useRef(null);
  const scene = SCENES[currentSceneKey];

  useEffect(() => {
    setIsLoading(true);
    const img = new Image();
    img.src = scene.background;
    img.onload = () => { setIsLoading(false); setIsLoaded(true); };
  }, [currentSceneKey, scene.background]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black text-white font-sans overflow-hidden selection:bg-yellow-500">
      <audio ref={audioRef} src="/suga-and-spice.mp3" loop />
      <style>{`
        html, body, #root, #__next { margin: 0; padding: 0; width: 100vw; height: 100vh; overflow: hidden; }
      `}</style>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
           style={{ backgroundImage: `url(${scene.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40">
        <div className="text-2xl font-serif font-bold tracking-widest">MAYÉ</div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-4 text-white/70">
            <a href="https://www.instagram.com/lu__maye" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><InstagramIcon size={18} /></a>
            <a href="https://www.youtube.com/@lu_maye" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><YoutubeIcon size={18} /></a>
            <a href="https://www.tiktok.com/@lu_maye" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><Smartphone size={18} /></a>
            <a href="https://open.spotify.com/artist/7nREcJOl7efyzyDi5eIDYS" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><Headphones size={18} /></a>
            <a href="https://music.apple.com/us/artist/mayé/1648129929" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><Music size={18} /></a>
          </div>
          <button className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10 text-sm hover:bg-black/80 transition-colors">
            <ShoppingBag size={16} /> Cart ({cartCount})
          </button>
        </div>
      </nav>

      {isLoaded && scene.products.map((p) => (
        <button key={p.id} onClick={() => p.isDoor ? setCurrentSceneKey(p.targetScene) : setActiveProduct(p)}
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center group" style={{ left: p.x, top: p.y }}>
          <span className="absolute animate-ping w-8 h-8 rounded-full border border-white/50" />
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
            {p.isDoor ? <DoorOpen size={16} /> : <ChevronRight size={16} />}
          </div>
        </button>
      ))}

      {activeProduct && (
        <div className="absolute right-0 top-0 h-full w-full md:w-[400px] bg-black/90 backdrop-blur-2xl z-50 p-8 flex flex-col border-l border-white/10">
          <button onClick={() => setActiveProduct(null)} className="absolute top-6 right-6 p-2"><X size={24} /></button>
          <div className="flex-1 mt-12">
            <img src={activeProduct.image} className="w-full h-64 object-cover rounded-lg mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-2">{activeProduct.name}</h2>
            <p className="text-xl text-yellow-500 mb-6">${activeProduct.price}</p>
            <p className="text-gray-300 leading-relaxed">{activeProduct.desc}</p>
          </div>
          <button onClick={() => { setCartCount(c => c + 1); setActiveProduct(null); }} className="w-full py-4 bg-white text-black font-bold uppercase hover:bg-yellow-500 transition-colors">
            Add to Cart
          </button>
        </div>
      )}

      <div className="absolute bottom-6 w-full px-6 flex justify-between items-center z-40">
        <button onClick={() => setIsPlaying(!isPlaying)} className="p-4 bg-black/50 rounded-full backdrop-blur border border-white/10">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div className="flex gap-2 p-1 bg-black/50 rounded-full backdrop-blur border border-white/10">
          {Object.values(SCENES).map((s) => (
            <button key={s.id} onClick={() => setCurrentSceneKey(s.id)} className={`px-6 py-3 rounded-full text-xs font-bold uppercase ${currentSceneKey === s.id ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
