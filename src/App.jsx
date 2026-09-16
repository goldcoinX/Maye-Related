import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, X, ChevronRight, Loader2, Music, Headphones, Smartphone, Menu, Mail } from 'lucide-react';

// ... (Keep the InstagramIcon and YoutubeIcon components exactly as they were)

const SCENES = {
  hotel: {
    id: 'hotel',
    name: '1. Hotel (Home)',
    backgroundDesktop: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1781626534/home_ready_hotel_azeki6.png',
    backgroundMobile: 'https://res.cloudinary.com/dccxjo9x8/image/upload/v1789580313/1_the_hotel_h3udh8.png',
    hitboxes: [
      // Invisible Navigation & Modal Hitboxes
      { id: 'h-room', type: 'invisible', action: 'scene', target: 'room', label: 'B&C Room', x: '50%', y: '60%', mobileX: '82%', mobileY: '33%', width: '120px', height: '60px' },
      { id: 'h-bio', type: 'invisible', action: 'modal', target: 'BIO', label: 'BIO', x: '20%', y: '30%', mobileX: '20%', mobileY: '30%', width: '80px', height: '40px' },
      { id: 'h-gallery', type: 'invisible', action: 'modal', target: 'GALLERY', label: 'GALLERY', x: '30%', y: '30%', mobileX: '30%', mobileY: '30%', width: '80px', height: '40px' },
      { id: 'h-join', type: 'invisible', action: 'modal', target: 'JOIN', label: 'JOIN', x: '40%', y: '30%', mobileX: '40%', mobileY: '30%', width: '80px', height: '40px' },
      // Visible Product Hotspots
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
      // Interactive artwork elements mapped to open as products for now (can be changed to modals if they just show images)
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
  // ... (Keep all your existing state variables, useEffects, handleAddToCart, and handleNavClick unchanged)
  
  // NEW: Unified hitbox click handler
  const handleHitboxAction = (hitbox) => {
    setActiveProduct(null); // Clear any active product panels
    
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

  // ... (Keep your return statement up to the mobileMenuOpen block)

      {/* RENDER HITBOXES (Replaces the old portal and product hotspot code) */}
      {isLoaded && scene.hitboxes.map((hitbox) => {
        
        // Render INVISIBLE HITBOXES (mapped over artwork text/doors)
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
              {/* Optional: A subtle hover effect to show users it's clickable, or remove bg-white/10 to keep it 100% invisible */}
              <span className="w-full h-full block rounded-lg group-hover:bg-white/10 group-active:scale-95 transition-all" />
            </button>
          );
        }

        // Render VISIBLE PRODUCT HOTSPOTS (pulsing dots)
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

      {/* Modals, Product Sidebar, Cart Sidebar, and Bottom Player remain the exact same below this... */}
