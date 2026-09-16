import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, X, Loader2, Mail } from 'lucide-react';

const SCENES = {
  hotel: {
    id: 'hotel',
    background: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580313/1_the_hotel_h3udh8.png',
    hitboxes: [
      { id: 'bio', type: 'modal', target: 'BIO', x: '11%', y: '4%', w: '12%', h: '5%' },
      { id: 'gallery', type: 'modal', target: 'GALLERY', x: '58%', y: '4%', w: '18%', h: '5%' },
      { id: 'join', type: 'modal', target: 'JOIN', x: '84%', y: '4%', w: '12%', h: '5%' },
      { id: 'title', type: 'none', x: '50%', y: '13%', w: '30%', h: '5%' },
      { id: 'room_link', type: 'scene', target: 'room', x: '82%', y: '34%', w: '25%', h: '6%' },
      { id: 'hq_badge', type: 'product', target: 'p1', x: '82%', y: '78%', w: '25%', h: '12%' }
    ],
    products: [
      { id: 'p1', name: 'Lumusic HQ Badge', price: 25, desc: 'Official Lumusic HQ Access Badge. Collector item.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' }
    ]
  },
  room: {
    id: 'room',
    background: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580317/2_the_new_pharoah_black_cat_vmfw9q.png',
    hitboxes: [
      { id: 'bio', type: 'modal', target: 'BIO', x: '11%', y: '4%', w: '12%', h: '5%' },
      { id: 'join', type: 'modal', target: 'JOIN', x: '84%', y: '4%', w: '12%', h: '5%' },
      { id: 'cat', type: 'product', target: 'p2', x: '30%', y: '61%', w: '18%', h: '12%' },
      { id: 'gun', type: 'product', target: 'p3', x: '80%', y: '75%', w: '18%', h: '8%' },
      { id: 'escape_link', type: 'scene', target: 'escape', x: '50%', y: '84%', w: '32%', h: '6%' }
    ],
    products: [
      { id: 'p2', name: 'The New Pharaoh Cat', price: 450, desc: 'Bastet inspired black cat statue from the B&C Room.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' },
      { id: 'p3', name: 'Prop Gun Replica', price: 150, desc: 'Used in the Escape shoot polaroids.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' }
    ]
  },
  escape: {
    id: 'escape',
    background: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580311/3_the_escape_mc2sqm.png',
    hitboxes: [
      { id: 'music', type: 'modal', target: 'MUSIC', x: '32%', y: '4%', w: '16%', h: '5%' },
      { id: 'join', type: 'modal', target: 'JOIN', x: '88%', y: '4%', w: '12%', h: '5%' },
      { id: 'hotel_link', type: 'scene', target: 'hotel', x: '73%', y: '62%', w: '28%', h: '16%' },
      { id: 'tour', type: 'modal', target: 'TOUR', x: '18%', y: '96%', w: '20%', h: '6%' },
      { id: 'escape_nav', type: 'scene', target: 'escape', x: '50%', y: '96%', w: '25%', h: '6%' },
      { id: 'merch', type: 'cart', target: 'cart', x: '82%', y: '96%', w: '20%', h: '6%' }
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
    img.src = scene.background;
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

  const handleHitboxClick = (box) => {
    if (box.type === 'scene') {
      setActiveProduct(null);
      setCurrentSceneKey(box.target);
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

      <div className="relative w-full max-w-[500px] h-full shadow-2xl">
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
            <Loader2 className="animate-spin text-yellow-500" size={48} />
          </div>
        )}

        <div 
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${scene.background})`,
            backgroundSize: '100% 100%', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {isLoaded && scene.hitboxes.map((box) => (
          <button
            key={box.id}
            onClick={() => handleHitboxClick(box)}
            aria-label={box.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group focus:outline-none"
            style={{ 
              left: box.x, 
              top: box.y, 
              width: box.w, 
              height: box.h,
              background: 'transparent',
              border: 'none',
            }}
          >
            <span className="w-full h-full block rounded group-hover:bg-white/10 group-active:bg-white/20 transition-all duration-150" />
          </button>
        ))}

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-1" />}
        </button>

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
