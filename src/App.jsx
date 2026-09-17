import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, X, Loader2, Mail, Music, Radio } from 'lucide-react';

const SCENES = {
  hotel: {
    id: 'hotel',
    name: 'THE HOTEL',
    background: 'https://uploads.onecompiler.io/44jjpumhc/1789609923816/1%20the%20hotel.svg',
    hitboxes: [
      { id: 'plaid_suit', type: 'product', target: 'p1', x: '20%', y: '50%', w: '15%', h: '30%', className: 'hidden md:block' },
      { id: 'briefcase', type: 'product', target: 'p4', x: '50%', y: '70%', w: '15%', h: '15%', className: 'hidden md:block' },
      // Green Circle: B&C ROOM Sign (Now with optimized MP4 transitionVideo attached)
      { 
        id: 'room_sign', 
        type: 'scene', 
        target: 'room', 
        x: '70%', 
        y: '27%', 
        w: '25%', 
        h: '8%', 
        className: 'block md:hidden',
        transitionVideo: 'https://res.cloudinary.com/dccxjo9x8/video/upload/f_auto,q_auto/v1789630779/1st_transition_m2cwtv.mp4'
      },
      // Green Circle: Lumusic HQ Badge
      { id: 'lumusic_hq', type: 'modal', target: 'BIO', x: '63%', y: '73%', w: '28%', h: '12%', className: 'block md:hidden' },
      // Green Circle: THE HOTEL text indicator
      { id: 'hotel_text', type: 'scene', target: 'hotel', x: '35%', y: '8%', w: '30%', h: '6%', className: 'block md:hidden' }
    ],
    products: [
      { id: 'p1', name: 'Mayé Red Plaid Suit', price: 850, desc: 'Exclusive tailored red plaid suit.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' },
      { id: 'p4', name: 'Lumusic Briefcase', price: 300, desc: 'Official Lumusic HQ briefcase.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' }
    ]
  },
  room: {
    id: 'room',
    name: 'BONNY & CLYDE ROOM',
    background: 'https://uploads.onecompiler.io/44jjpumhc/1789609916900/2%20the%20new%20pharoah%20black%20cat.svg',
    hitboxes: [
      { id: 'vinyl', type: 'product', target: 'p_vinyl', x: '40%', y: '60%', w: '15%', h: '15%', className: 'hidden md:block' },
      // Green Circle: The Black Cat
      { id: 'cat', type: 'product', target: 'p2', x: '18%', y: '60%', w: '18%', h: '18%', className: 'block md:hidden' },
      // Green Circle: Prop Gun
      { id: 'gun', type: 'product', target: 'p3', x: '70%', y: '80%', w: '20%', h: '12%', className: 'block md:hidden' },
      // Green Circle: THE ESCAPE text bubble
      { id: 'escape_text', type: 'scene', target: 'escape', x: '35%', y: '85%', w: '30%', h: '8%', className: 'block md:hidden' }
    ],
    products: [
      { id: 'p2', name: 'The New Pharaoh Cat', price: 450, desc: 'Bastet inspired black cat statue from the B&C Room.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' },
      { id: 'p3', name: 'Prop Gun Replica', price: 150, desc: 'Used in the Escape shoot polaroids.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' },
      { id: 'p_vinyl', name: 'Suga & Spice Vinyl', price: 45, desc: 'Limited edition vinyl record.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' }
    ]
  },
  escape: {
    id: 'escape',
    name: 'THE ESCAPE',
    background: 'https://uploads.onecompiler.io/44jjpumhc/1789609903497/3%20the%20escape%20.svg',
    hitboxes: [
      // Green Circle: Back to Hotel Seal
      { id: 'seal', type: 'scene', target: 'hotel', x: '60%', y: '55%', w: '30%', h: '18%', className: 'block md:hidden' },
      { id: 'music', type: 'modal', target: 'MUSIC', x: '32%', y: '4%', w: '16%', h: '5%', className: 'hidden md:block' },
      { id: 'join', type: 'modal', target: 'JOIN', x: '88%', y: '4%', w: '12%', h: '5%', className: 'hidden md:block' },
      { id: 'hotel_link', type: 'scene', target: 'hotel', x: '73%', y: '62%', w: '28%', h: '16%', className: 'hidden md:block' },
      { id: 'tour', type: 'modal', target: 'TOUR', x: '18%', y: '96%', w: '20%', h: '6%', className: 'hidden md:block' },
      { id: 'escape_nav', type: 'scene', target: 'escape', x: '50%', y: '96%', w: '25%', h: '6%', className: 'hidden md:block' },
      { id: 'merch', type: 'cart', target: 'cart', x: '82%', y: '96%', w: '20%', h: '6%', className: 'hidden md:block' }
    ],
    products: []
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
  const [activeTransition, setActiveTransition] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const audioRef = useRef(null);
  const scene = SCENES[currentSceneKey];

  // AUDIO LOGIC
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

  // PRELOADER
  useEffect(() => {
    Object.values(SCENES).forEach((s) => {
      const img = new Image();
      img.src = s.background;
    });

    const videoUrls = [
      'https://res.cloudinary.com/dccxjo9x8/video/upload/f_auto,q_auto/v1789630779/1st_transition_m2cwtv.mp4'
    ];
    videoUrls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  // SPINNER LOGIC
  useEffect(() => {
    if (isInitialLoad) {
      setIsLoading(true);
      setIsLoaded(false);
    }

    const img = new Image();
    img.src = scene.background;
    
    const handleLoadComplete = () => {
      setIsLoading(false);
      setIsInitialLoad(false); 
      setTimeout(() => setIsLoaded(true), 50); 
    };
    
    img.onload = handleLoadComplete;
    img.onerror = handleLoadComplete;
    if (img.complete) handleLoadComplete();
  }, [currentSceneKey, scene, isInitialLoad]);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    setActiveProduct(null);
    setIsCartOpen(true);
  };

  const handleHitboxClick = (box) => {
    if (box.type === 'scene') {
      setActiveProduct(null);
      if (box.transitionVideo) {
        setActiveTransition({ videoUrl: box.transitionVideo, targetScene: box.target });
      } else {
        setCurrentSceneKey(box.target);
      }
    } else if (box.type === 'modal') {
      setActiveModal(box.target);
    } else if (box.type === 'cart') {
      setIsCartOpen(true);
    } else if (box.type === 'product') {
      const prod = scene.products.find(p => p.id === box.target);
      if (prod) setActiveProduct(prod);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black text-white font-sans selection:bg-yellow-500 selection:text-black flex justify-center">
      
      <style>{`
        #root, #__next, :root { max-width: none !important; width: 100% !important; height: 100% !important; margin: 0 !important; padding: 0 !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* FULLSCREEN VIDEO TRANSITION OVERLAY */}
      {activeTransition && (
        <div className="absolute inset-0 z-[100] bg-black">
          <video
            src={activeTransition.videoUrl}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            onEnded={() => {
              setCurrentSceneKey(activeTransition.targetScene);
              setActiveTransition(null);
            }}
          />
        </div>
      )}

      <div className="relative w-full max-w-[1400px] h-full flex flex-col shadow-2xl">
        
        {/* DESKTOP TOP HEADER NAV */}
        <header className="hidden md:flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/10 z-50">
          <div className="flex gap-6 text-sm tracking-widest uppercase font-serif">
            <button onClick={() => setActiveModal('BOOKING')} className="hover:text-yellow-500 transition-colors">Booking</button>
            <button onClick={() => setActiveModal('BIO')} className="hover:text-yellow-500 transition-colors">Bio</button>
            <button onClick={() => setActiveModal('TOUR')} className="hover:text-yellow-500 transition-colors">Tour</button>
            <button onClick={() => setIsCartOpen(true)} className="hover:text-yellow-500 transition-colors">Merch</button>
            <button onClick={() => setActiveModal('MUSIC')} className="hover:text-yellow-500 transition-colors">Music</button>
            <button onClick={() => setActiveModal('GALLERY')} className="hover:text-yellow-500 transition-colors">Gallery</button>
            <button onClick={() => setActiveModal('JOIN')} className="hover:text-yellow-500 transition-colors">Join</button>
          </div>
          <h1 className="text-xl font-serif tracking-widest font-bold">MAYÉ</h1>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-yellow-500 cursor-pointer"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-yellow-500 cursor-pointer"><path d="M2.5 7.1C2.6 5 4.3 3.3 6.4 3.1 9.8 2.8 14.2 2.8 17.6 3.1 19.7 3.3 21.4 5 21.5 7.1 21.7 9.8 21.7 14.2 21.5 16.9 21.4 19 19.7 20.7 17.6 20.9 14.2 21.2 9.8 21.2 6.4 20.9 4.3 20.7 2.6 19 2.5 16.9 2.3 14.2 2.3 9.8 2.5 7.1Z"/><path d="m10 15 5-3-5-3v6Z"/></svg>
              <Music size={18} className="hover:text-yellow-500 cursor-pointer" />
              <Radio size={18} className="hover:text-yellow-500 cursor-pointer" />
            </div>
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 text-sm tracking-widest uppercase hover:text-yellow-500 transition-colors">
              <ShoppingBag size={16} /> Cart ({cart.length})
            </button>
          </div>
        </header>

        {/* GREEN CIRCLE FONTS: MOBILE TOP NAV INVISIBLE OVERLAY */}
        <div className="absolute top-0 left-0 w-full h-[10%] z-40 flex justify-between px-4 md:hidden">
          <button onClick={() => setActiveModal('BIO')} className="w-1/4 h-full focus:outline-none" aria-label="Bio" />
          <button onClick={() => setActiveModal('MUSIC')} className="w-1/4 h-full focus:outline-none" aria-label="Music" />
          <button onClick={() => setActiveModal('GALLERY')} className="w-1/4 h-full focus:outline-none" aria-label="Gallery" />
          <button onClick={() => setActiveModal('JOIN')} className="w-1/4 h-full focus:outline-none" aria-label="Join" />
        </div>

        {/* GREEN CIRCLE FONTS: MOBILE BOTTOM NAV INVISIBLE OVERLAY */}
        <div className="absolute bottom-0 left-0 w-full h-[10%] z-40 flex justify-between px-4 md:hidden">
          <button onClick={() => setActiveModal('TOUR')} className="w-1/3 h-full focus:outline-none" aria-label="Tour" />
          <button onClick={() => setCurrentSceneKey('escape')} className="w-1/3 h-full focus:outline-none" aria-label="Escape" />
          <button onClick={() => setIsCartOpen(true)} className="w-1/3 h-full focus:outline-none" aria-label="Merch" />
        </div>

        <div className="relative flex-1 w-full h-full overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
              <Loader2 className="animate-spin text-yellow-500" size={48} />
            </div>
          )}

          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${scene.background}')`,
              backgroundSize: '100% 100%', 
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* HITBOXES WITH NEON GLOW LOGIC */}
          {isLoaded && scene.hitboxes.map((box) => (
            <button
              key={box.id}
              onClick={() => handleHitboxClick(box)}
              aria-label={box.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group focus:outline-none ${box.className || ''}`}
              style={{ 
                left: box.x, 
                top: box.y, 
                width: box.w, 
                height: box.h,
                background: 'transparent',
                border: 'none',
              }}
            >
              <span className={`w-full h-full block transition-all duration-300 ${
  box.type === 'scene' 
    ? 'drop-shadow-[0_0_12px_rgba(234,179,8,0.8)] animate-pulse hover:drop-shadow-[0_0_20px_rgba(234,179,8,1)]' 
    : 'group-hover:bg-white/10 group-active:bg-white/20 rounded'
              }`} />
            </button>
          ))}
        </div>

        {/* SCENE SELECTOR FOOTER FOR DESKTOP */}
        <footer className="hidden md:flex justify-center gap-8 py-4 bg-black/80 backdrop-blur-md border-t border-white/10 z-50 text-xs tracking-widest uppercase">
          {Object.values(SCENES).map((s) => (
            <button 
              key={s.id}
              onClick={() => { setActiveProduct(null); setCurrentSceneKey(s.id); }}
              className={`pb-1 transition-colors ${currentSceneKey === s.id ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}
            >
              {s.name}
            </button>
          ))}
        </footer>

        {activeModal && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-[70] flex items-center justify-center p-6">
            <div className="relative w-full max-w-sm bg-[#111] border border-white/20 rounded-2xl p-8 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
              <button 
                onClick={() => setActiveModal(null)} 
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>

              {activeModal === 'BIO' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-serif font-bold tracking-widest uppercase mb-4 text-yellow-500">Biography</h2>
                  <p className="text-sm leading-relaxed text-gray-300">
                    MAYÉ is an independent visionary artist blending sultry R&B textures, cinematic storytelling, and genre-defying production.
                  </p>
                </div>
              )}

              {activeModal === 'MUSIC' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-serif font-bold tracking-widest uppercase mb-4 text-yellow-500">Music</h2>
                  <div className="p-3 bg-white/5 rounded border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm">Suga & Spice</p>
                      <p className="text-[10px] text-gray-400">Single • Mayé X Bonny</p>
                    </div>
                    <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400">
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'TOUR' && (
                <div>
                  <h2 className="text-xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Upcoming Tours</h2>
                  <div className="space-y-4">
                    {[
                      { date: 'OCT 24', city: 'Lagos, Nigeria', venue: 'Beachfront Arena' },
                      { date: 'NOV 12', city: 'London, UK', venue: 'O2 Forum Kentish Town' }
                    ].map((tour, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/10">
                        <div>
                          <span className="text-xs font-bold text-yellow-500 block">{tour.date}</span>
                          <span className="text-sm font-bold">{tour.city}</span>
                        </div>
                        <button className="px-3 py-1.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition-colors rounded">RSVP</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModal === 'GALLERY' && (
                <div>
                  <h2 className="text-xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Gallery</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop'
                    ].map((imgUrl, i) => (
                      <img key={i} src={imgUrl} className="w-full h-24 object-cover rounded border border-white/10" alt="Gallery" />
                    ))}
                  </div>
                </div>
              )}

              {activeModal === 'JOIN' && (
                <div className="text-center">
                  <Mail className="mx-auto text-yellow-500 mb-4" size={32} />
                  <h2 className="text-xl font-serif font-bold tracking-widest uppercase mb-2">The Inner Circle</h2>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); setActiveModal(null); }} className="flex flex-col gap-3 mt-4">
                    <input type="email" placeholder="Enter your email" required className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-yellow-500" />
                    <button type="submit" className="py-3 bg-yellow-500 text-black font-bold text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors rounded">Subscribe</button>
                  </form>
                </div>
              )}

              {activeModal === 'BOOKING' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-serif font-bold tracking-widest uppercase mb-4 text-yellow-500">Booking Inquiries</h2>
                  <p className="text-sm leading-relaxed text-gray-300">
                    For bookings, sync licensing, and press inquiries, contact management directly.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div 
          className={`absolute bottom-0 left-0 w-full h-[75%] bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 z-[60] transform transition-transform duration-500 ease-out flex flex-col rounded-t-3xl ${
            activeProduct ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {activeProduct && (
            <>
              <button 
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none z-10"
              >
                <X size={20} />
              </button>
              
              <div className="flex-1 mt-6 overflow-y-auto no-scrollbar">
                <div className="w-full aspect-video bg-gray-900 rounded-xl mb-6 overflow-hidden relative border border-white/10">
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name} 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <h2 className="text-xl font-serif font-bold mb-2 pr-8">{activeProduct.name}</h2>
                <p className="text-yellow-500 text-lg font-medium mb-4">${activeProduct.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                <p className="text-sm text-gray-300 leading-relaxed mb-8">{activeProduct.desc}</p>
              </div>

              <button 
                onClick={() => handleAddToCart(activeProduct)}
                className="w-full mt-4 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors rounded-lg focus:outline-none"
              >
                Add to Cart
              </button>
            </>
          )}
        </div>

        <div 
          className={`absolute bottom-0 left-0 w-full h-[85%] bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 z-[60] transform transition-transform duration-500 ease-out flex flex-col rounded-t-3xl ${
            isCartOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-bold tracking-widest uppercase">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p className="text-sm uppercase tracking-widest">Cart is empty</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-16 h-16 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 pt-1">
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
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm uppercase tracking-widest text-gray-400">Total</span>
                <span className="text-xl font-bold">${cartTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
              </div>
              <button className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors rounded-lg">
                Checkout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
