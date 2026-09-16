import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, X, ChevronRight, DoorOpen, Loader2, Music, Headphones, Smartphone, Menu, Mail, Calendar, MapPin, Send } from 'lucide-react';

// Custom SVG Icons to avoid Lucide version issues on Cloudflare
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
    // Background Video zoomed in to play horizontally
    video: 'https://res.cloudinary.com/dccxjo9x8/video/upload/v1789574973/Busted_The_Daring_Window_Escape_krpy1o.mov',
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
      { id: 'p4', name: 'Mayé Red Plaid Suit', price: 350, x: '35%', y: '50%', desc: 'Tailored two-piece red plaid suit. As worn by Mayé while counting the stash.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop' },
      { id: 'p5', name: 'Bonny Black Moto Jacket', price: 180, x: '75%', y: '55%', desc: '"You like it when I dress up..." Official Bonny Moto Leather Jacket.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop' },
      { id: 'p6', name: 'The Crimson Rose', price: 15, x: '60%', y: '45%', desc: 'A preserved, everlasting crimson rose. "I do care baby..."', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop' },
      { id: 'p7', name: 'Getaway Money Briefcase', price: 120, x: '45%', y: '75%', desc: 'Secure aluminum briefcase filled with prop $100 bills.', image: 'https://images.unsplash.com/photo-1553754538-4187e834eb70?w=500&auto=format&fit=crop' }
    ]
  },
  escape: {
    id: 'escape',
    name: 'The Escape',
    background: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=2560&auto=format&fit=crop',
    products: [
      { id: 'p8', name: 'Suga & Spice Vinyl (Yellow Edition)', price: 35, x: '50%', y: '60%', desc: 'Limited edition yellow translucent vinyl featuring the Beatnasti instrumental.', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop' },
      { id: 'p9', name: 'Bonny Pleated Mini-Skirt', price: 45, x: '70%', y: '50%', desc: '"Put my little skirt on..." Classic black pleated mini.', image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=500&auto=format&fit=crop' }
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
  const [activeModal, setActiveModal] = useState(null); // Modal handler for top nav links
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const audioRef = useRef(null);
  const scene = SCENES[currentSceneKey];

  // Initialize Audio
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

  // Play/Pause Audio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle Scene Media Loading
  useEffect(() => {
    setIsLoading(true);
    setIsLoaded(false);

    if (scene.video) {
      setIsLoading(false);
      setIsLoaded(true);
    } else {
      const img = new Image();
      img.src = scene.background;
      const handleLoadComplete = () => {
        setIsLoading(false);
        setTimeout(() => setIsLoaded(true), 50); 
      };
      img.onload = handleLoadComplete;
      img.onerror = handleLoadComplete;
      if (img.complete) handleLoadComplete();
    }
  }, [currentSceneKey, scene]);

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

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* CSS Reset & Scrollbar hiding */}
      <style>{`
        #root, #__next, :root { max-width: none !important; width: 100% !important; height: 100% !important; margin: 0 !important; padding: 0 !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      )}

      {/* Media Background: Video or Image */}
      {scene.video ? (
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 object-center transition-all duration-1000"
            src={scene.video}
          />
        </div>
      ) : (
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          style={{
            backgroundImage: `url(${scene.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40">
        
        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Navigation Links (BOOKING, BIO, TOUR, MERCH, MUSIC, GALLERY, JOIN) */}
        <div className="hidden lg:flex gap-6 items-center text-xs font-semibold tracking-widest uppercase">
          {['BOOKING', 'BIO', 'TOUR', 'MERCH', 'MUSIC', 'GALLERY', 'JOIN'].map((item) => (
            <button 
              key={item} 
              onClick={() => handleNavClick(item)}
              className="hover:text-yellow-400 transition-colors drop-shadow"
            >
              {item}
            </button>
          ))}
        </div>
        
        {/* Branding MAYÉ */}
        <div className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-serif tracking-widest font-bold whitespace-nowrap drop-shadow-lg select-none">
          MAYÉ
        </div>

        {/* Social Links & Cart */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-3 md:gap-4 text-white/80">
            <a href="https://www.instagram.com/lu__maye" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href="https://www.youtube.com/@lu_maye" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">
              <YoutubeIcon size={18} />
            </a>
            <a href="https://www.tiktok.com/@lu_maye" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">
              <Smartphone size={18} />
            </a>
            <a href="https://open.spotify.com/artist/7nREcJOl7efyzyDi5eIDYS" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">
              <Headphones size={18} />
            </a>
            <a href="https://music.apple.com/us/artist/mayé/1648129929" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">
              <Music size={18} />
            </a>
          </div>

          <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 hover:text-yellow-400 transition-colors text-xs md:text-sm font-medium tracking-widest uppercase bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
            <ShoppingBag size={16} />
            <span>Cart ({cart.length})</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col p-8 lg:hidden backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-serif font-bold">MAYÉ</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-6 text-lg font-bold tracking-widest uppercase">
            {['BOOKING', 'BIO', 'TOUR', 'MERCH', 'MUSIC', 'GALLERY', 'JOIN'].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNavClick(item)}
                className="text-left hover:text-yellow-500 transition-colors border-b border-white/10 pb-3"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

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
          className="absolute group z-30 -translate-x-1/2 -translate-y-1/2 focus:outline-none w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
          style={{ left: product.x, top: product.y }}
        >
          <span className={`absolute inset-0 rounded-full border-2 animate-ping ${product.isDoor ? 'border-yellow-500/50' : 'border-white/50'}`} />
          <span className={`relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full backdrop-blur-md border transition-all duration-300 ${
            product.isDoor 
              ? 'bg-yellow-500/20 border-yellow-400 group-hover:bg-yellow-500' 
              : 'bg-white/20 border-white/40 group-hover:bg-yellow-500 group-hover:border-yellow-400'
          }`}>
            {product.isDoor ? (
              <DoorOpen size={14} className="text-yellow-400 group-hover:text-black" />
            ) : (
              <ChevronRight size={14} className="text-white group-hover:text-black" />
            )}
          </span>
          <span className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-medium tracking-wider bg-black/80 px-3 py-1 rounded backdrop-blur-sm pointer-events-none border border-white/10">
            {product.name}
          </span>
        </button>
      ))}

      {/* Nav Link Modals Overlay */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[70] flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-black/80 border border-white/10 rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            {/* BOOKING MODAL */}
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

            {/* BIO MODAL */}
            {activeModal === 'BIO' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-4 text-yellow-500">Biography</h2>
                <p className="text-sm leading-relaxed text-gray-300">
                  MAYÉ is an independent visionary artist blending sultry R&B textures, cinematic storytelling, and genre-defying production. Known for high-concept visuals and immersive sonic experiences, MAYÉ creates world-building records that linger between romance and high-stakes drama.
                </p>
                <p className="text-sm leading-relaxed text-gray-300">
                  With the latest release "Suga & Spice," MAYÉ continues to push creative limits across music, film, and fashion.
                </p>
              </div>
            )}

            {/* TOUR MODAL */}
            {activeModal === 'TOUR' && (
              <div>
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Upcoming Tour Dates</h2>
                <div className="space-y-4">
                  {[
                    { date: 'OCT 24', city: 'Lagos, Nigeria', venue: 'Beachfront Arena' },
                    { date: 'NOV 12', city: 'London, UK', venue: 'O2 Forum Kentish Town' },
                    { date: 'DEC 05', city: 'New York, NY', venue: 'Webster Hall' }
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

            {/* MUSIC MODAL */}
            {activeModal === 'MUSIC' && (
              <div>
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Discography</h2>
                <div className="space-y-4">
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
              </div>
            )}

            {/* GALLERY MODAL */}
            {activeModal === 'GALLERY' && (
              <div>
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-yellow-500">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop'
                  ].map((imgUrl, i) => (
                    <img key={i} src={imgUrl} className="w-full h-32 object-cover rounded border border-white/10" alt="Gallery preview" />
                  ))}
                </div>
              </div>
            )}

            {/* JOIN MODAL */}
            {activeModal === 'JOIN' && (
              <div className="text-center">
                <Mail className="mx-auto text-yellow-500 mb-4" size={40} />
                <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-2">Join The Inner Circle</h2>
                <p className="text-sm text-gray-300 mb-6">Subscribe to receive exclusive drops, early ticket access, and behind-the-scenes content directly from MAYÉ.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert('Welcome to the inner circle!'); setActiveModal(null); }} className="flex flex-col gap-3">
                  <input type="email" placeholder="Enter your email address" required className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-yellow-500" />
                  <button type="submit" className="py-3 bg-yellow-500 text-black font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors rounded">Subscribe Now</button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Product Details Sidebar */}
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
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop' }}
                />
              </div>
              
              <h2 className="text-2xl font-serif font-bold mb-2 pr-8">{activeProduct.name}</h2>
              <p className="text-yellow-500 text-xl font-medium mb-6">${activeProduct.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
              
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed mb-8">
                <p>{activeProduct.desc}</p>
              </div>
              
              {!['h1', 'h2', 'p6', 'p7', 'p8'].includes(activeProduct.id) && (
                <div className="space-y-3 mb-8">
                  <label className="text-xs tracking-widest uppercase text-gray-400">Size</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button key={size} className="w-10 h-10 rounded border border-white/20 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-all text-xs font-bold">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag size={48} className="opacity-50" />
              <p className="text-sm tracking-widest uppercase">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center bg-white/5 p-3 rounded-lg border border-white/10">
                <img src={item.image} className="w-16 h-16 rounded object-cover" alt={item.name} />
                <div className="flex-1">
                  <p className="text-sm font-bold truncate">{item.name}</p>
                  <p className="text-xs text-yellow-500 font-medium mt-1">${item.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex justify-between items-center mb-6 text-lg">
              <span className="font-medium">Total</span>
              <span className="font-bold text-yellow-500">${cartTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
            <button className="w-full py-4 bg-yellow-500 text-black font-bold tracking-widest uppercase hover:bg-yellow-400 transition-colors rounded-none focus:outline-none">
              Checkout Now
            </button>
          </div>
        )}
      </div>

      {/* Bottom Audio Player & Scene Switcher */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-4 md:px-8 flex flex-row justify-between items-end md:items-center z-40 pointer-events-none">
        
        {/* SUGA & SPICE Music Player */}
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
          {isPlaying && (
            <div className="flex gap-1 pr-4 h-4 items-end">
              <div className="w-1 bg-yellow-500 animate-[bounce_1s_infinite] h-full" />
              <div className="w-1 bg-yellow-500 animate-[bounce_0.8s_infinite] h-2/3" />
              <div className="w-1 bg-yellow-500 animate-[bounce_1.2s_infinite] h-full" />
            </div>
          )}
        </div>

        {/* Scene Switcher */}
        <div className="flex justify-end pointer-events-auto">
          <div className="flex justify-center gap-1 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
            {Object.values(SCENES).map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveProduct(null);
                  setCurrentSceneKey(s.id);
                }}
                className={`px-3 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 focus:outline-none ${
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
