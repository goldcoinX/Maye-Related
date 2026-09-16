import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, X, Loader2, Mail } from 'lucide-react';

// Standard layout hitboxes that appear on every screen (Top and Bottom Hand-Drawn Nav)
const GLOBAL_NAV_HITBOXES = [
  { id: 'nav-bio', action: 'modal', target: 'BIO', label: 'BIO', x: '13%', y: '4%', w: '60px', h: '40px' },
  { id: 'nav-music', action: 'modal', target: 'MUSIC', label: 'MUSIC', x: '32%', y: '4%', w: '70px', h: '40px' },
  { id: 'nav-gallery', action: 'modal', target: 'GALLERY', label: 'GALLERY', x: '58%', y: '4%', w: '90px', h: '40px' },
  { id: 'nav-join', action: 'modal', target: 'JOIN', label: 'JOIN', x: '85%', y: '4%', w: '60px', h: '40px' },
  { id: 'nav-tour', action: 'modal', target: 'TOUR', label: 'TOUR', x: '20%', y: '95%', w: '70px', h: '40px' },
  { id: 'nav-merch', action: 'cart', target: null, label: 'MERCH', x: '80%', y: '95%', w: '70px', h: '40px' }
];

const SCENES = {
  hotel: {
    id: 'hotel',
    backgroundMobile: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580313/1_the_hotel_h3udh8.png',
    hitboxes: [
      ...GLOBAL_NAV_HITBOXES,
      // B & C ROOM Door Sign
      { id: 'h-room', action: 'scene', target: 'room', label: 'B&C Room', x: '82%', y: '29%', w: '100px', h: '40px' },
      // Lumusic HQ ID Badge
      { id: 'h-badge', action: 'product', target: { name: 'Lumusic HQ ID Badge', price: 25, desc: 'Official Lumusic Staff Badge.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' }, x: '78%', y: '74%', w: '110px', h: '70px' }
    ]
  },
  room: {
    id: 'room',
    backgroundMobile: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580317/2_the_new_pharoah_black_cat_vmfw9q.png',
    hitboxes: [
      ...GLOBAL_NAV_HITBOXES,
      // The Black Cat
      { id: 'r-cat', action: 'product', target: { name: 'The Black Cat', price: 999, desc: 'The New Pharoah.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' }, x: '25%', y: '68%', w: '80px', h: '100px' },
      // Gun Polaroid
      { id: 'r-gun', action: 'product', target: { name: 'Gun Polaroid', price: 150, desc: 'Evidence.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop' }, x: '78%', y: '82%', w: '90px', h: '70px' },
      // THE ESCAPE Bubble
      { id: 'r-escape', action: 'scene', target: 'escape', label: 'The Escape', x: '50%', y: '85%', w: '140px', h: '40px' }
    ]
  },
  escape: {
    id: 'escape',
    backgroundMobile: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580311/3_the_escape_mc2sqm.png',
    hitboxes: [
      ...GLOBAL_NAV_HITBOXES,
      // Back to The Hotel Sticker
      { id: 'e-hotel', action: 'scene', target: 'hotel', label: 'Back to Hotel', x: '77%', y: '62%', w: '120px', h: '100px' }
    ]
  }
};

