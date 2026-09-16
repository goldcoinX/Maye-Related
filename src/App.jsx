import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, X, ChevronRight, Loader2, Music, Headphones, Smartphone, Menu, Mail } from 'lucide-react';

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
    name: '1. Hotel (Home)',
    backgroundDesktop: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1781626534/home_ready_hotel_azeki6.png',
    backgroundMobile: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580313/1_the_hotel_h3udh8.png',
    hitboxes: [
      { id: 'h-room', type: 'invisible', action: 'scene', target: 'room', label: 'B&C Room', x: '50%', y: '60%', mobileX: '82%', mobileY: '33%', width: '120px', height: '60px' },
      { id: 'h-bio', type: 'invisible', action: 'modal', target: 'BIO', label: 'BIO', x: '20%', y: '30%', mobileX: '20%', mobileY: '30%', width: '80px', height: '40px' },
      { id: 'h-gallery', type: 'invisible', action: 'modal', target: 'GALLERY', label: 'GALLERY', x: '30%', y: '30%', mobileX: '30%', mobileY: '30%', width: '80px', height: '40px' },
      { id: 'h-join', type: 'invisible', action: 'modal', target: 'JOIN', label: 'JOIN', x: '40%', y: '30%', mobileX: '40%', mobileY: '30%', width: '80px', height: '40px' },
      { id: 'h-p1', type: 'product', action: 'product', target: { name: 'The Getaway Guitar', price: 450, desc: 'Strum your way out. Classic acoustic guitar used in the sessions.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop' }, x: '75%', y: '65%', mobileX: '75%', mobileY: '65%' },
      { id: 'h-p2', type: 'product', action: 'product', target: { name: 'Lumusic HQ ID Badge', price: 25, desc: 'Official Lumusic Staff Badge.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' }, x: '25%', y: '75%', mobileX: '25%', mobileY: '75%' }
    ]
  },
  room: {
    id: 'room',
    name: '2. B & C Room',
    backgroundDesktop: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2560&auto=format&fit=crop',
    backgroundMobile: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580317/2_the_new_pharoah_black_cat_vmfw9q.png',
    hitboxes: [
      { id: 'r-escape', type: 'invisible', action: 'scene', target: 'escape', label: 'The Escape', x: '50%', y: '65%', mobileX: '50%', mobileY: '61%', width: '120px', height: '80px' },
      { id: 'r-bio', type: 'invisible', action: 'modal', target: 'BIO', label: 'BIO', x: '15%', y: '25%', mobileX: '15%', mobileY: '25%', width: '80px', height: '40px' },
      { id: 'r-join', type: 'invisible', action: 'modal', target: 'JOIN', label: 'JOIN', x: '85%', y: '25%', mobileX: '85%', mobileY: '25%', width: '80px', height: '40px' },
      { id: 'r-cat', type: 'invisible', action: 'product', target: { name: 'The Black Cat', price: 999, desc: 'The New Pharoah.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' }, x: '60%', y: '80%', mobileX: '60%', mobileY: '80%', width: '60px', height: '60px' },
      { id: 'r-gun', type: 'invisible', action: 'product', target: { name: 'Gun Polaroid', price: 150, desc: 'Evidence.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop' }, x: '35%', y: '45%', mobileX: '35%', mobileY: '45%', width: '50px', height: '50px' }
    ]
  },
  escape: {
    id: 'escape',
    name: '3. The Escape',
    backgroundDesktop: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=2560&auto=format&fit=crop',
    backgroundMobile: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580311/3_the_escape_mc2sqm.png',
    hitboxes: [
      { id: 'e-hotel', type: 'invisible', action: 'scene', target: 'hotel', label: 'Back to Hotel', x: '50%', y: '70%', mobileX: '78%', mobileY: '65%', width: '120px', height: '60px' },
      { id: 'e-music', type: 'invisible', action: 'modal', target: 'MUSIC', label: 'MUSIC', x: '20%', y: '80%', mobileX: '20%', mobileY: '80%', width: '80px', height: '40px' },
      { id: 'e-tour', type: 'invisible', action: 'modal', target: 'TOUR', label: 'TOUR', x: '40%', y: '80%', mobileX: '40%', mobileY: '80%', width: '80px', height: '40px' },
      { id: 'e-join', type: 'invisible', action: 'modal', target: 'JOIN', label: 'JOIN', x: '60%', y: '80%', mobileX: '60%', mobileY: '80%', width: '80px', height: '40px' },
      { id: 'e-merch', type: 'invisible', action: 'cart', target: null, label: 'MERCH', x: '80%', y: '80%', mobileX: '80%', mobileY: '80%', width: '80px', height: '40px' },
      { id: 'e-vinyl', type: 'product', action: 'product', target: { name: 'Suga & Spice Vinyl', price: 35, desc: 'Limited edition yellow translucent vinyl.', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop' }, x: '50%', y: '50%', mobileX: '50%', mobileY: '50%' }
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const audioRef = useRef(null);
  const scene = SCENES[currentSceneKey];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    const activeBg = isMobile ? scene.backgroundMobile : scene.backgroundDesktop;
    const img = new Image();
    img.src = activeBg;
    const handleLoadComplete = () => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 50); 
    };
    img.onload = handleLoadComplete;
    img.onerror = handleLoadComplete;
    if (img.complete) handleLoadComplete();
  }, [currentSceneKey, scene, isMobile]);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    setActiveProduct(null);
    setIsCartOpen(true);
  };

  const handleNavClick = (linkName) => {
    setMobileMenuOpen(false);
    if (linkName === 'MERCH') {
      setIsCartOpen(true);
    } else {
      setActiveModal(linkName);
    }
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
        console.warn('Unknown hitbox action');
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const navLinks = ['BOOKING', 'BIO', 'TOUR', 'MERCH', 'MUSIC', 'GALLERY', 'JOIN'];

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      
      <style>{`
        #root, #__next, :root { max-width: none !important; width: 100% !important; height: 100% !important; margin: 0 !important; padding: 0 !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      )}

      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        style={{
          backgroundImage: `url(${isMobile ? scene.backgroundMobile : scene.backgroundDesktop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      <nav className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:text-yellow-400"
        >
          <Menu size={22} />
        </button>

        <div className="hidden lg:flex gap-6 items-center text-xs font-semibold tracking-widest uppercase">
          {navLinks.map((item) => (
            <button key={item} onClick={() => handleNavClick(item)} className="hover:text-yellow-400 transition-colors drop-shadow">{item}</button>
          ))}
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-serif tracking-widest font-bold whitespace-nowrap drop-shadow-lg select-none">
          MAYÉ
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-3 md:gap-4 text-white/80">
            <a href="#" className="hover:text-yellow-400 transition-colors"><InstagramIcon size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><YoutubeIcon size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><Smartphone size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><Headphones size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><Music size={18} /></a>
          </div>

          <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 hover:text-yellow-400 transition-colors text-xs md:text-sm font-medium tracking-widest uppercase bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
            <ShoppingBag size={16} />
            <span>Cart ({cart.length})</span>
          </button>
        </div>
      </nav>

      <div className="lg:hidden absolute top-16 left-0 w-full overflow-x-auto no-scrollbar px-4 py-2 z-30 flex gap-3 bg-black/40 backdrop-blur-sm border-b border-white/10">
        {navLinks.map((item) => (
          <button
            key={item}
            onClick={() => handleNavClick(item)}
            className="text-[10px] font-bold tracking-widest uppercase bg-black/60 border border-white/20 px-3 py-1.5 rounded-full whitespace-nowrap text-gray-200 active:text-yellow-400 active:border-yellow-400"
          >
            {item}
          </button>
        ))}
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col p-8 lg:hidden backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-serif font-bold text-yellow-500">MAYÉ MENU</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-5 text-lg font-bold tracking-widest uppercase">
            {navLinks.map((item) => (
              <button key={item} onClick={() => handleNavClick(item)} className="text-left hover:text-yellow-500 active:text-yellow-400 transition-colors border-b border-white/10 pb-3">{item}</button>
            ))}
          </div>
        </div>
      )}

      {/* RENDER HITBOXES */}
      {isLoaded && scene.hitboxes.map((hitbox) => {
        if (hitbox.type === 'invisible') {
          return (
            <button
              key={hitbox.id}
              onClick={() => handleHitboxAction(hitbox)}
              aria-label={hitbox.label}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer group"
              style={{ 
                left: isMobile ? hitbox.mobileX : hitbox.x, 
                top: isMobile ? hitbox.mobileY : hitbox.y,
                width: hitbox.width || '100px',
                height: hitbox.height || '50px',
                background: 'transparent',
                border: 'none',
              }}
            >
              <span className="w-full h-full block rounded-lg group-hover:bg-white/10 group-active:scale-95 transition-all" />
            </button>
          );
        }

        if (hitbox.type === 'product') {
          return (
            <button
              key={hitbox.id}
              onClick={() => handleHitboxAction(hitbox)}
              className="absolute group z-30 -translate-x-1/2 -translate-y-1/2 focus:outline-none w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
              style={{ 
                left: isMobile ? hitbox.mobileX : hitbox.x, 
                top: isMobile ? hitbox.mobileY : hitbox.y 
              }}
            >
              <span className="hidden md:block absolute inset-0 rounded-full border-2 animate-ping border-white/50" />
              <span className="relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/60 border border-white/40 group-hover:bg-yellow-500 group-hover:border-yellow-400 transition-all duration-300">
                <ChevronRight size={14} className="text-yellow-400 group-hover:text-black" />
              </span>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold tracking-wider bg-black/90 text-yellow-400 px-2 py-1 rounded border border-yellow-500/40 whitespace-nowrap z-40 shadow-lg">
                {hitbox.target.name}
              </span>
            </button>
          );
        }
        return null;
      })}

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[70] flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-black/90 border border-white/20 rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            {activeModal === 'BOOKING' && (
              <div>
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-4 text-yellow-500">Booking & Management</h2>
                <p className="text-sm text-gray-300 mb-6">For live performance bookings, corporate events, and press inquiries worldwide.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert('Booking request sent!'); setActiveModal(null); }} className="space-y-4">
                  <input type="text" placeholder="Your Name / Organization" required className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-yellow-500" />
                  <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-yellow-500" />
                  <textarea placeholder="Event Details & Dates" rows={4} required className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-yellow-500" />
                  <button type="submit" className="w-full py-3 bg-yellow-500 text-black font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors rounded">Send Booking Request</button>
                </form>
              </div>
            )}

            {activeModal === 'BIO' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-4 text-yellow-500">Biography</h2>
                <p className="text-sm leading-relaxed text-gray-300">
                  MAYÉ is an independent visionary artist blending sultry R&B textures, cinematic storytelling, and genre-defying production.
                </p>
              </div>
            )}

            {activeModal === 'TOUR' && (
              <div>
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Upcoming Tour Dates</h2>
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
                      <button className="px-4 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-yellow-500 transition-colors rounded">RSVP</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'MUSIC' && (
              <div>
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Discography</h2>
                <div className="p-4 bg-white/5 rounded border border-white/10 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-base">Suga & Spice</p>
                    <p className="text-xs text-gray-400">Single • Mayé X Bonny</p>
                  </div>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-yellow-500 text-black rounded-full hover:bg-yellow-400">
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'GALLERY' && (
              <div>
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
              <div className="text-center">
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
        className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-black/95 backdrop-blur-xl border-l border-white/10 p-8 z-50 transform transition-transform duration-500 ease-out flex flex-col ${
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
              className="w-full mt-4 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors rounded-none focus:outline-none"
            >
              Add to Cart
            </button>
          </>
        )}
      </div>

      {/* Cart Sidebar */}
      <div 
        className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-black/95 backdrop-blur-xl border-l border-white/10 p-8 z-[60] transform transition-transform duration-500 ease-out flex flex-col ${
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
            <button className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Bottom Scene Nav / Player */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-4 md:px-8 flex flex-row justify-between items-end md:items-center z-40 pointer-events-none">
        <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md p-2 md:p-3 rounded-full border border-white/10 pointer-events-auto shadow-2xl">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-yellow-500 transition-colors focus:outline-none flex-shrink-0"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
          </button>
          <div className="pr-4 select-none hidden xs:block">
            <p className="text-xs font-bold tracking-wider">SUGA & SPICE</p>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Mayé X Bonny</p>
          </div>
        </div>

        <div className="flex justify-end pointer-events-auto">
          <div className="flex justify-center gap-1 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
            {Object.values(SCENES).map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveProduct(null);
                  setCurrentSceneKey(s.id);
                }}
                className={`px-3 md:px-5 py-2 rounded-full text-[9px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  currentSceneKey === s.id 
                    ? 'bg-white text-black shadow-lg' 
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
