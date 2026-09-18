import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Loader2, Mail, Music, Calendar, User, Image as ImageIcon } from 'lucide-react';

const SCENES = {
  hotel: {
    id: 'hotel',
    name: 'THE HOTEL',
    background: 'https://uploads.onecompiler.io/44jjpumhc/1789713926435/1.svg',
    hitboxes: [
      { id: 'bio_text', type: 'modal', target: 'BIO', x: '12.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'music_text', type: 'modal', target: 'MUSIC', x: '37.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'gallery_text', type: 'modal', target: 'GALLERY', x: '62.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'join_text', type: 'modal', target: 'JOIN', x: '87.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'booking_text', type: 'modal', target: 'BOOKING', x: '50%', y: '16%', w: '40%', h: '8%' },
      { id: 'plaid_suit', type: 'product', target: 'p1', x: '20%', y: '52%', w: '22%', h: '35%', anim: 'animate-pulse' },
      { id: 'briefcase', type: 'product', target: 'p4', x: '50%', y: '72%', w: '22%', h: '20%', anim: 'animate-pulse' },
      { 
        id: 'room_sign', 
        type: 'scene', 
        target: 'room', 
        x: '75%', 
        y: '28%', 
        w: '30%', 
        h: '18%', 
        showBeacon: true,
        anim: 'animate-slide-right',
        transitionVideo: 'https://res.cloudinary.com/dccxjo9x8/video/upload/c_scale,w_800/f_auto,q_auto:eco/v1789630779/1st_transition_m2cwtv.mp4'
      },
      { id: 'lumusic_hq', type: 'modal', target: 'BIO', x: '75%', y: '78%', w: '30%', h: '12%', anim: 'animate-bounce' }
    ],
    products: [
      { id: 'p1', name: 'Mayé Red Plaid Suit', price: 850, desc: 'Exclusive tailored red plaid suit.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' },
      { id: 'p4', name: 'Lumusic Briefcase', price: 300, desc: 'Official Lumusic HQ custom briefcase.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' }
    ]
  },
  room: {
    id: 'room',
    name: 'BONNY & CLYDE ROOM',
    background: 'https://uploads.onecompiler.io/44jjpumhc/1789714074503/2.svg',
    hitboxes: [
      { id: 'bio_text', type: 'modal', target: 'BIO', x: '12.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'music_text', type: 'modal', target: 'MUSIC', x: '37.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'gallery_text', type: 'modal', target: 'GALLERY', x: '62.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'join_text', type: 'modal', target: 'JOIN', x: '87.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'vinyl', type: 'product', target: 'p_vinyl', x: '40%', y: '60%', w: '18%', h: '18%', anim: 'animate-pulse' },
      { id: 'cat', type: 'product', target: 'p2', x: '18%', y: '60%', w: '20%', h: '20%', anim: 'animate-bounce' },
      { id: 'gun', type: 'product', target: 'p3', x: '70%', y: '80%', w: '22%', h: '15%', anim: 'animate-pulse' },
      { id: 'escape_text', type: 'scene', target: 'escape', x: '50%', y: '85%', w: '35%', h: '12%', showBeacon: true, anim: 'animate-slide-right' }
    ],
    products: [
      { id: 'p2', name: 'The New Pharaoh Cat', price: 450, desc: 'Bastet inspired black cat statue.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' },
      { id: 'p3', name: 'Prop Gun Replica', price: 150, desc: 'Used in the Escape shoot polaroids.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' },
      { id: 'p_vinyl', name: 'Suga & Spice Vinyl', price: 45, desc: 'Limited edition vinyl record.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' }
    ]
  },
  escape: {
    id: 'escape',
    name: 'THE ESCAPE',
    background: 'https://uploads.onecompiler.io/44jjpumhc/1789714055337/3.svg',
    hitboxes: [
      { id: 'bio_text', type: 'modal', target: 'BIO', x: '12.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'music_text', type: 'modal', target: 'MUSIC', x: '37.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'gallery_text', type: 'modal', target: 'GALLERY', x: '62.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'join_text', type: 'modal', target: 'JOIN', x: '87.5%', y: '5%', w: '22%', h: '9%' },
      { id: 'seal', type: 'scene', target: 'hotel', x: '68%', y: '60%', w: '32%', h: '15%', showBeacon: true, anim: 'animate-slide-left' },
      { id: 'hotel_link', type: 'scene', target: 'hotel', x: '73%', y: '62%', w: '30%', h: '18%', anim: 'animate-slide-left' },
      { id: 'tour_text', type: 'modal', target: 'TOUR', x: '25%', y: '93%', w: '45%', h: '10%' },
      { id: 'merch_text', type: 'cart', target: 'cart', x: '75%', y: '93%', w: '45%', h: '10%' }
    ],
    products: []
  }
};

export default function App() {
  const [currentSceneKey, setCurrentSceneKey] = useState('hotel');
  const [activeProduct, setActiveProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sceneLoading, setSceneLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [activeTransition, setActiveTransition] = useState(null);

  const scene = SCENES[currentSceneKey];

  useEffect(() => {
    let isMounted = true;
    setSceneLoading(true);

    const img = new Image();
    img.src = scene.background;

    const handleComplete = () => {
      if (isMounted) setSceneLoading(false);
    };

    img.onload = handleComplete;
    img.onerror = handleComplete;

    const fallbackTimer = setTimeout(handleComplete, 2500);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
    };
  }, [currentSceneKey]);

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
      const prod = scene.products.find((p) => p.id === box.target);
      if (prod) setActiveProduct(prod);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black text-white font-sans flex justify-center">
      
      {/* TRANSITION OVERLAY */}
      {activeTransition && (
        <div 
          className="absolute inset-0 z-[100] bg-black cursor-pointer"
          onClick={() => {
            setCurrentSceneKey(activeTransition.targetScene);
            setActiveTransition(null);
          }}
        >
          <video
            src={activeTransition.videoUrl}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            onEnded={() => {
              setCurrentSceneKey(activeTransition.targetScene);
              setActiveTransition(null);
            }}
            onError={() => {
              setCurrentSceneKey(activeTransition.targetScene);
              setActiveTransition(null);
            }}
          />
        </div>
      )}

      <div className="relative w-full max-w-[1400px] h-full flex flex-col shadow-2xl bg-black">

        {/* CANVAS */}
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

          {/* HITBOXES */}
          {!sceneLoading && scene.hitboxes.map((box) => (
            <button
              key={box.id}
              onClick={() => handleHitboxClick(box)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 focus:outline-none flex items-center justify-center transition-all duration-150 hover:bg-white/10 active:bg-white/20 rounded-lg ${box.anim || ''}`}
              style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
            >
              {box.showBeacon && (
                <div className="w-3 h-3 bg-white rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* FOOTER NAV WITH LEVITATING HOVER + YELLOW GLOW */}
        <footer className="flex justify-center gap-6 py-3 bg-black/90 border-t border-white/10 z-50 text-xs tracking-widest uppercase px-4">
          {Object.values(SCENES).map((s) => (
            <button 
              key={s.id}
              onClick={() => { setActiveProduct(null); setCurrentSceneKey(s.id); }}
              className={`
                relative font-bold uppercase tracking-widest text-xs transition-all duration-300 ease-out cursor-pointer
                hover:-translate-y-1 hover:text-yellow-500 hover:drop-shadow-[0_4px_12px_rgba(234,179,8,0.35)]
                active:translate-y-0 active:scale-95
                ${currentSceneKey === s.id ? 'text-yellow-500 border-b-2 border-yellow-500 pb-0.5' : 'text-gray-400'}
              `}
            >
              {s.name}
            </button>
          ))}
        </footer>

        {/* MODALS */}
        {activeModal && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-6">
            <div className="relative w-full max-w-sm bg-[#111] border border-white/20 rounded-2xl p-6 shadow-2xl text-white">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10">
                <X size={18} />
              </button>

              {activeModal === 'BIO' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-yellow-500"><User size={20} /><h2 className="text-lg font-bold">Biography</h2></div>
                  <p className="text-xs text-gray-300 leading-relaxed">MAYÉ is an independent visionary artist blending sultry R&B textures, cinematic storytelling, and genre-defying production.</p>
                </div>
              )}

              {activeModal === 'MUSIC' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-yellow-500"><Music size={20} /><h2 className="text-lg font-bold">Music</h2></div>
                  <p className="text-xs font-bold">Suga & Spice (Single)</p>
                </div>
              )}

              {activeModal === 'TOUR' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-yellow-500"><Calendar size={20} /><h2 className="text-lg font-bold">Tour Dates</h2></div>
                  <p className="text-xs text-gray-300">OCT 24 — Lagos, Nigeria</p>
                </div>
              )}

              {activeModal === 'GALLERY' && (
                <div>
                  <div className="flex items-center gap-2 text-yellow-500 mb-4"><ImageIcon size={20} /><h2 className="text-lg font-bold">Gallery</h2></div>
                  <div className="grid grid-cols-2 gap-2">
                    <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop" className="w-full h-24 object-cover rounded" alt="Gallery" />
                    <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop" className="w-full h-24 object-cover rounded" alt="Gallery" />
                  </div>
                </div>
              )}

              {activeModal === 'JOIN' && (
                <div className="text-center">
                  <Mail className="mx-auto text-yellow-500 mb-2" size={28} />
                  <h2 className="text-lg font-bold mb-2">Join Inner Circle</h2>
                  <input type="email" placeholder="Enter email" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-xs w-full text-white mb-2" />
                  <button onClick={() => setActiveModal(null)} className="w-full py-2 bg-yellow-500 text-black font-bold text-xs rounded">Subscribe</button>
                </div>
              )}

              {activeModal === 'BOOKING' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-yellow-500"><Calendar size={20} /><h2 className="text-lg font-bold">Booking</h2></div>
                  <p className="text-xs text-gray-300">Contact management for sync, press, and live performances.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CART DRAWER */}
        <div className={`absolute bottom-0 left-0 w-full h-[70%] bg-black/95 border-t border-white/10 p-6 z-[60] transition-transform duration-300 flex flex-col rounded-t-3xl ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold uppercase">Cart / Merch</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full bg-white/10"><X size={18} /></button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <ShoppingBag size={36} className="mb-2 opacity-30" />
            <p className="text-xs uppercase">Your cart is empty</p>
          </div>
        </div>

        {/* PRODUCT DRAWER */}
        <div className={`absolute bottom-0 left-0 w-full h-[70%] bg-black/95 border-t border-white/10 p-6 z-[60] transition-transform duration-300 flex flex-col rounded-t-3xl ${activeProduct ? 'translate-y-0' : 'translate-y-full'}`}>
          {activeProduct && (
            <>
              <button onClick={() => setActiveProduct(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10"><X size={18} /></button>
              <img src={activeProduct.image} alt={activeProduct.name} className="w-full aspect-video object-cover rounded-xl mb-4 border border-white/10" />
              <h2 className="text-lg font-bold">{activeProduct.name}</h2>
              <p className="text-yellow-500 font-bold mb-2">${activeProduct.price}</p>
              <p className="text-xs text-gray-300 flex-1">{activeProduct.desc}</p>
              <button onClick={() => { setCart([...cart, activeProduct]); setActiveProduct(null); setIsCartOpen(true); }} className="w-full py-3 bg-white text-black font-bold text-xs uppercase rounded-lg">Add to Cart</button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