export default function App() {
  const [currentSceneKey, setCurrentSceneKey] = useState('hotel');
  const [activeProduct, setActiveProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const audioRef = useRef(null);
  const scene = SCENES[currentSceneKey];

  useEffect(() => {
    audioRef.current = new Audio('https://res.cloudinary.com/dccxjo9x8/video/upload/v1781667910/May%C3%A9_X_Bonnie_Suga_and_Spice_Mixed__1756223314000_1756223314000_6279753_ahvioq.mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    setIsLoading(true);
    setIsLoaded(false);

    const img = new Image();
    img.src = scene.backgroundMobile;
    const handleLoadComplete = () => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 50); 
    };
    img.onload = handleLoadComplete;
    img.onerror = handleLoadComplete;
    if (img.complete) handleLoadComplete();
  }, [currentSceneKey, scene]);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    setActiveProduct(null);
    setIsCartOpen(true);
  };

  const handleHitboxAction = (hitbox) => {
    setActiveProduct(null);
    
    switch (hitbox.action) {
      case 'scene':
        setCurrentSceneKey(hitbox.target);
        break;
      case 'modal':
        setActiveModal(hitbox.target);
        break;
      case 'product':
        setActiveProduct(hitbox.target);
        break;
      case 'cart':
        setIsCartOpen(true);
        break;
      default:
        break;
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="mx-auto relative w-full max-w-[500px] h-[100dvh] overflow-hidden bg-black text-white font-sans selection:bg-yellow-500 selection:text-black shadow-2xl">
      
      <style>{`
        body { background-color: #111; display: flex; justify-content: center; margin: 0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      )}

      {/* Main Background Art */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${scene.backgroundMobile})`,
          backgroundSize: '100% 100%', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* INVISIBLE HITBOX RENDERER */}
      {isLoaded && scene.hitboxes.map((hitbox) => (
        <button
          key={hitbox.id}
          onClick={() => handleHitboxAction(hitbox)}
          aria-label={hitbox.label || hitbox.id}
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer"
          style={{ 
            left: hitbox.x, 
            top: hitbox.y,
            width: hitbox.w,
            height: hitbox.h,
            background: 'transparent', 
            border: 'none',
          }}
        />
      ))}

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 sm:absolute bg-black/90 backdrop-blur-xl z-[70] flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-black border border-white/20 rounded-2xl p-6 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            {activeModal === 'BIO' && (
              <div className="space-y-4 pt-4">
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-4 text-yellow-500">Biography</h2>
                <p className="text-sm leading-relaxed text-gray-300">
                  MAYÉ is an independent visionary artist blending sultry R&B textures, cinematic storytelling, and genre-defying production.
                </p>
              </div>
            )}

            {activeModal === 'TOUR' && (
              <div className="pt-4">
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Upcoming Tour</h2>
                <div className="space-y-4">
                  {[
                    { date: 'OCT 24', city: 'Lagos, Nigeria', venue: 'Beachfront Arena' },
                    { date: 'NOV 12', city: 'London, UK', venue: 'O2 Forum Kentish Town' }
                  ].map((tour, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded border border-white/10">
                      <div>
                        <span className="text-xs font-bold text-yellow-500 block">{tour.date}</span>
                        <span className="text-base font-bold">{tour.city}</span>
                        <span className="text-xs text-gray-400 block">{tour.venue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'MUSIC' && (
              <div className="pt-4">
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Discography</h2>
                <div className="p-4 bg-white/5 rounded border border-white/10 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-base">Suga & Spice</p>
                    <p className="text-xs text-gray-400">Single • Mayé X Bonny</p>
                  </div>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-4 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 shadow-lg">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'GALLERY' && (
              <div className="pt-4">
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Gallery</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop'
                  ].map((imgUrl, i) => (
                    <img key={i} src={imgUrl} className="w-full h-32 object-cover rounded border border-white/10" alt="Gallery preview" />
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'JOIN' && (
              <div className="text-center pt-4">
                <Mail className="mx-auto text-yellow-500 mb-4" size={40} />
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-2">Join The Inner Circle</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); setActiveModal(null); }} className="flex flex-col gap-3 mt-4">
                  <input type="email" placeholder="Enter your email address" required className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-yellow-500" />
                  <button type="submit" className="py-3 bg-yellow-500 text-black font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors rounded">Subscribe</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Product Sidebar */}
      <div 
        className={`absolute top-0 right-0 h-full w-full bg-black/95 backdrop-blur-xl border-l border-white/10 p-6 z-[60] transform transition-transform duration-500 ease-out flex flex-col ${
          activeProduct ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {activeProduct && (
          <>
            <button 
              onClick={() => setActiveProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none z-10"
            >
              <X size={20} />
            </button>
            
            <div className="flex-1 mt-12 overflow-y-auto no-scrollbar">
              <div className="w-full aspect-square bg-gray-900 rounded-lg mb-6 overflow-hidden relative">
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-2 pr-8">{activeProduct.name}</h2>
              <p className="text-yellow-500 text-xl font-medium mb-6">${activeProduct.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
              <p className="text-sm text-gray-300 leading-relaxed mb-8">{activeProduct.desc}</p>
            </div>

            <button 
              onClick={() => handleAddToCart(activeProduct)}
              className="w-full mt-4 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors rounded focus:outline-none shadow-lg"
            >
              Add to Cart
            </button>
          </>
        )}
      </div>

      {/* Cart Sidebar */}
      <div 
        className={`absolute top-0 right-0 h-full w-full bg-black/95 backdrop-blur-xl border-l border-white/10 p-6 z-[70] transform transition-transform duration-500 ease-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-serif font-bold tracking-widest uppercase">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="text-sm uppercase tracking-widest">Cart is empty</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="w-16 h-16 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold truncate pr-4">{item.name}</h3>
                  <p className="text-yellow-500 text-sm mt-1">${item.price}</p>
                </div>
                <button 
                  onClick={() => setCart(cart.filter((_, i) => i !== index))}
                  className="text-gray-500 hover:text-red-400 p-2 h-fit"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm uppercase tracking-widest text-gray-400">Total</span>
              <span className="text-xl font-bold">${cartTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
            <button className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors rounded">
              Checkout
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
