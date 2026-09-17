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
      { 
        id: 'room_sign', 
        type: 'scene', 
        target: 'room', 
        x: '75%', 
        y: '28%', 
        w: '28%', 
        h: '10%', 
        className: 'block md:hidden',
        transitionVideo: 'https://res.cloudinary.com/dccxjo9x8/video/upload/c_scale,w_800/f_auto,q_auto:eco/v1789630779/1st_transition_m2cwtv.mp4'
      },
      { id: 'lumusic_hq', type: 'modal', target: 'BIO', x: '75%', y: '77%', w: '28%', h: '10%', className: 'block md:hidden' },
      { id: 'hotel_text', type: 'scene', target: 'hotel', x: '50%', y: '8%', w: '35%', h: '6%', className: 'block md:hidden' }
    ],
    products: [
      { id: 'p1', name: 'Mayé Red Plaid Suit', price: 850, desc: 'Exclusive tailored red plaid suit.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' },
      { id: 'p4', name: 'Lumusic Briefcase', price: 300, desc: 'Official Lumusic HQ briefcase.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' }
    ]
  },
  room: {
    id: 'room',
    name: 'BONNY & CLYDE ROOM',
    background: 'https://uploads.onecompiler.io/44jjpumhc/178960916900/2%20the%20new%20pharoah%20black%20cat.svg',
    hitboxes: [
      { id: 'vinyl', type: 'product', target: 'p_vinyl', x: '40%', y: '60%', w: '15%', h: '15%', className: 'hidden md:block' },
      { id: 'cat', type: 'product', target: 'p2', x: '18%', y: '60%', w: '18%', h: '18%', className: 'block md:hidden' },
      { id: 'gun', type: 'product', target: 'p3', x: '70%', y: '80%', w: '20%', h: '12%', className: 'block md:hidden' },
      { id: 'escape_text', type: 'scene', target: 'escape', x: '50%', y: '85%', w: '30%', h: '10%', className: 'block md:hidden' }
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
      { id: 'seal', type: 'scene', target: 'hotel', x: '68%', y: '60%', w: '30%', h: '12%', className: 'block md:hidden' },
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
  const [sceneLoading, setSceneLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [activeTransition, setActiveTransition] = useState(null);

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
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Preload background images
  useEffect(() => {
    Object.values(SCENES).forEach((s) => {
      const img = new Image();
      img.src = s.background;
    });
  }, []);

  // Handle Scene Image Loading
  useEffect(() => {
    setSceneLoading(true);
    const img = new Image();
    img.src = scene.background;
    img.onload = () => setSceneLoading(false);
    img.onerror = () => setSceneLoading(false);
    if (img.complete) setSceneLoading(false);
  }, [currentSceneKey]);

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
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black text-white font-sans flex justify-center">
      
      <style>{`
        /* Radar Beacon Dark-to-White Pulse */
        @keyframes beaconPulse {
          0%, 100% {
            background-color: #000000;
            border-color: rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 0px rgba(255, 255, 255, 0);
            transform: scale(0.9);
          }
          50% {
            background-color: #ffffff;
            border-color: #ffffff;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
            transform: scale(1.1);
          }
        }
        @keyframes rippleRing {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .animate-beacon {
          animation: beaconPulse 1.4s ease-in-out infinite;
        }
        .animate-ripple {
          animation: rippleRing 1.4s ease-out infinite;
        }
      `}</style>

      {/* FULLSCREEN VIDEO TRANSITION OVERLAY */}
      {activeTransition && (
        <div className="absolute inset-0 z-[100] bg-black">
          <video
            src={activeTransition.videoUrl}
            autoPlay
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover"
            onEnded={() => {
              setCurrentSceneKey(activeTransition.targetScene);
              setActiveTransition(null);
            }}
          />
        </div>
      )}

      <div className="relative w-full max-w-[1400px] h-full flex flex-col shadow-2xl bg-black">
        
        {/* DESKTOP HEADER NAV */}
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
              <Music size={18} className="hover:text-yellow-500 cursor-pointer" />
              <Radio size={18} className="hover:text-yellow-500 cursor-pointer" />
            </div>
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 text-sm tracking-widest uppercase hover:text-yellow-500 transition-colors">
              <ShoppingBag size={16} /> Cart ({cart.length})
            </button>
          </div>
        </header>

        {/* MOBILE TOP INVISIBLE TOUCH OVERLAY */}
        <div className="absolute top-0 left-0 w-full h-[8%] z-40 flex justify-between px-2 md:hidden">
          <button onClick={() => setActiveModal('BIO')} className="w-1/4 h-full focus:outline-none" />
          <button onClick={() => setActiveModal('MUSIC')} className="w-1/4 h-full focus:outline-none" />
          <button onClick={() => setActiveModal('GALLERY')} className="w-1/4 h-full focus:outline-none" />
          <button onClick={() => setActiveModal('JOIN')} className="w-1/4 h-full focus:outline-none" />
        </div>

        {/* MOBILE BOTTOM INVISIBLE TOUCH OVERLAY */}
        <div className="absolute bottom-0 left-0 w-full h-[8%] z-40 flex justify-between px-2 md:hidden">
          <button onClick={() => setActiveModal('TOUR')} className="w-1/3 h-full focus:outline-none" />
          <button onClick={() => setCurrentSceneKey('escape')} className="w-1/3 h-full focus:outline-none" />
          <button onClick={() => setIsCartOpen(true)} className="w-1/3 h-full focus:outline-none" />
        </div>

        {/* MAIN SCENE CANVAS */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-black flex items-center justify-center">
          
          {sceneLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
              <Loader2 className="animate-spin text-yellow-500" size={36} />
            </div>
          )}

          <img 
            src={scene.background} 
            alt={scene.name}
            className={`w-full h-full object-fill transition-opacity duration-300 ${sceneLoading ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* HOTSPOTS / BEACONS */}
          {!sceneLoading && scene.hitboxes.map((box) => (
            <button
              key={box.id}
              onClick={() => handleHitboxClick(box)}
              aria-label={box.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 focus:outline-none flex items-center justify-center group ${box.className || ''}`}
              style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
            >
              {box.type === 'scene' && (
                <div className="relative flex items-center justify-center w-6 h-6">
                  {/* Subtle outer ripple */}
                  <span className="absolute w-5 h-5 rounded-full border border-white/60 animate-ripple pointer-events-none" />
                  {/* Sleek inner dark-to-white dot */}
                  <span className="w-2.5 h-2.5 rounded-full border border-white/80 animate-beacon transition-transform group-hover:scale-125" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* DESKTOP FOOTER */}
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

        {/* MODAL DIALOGS */}
        {activeModal && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-6">
            <div className="relative w-full max-w-sm bg-[#111] border border-white/20 rounded-2xl p-6 shadow-2xl">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20">
                <X size={18} />
              </button>

              {activeModal === 'BIO' && (
                <div className="space-y-3">
                  <h2 className="text-lg font-serif font-bold uppercase text-yellow-500">Biography</h2>
                  <p className="text-xs leading-relaxed text-gray-300">
                    MAYÉ is an independent visionary artist blending sultry R&B textures, cinematic storytelling, and genre-defying production.
                  </p>
                </div>
              )}

              {activeModal === 'MUSIC' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-serif font-bold uppercase text-yellow-500">Music</h2>
                  <div className="p-3 bg-white/5 rounded border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-xs">Suga & Spice</p>
                      <p className="text-[10px] text-gray-400">Single • Mayé X Bonny</p>
                    </div>
                    <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-yellow-500 text-black rounded-full">
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'TOUR' && (
                <div className="space-y-3">
                  <h2 className="text-lg font-serif font-bold uppercase text-yellow-500">Upcoming Tours</h2>
                  <div className="space-y-2">
                    {[
                      { date: 'OCT 24', city: 'Lagos, Nigeria', venue: 'Beachfront Arena' },
                      { date: 'NOV 12', city: 'London, UK', venue: 'O2 Forum Kentish Town' }
                    ].map((tour, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 bg-white/5 rounded border border-white/10">
                        <div>
                          <span className="text-[10px] font-bold text-yellow-500 block">{tour.date}</span>
                          <span className="text-xs font-bold">{tour.city}</span>
                        </div>
                        <button className="px-2.5 py-1 bg-white text-black font-bold text-[9px] uppercase rounded">RSVP</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModal === 'GALLERY' && (
                <div>
                  <h2 className="text-lg font-serif font-bold uppercase mb-4 text-yellow-500">Gallery</h2>
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
                  <Mail className="mx-auto text-yellow-500 mb-2" size={28} />
                  <h2 className="text-lg font-serif font-bold uppercase mb-2">The Inner Circle</h2>
                  <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }} className="flex flex-col gap-2 mt-3">
                    <input type="email" placeholder="Enter your email" required className="bg-white/5 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-yellow-500" />
                    <button type="submit" className="py-2.5 bg-yellow-500 text-black font-bold text-xs uppercase rounded">Subscribe</button>
                  </form>
                </div>
              )}

              {activeModal === 'BOOKING' && (
                <div className="space-y-2">
                  <h2 className="text-lg font-serif font-bold uppercase text-yellow-500">Booking Inquiries</h2>
                  <p className="text-xs text-gray-300">Contact management directly for sync and live bookings.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCT DRAWER */}
        <div className={`absolute bottom-0 left-0 w-full h-[70%] bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 z-[60] transition-transform duration-300 ease-out flex flex-col rounded-t-3xl ${activeProduct ? 'translate-y-0' : 'translate-y-full'}`}>
          {activeProduct && (
            <>
              <button onClick={() => setActiveProduct(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10">
                <X size={18} />
              </button>
              <div className="flex-1 mt-4 overflow-y-auto">
                <img src={activeProduct.image} alt={activeProduct.name} className="w-full aspect-video object-cover rounded-xl mb-4 border border-white/10" />
                <h2 className="text-lg font-serif font-bold mb-1">{activeProduct.name}</h2>
                <p className="text-yellow-500 text-base font-medium mb-3">${activeProduct.price}</p>
                <p className="text-xs text-gray-300 leading-relaxed">{activeProduct.desc}</p>
              </div>
              <button onClick={() => handleAddToCart(activeProduct)} className="w-full mt-4 py-3 bg-white text-black font-bold text-xs uppercase rounded-lg">
                Add to Cart
              </button>
            </>
          )}
        </div>

        {/* CART DRAWER */}
        <div className={`absolute bottom-0 left-0 w-full h-[80%] bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 z-[60] transition-transform duration-300 ease-out flex flex-col rounded-t-3xl ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-serif font-bold uppercase">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full bg-white/10">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col gap-3">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-2">
                <ShoppingBag size={40} className="opacity-20" />
                <p className="text-xs uppercase tracking-widest">Cart is empty</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex gap-3 p-2.5 bg-white/5 rounded-xl border border-white/5 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <h3 className="text-xs font-bold">{item.name}</h3>
                    <p className="text-yellow-500 text-xs">${item.price}</p>
                  </div>
                  <button onClick={() => setCart(cart.filter((_, i) => i !== index))} className="text-gray-500 hover:text-red-400 p-1">
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase text-gray-400">Total</span>
                <span className="text-lg font-bold">${cartTotal}</span>
              </div>
              <button className="w-full py-3 bg-white text-black font-bold text-xs uppercase rounded-lg">Checkout</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
