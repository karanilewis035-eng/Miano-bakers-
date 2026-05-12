/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  MessageCircle, 
  Phone, 
  Instagram, 
  Facebook, 
  ArrowRight,
  Star,
  ChevronRight,
  Check,
  Award,
  Truck,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data ---

interface Cake {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  flavors: string[];
}

const CATEGORIES = [
  "Birthday Cakes",
  "Wedding Cakes",
  "Anniversary Cakes",
  "Kids Cakes",
  "Cupcakes",
  "Bento Cakes"
];

const CAKES: Cake[] = [
  {
    id: "1",
    name: "Golden Elegance Wedding Cake",
    category: "Wedding Cakes",
    price: 35000,
    image: "https://images.unsplash.com/photo-1535251714842-7634f1b40286?auto=format&fit=crop&q=80&w=1000",
    description: "A three-tier masterpiece with gold leaf detailing and velvet texture.",
    flavors: ["Classic Vanilla", "Red Velvet", "Lemon Curd"]
  },
  {
    id: "2",
    name: "Classic Chocolate Ganache",
    category: "Birthday Cakes",
    price: 3500,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000",
    description: "Rich dark chocolate sponge layered with smooth Belgian chocolate ganache.",
    flavors: ["Dark Chocolate", "Milk Chocolate"]
  },
  {
    id: "3",
    name: "Berry Bliss Bento Cake",
    category: "Bento Cakes",
    price: 1500,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=1000",
    description: "Perfectly sized for two. Light sponge topped with fresh berries.",
    flavors: ["Strawberry", "Mixed Berries"]
  },
  {
    id: "4",
    name: "Pastel Dream Cupcakes",
    category: "Cupcakes",
    price: 2400,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=1000",
    description: "A dozen artisanal cupcakes with smooth buttercream frosting.",
    flavors: ["Vanilla Bean", "Rose Water", "Pistachio"]
  },
  {
    id: "5",
    name: "Safari Adventure Kids Cake",
    category: "Kids Cakes",
    price: 5500,
    image: "https://images.unsplash.com/photo-1542826438-bd32f41d62fb?auto=format&fit=crop&q=80&w=1000",
    description: "Hand-sculpted jungle animals on a delicious vanilla forest floor.",
    flavors: ["Funfetti", "Vanilla forest"]
  }
];

// --- Components ---

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/254700000000"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <MessageCircle size={32} />
    <span className="absolute -top-2 -left-2 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
    </span>
  </motion.a>
);

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-cream/80 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#" className="flex flex-col">
          <span className="display-text text-2xl font-bold tracking-tight">VELVET BITES</span>
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">Handcrafted Nairobi</span>
          </a>
          <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest">
            <a href="#shop" className="hover:text-gold transition-colors">Shop</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="relative p-2">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-cream border-b border-ink/10 py-8 px-4"
          >
            <div className="flex flex-col gap-6 text-center text-sm font-semibold uppercase tracking-widest">
              <a href="#shop" onClick={() => setIsOpen(false)}>Shop</a>
              <a href="#about" onClick={() => setIsOpen(false)}>About</a>
              <a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a>
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [cart, setCart] = useState<Cake[]>([]);

  const addToCart = (cake: Cake) => {
    setCart([...cart, cake]);
    // Optional: add a small toast notification here
  };

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cart.length} />
      
      {/* --- HERO SECTION --- */}
      <header className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="display-text text-5xl lg:text-7xl leading-tight mb-6">
              Custom Cakes <br />
              <span className="italic luxury-serif text-gold font-light">Made with Love</span> <br />
              for Every Occasion.
            </h1>
            <p className="text-ink/60 text-lg mb-10 max-w-lg font-light leading-relaxed">
              From majestic wedding tiers to playful bento boxes, we bake your dreams into edible art. Delivering happiness across Nairobi daily.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#shop" 
                className="bg-gold text-white px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gold/90 transition-all shadow-lg shadow-gold/20"
              >
                Order Now <ArrowRight size={16} />
              </a>
              <a 
                href="#gallery" 
                className="border border-ink/20 px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-ink hover:text-white transition-all"
              >
                View Gallery
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6 border-t border-ink/10 pt-8">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-cream overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${i}`} 
                      alt="Customer" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-gold mb-1">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                </div>
                <p className="font-semibold text-xs uppercase tracking-wider">500+ Happy Customers in Nairobi</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=1000" 
                alt="Main Hero Cake" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-soft-pink rounded-full -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-gold/20 rounded-full -z-0"></div>
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute top-1/4 -right-12 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider leading-none mb-1">Free Delivery</p>
                <p className="text-[8px] text-ink/50 uppercase tracking-widest">Above KSh 5,000</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* --- CATEGORIES --- */}
      <section id="categories" className="py-20 bg-soft-pink/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold font-semibold uppercase tracking-[0.3em] text-[10px] mb-4">Our Specialities</p>
          <h2 className="display-text text-4xl mb-12">Baking Joy for Every Occasion</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-cream rounded-full mx-auto mb-4 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                  <Heart size={20} />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest leading-tight">{category}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED PRODUCTS --- */}
      <section id="shop" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-gold font-semibold uppercase tracking-[0.3em] text-[10px] mb-4">Our Shop</p>
              <h2 className="display-text text-4xl">Featured Cakes</h2>
            </div>
            <div className="flex gap-4">
              <button className="text-xs font-bold uppercase tracking-widest pb-2 border-b-2 border-gold text-gold">Most Popular</button>
              <button className="text-xs font-bold uppercase tracking-widest pb-2 border-b-2 border-transparent hover:border-ink/20 transition-all">New Arrivals</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {CAKES.map((cake, index) => (
              <motion.div
                key={cake.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div 
                  className="aspect-square rounded-[2rem] overflow-hidden mb-6 relative cursor-pointer"
                  onClick={() => setSelectedCake(cake)}
                >
                  <img 
                    src={cake.image} 
                    alt={cake.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-ink px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Details
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    {cake.category}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{cake.name}</h3>
                    <p className="text-gold font-bold">KSh {cake.price.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(cake)}
                    className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="about" className="py-20 bg-ink text-cream">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" 
                 alt="Our Kitchen" 
                 className="w-full h-full object-cover opacity-80"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-gold p-8 rounded-2xl shadow-xl">
               <Award size={40} className="mb-4" />
               <p className="display-text text-3xl font-bold">10+</p>
               <p className="text-[10px] uppercase tracking-widest font-bold">Years of Baking Excellence</p>
            </div>
          </div>
          
          <div>
            <p className="text-gold font-semibold uppercase tracking-[0.3em] text-[10px] mb-4">Our Story</p>
            <h2 className="display-text text-4xl mb-8 leading-tight">Fresh Ingredients, <br />Timeless Recipes.</h2>
            <div className="space-y-8">
              {[
                { title: "Premium Quality", desc: "We use only the finest Belgian chocolate, imported madagascar vanilla, and fresh local fruits.", icon: <Check size={20} /> },
                { title: "Nairobi-Wide Delivery", desc: "Our specialized transport ensures your cake arrives in pristine condition, every time.", icon: <Truck size={20} /> },
                { title: "Custom Designs", desc: "Our decorators are artists who bring your specific vision to life with uncanny detail.", icon: <Heart size={20} /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex-shrink-0 flex items-center justify-center text-gold">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-2">{item.title}</h4>
                    <p className="text-cream/60 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="display-text text-4xl mb-4">What Our Clients Say</h2>
            <div className="flex justify-center gap-1 text-gold">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah W.", text: "The wedding cake was more beautiful than the pictures I sent! Everyone loved the Red Velvet layer.", loc: "Nairobi West" },
              { name: "David M.", text: "Best chocolate cake in Nairobi. Timely delivery and very professional service.", loc: "Kilimani" },
              { name: "Grace K.", text: "My daughter's 5th birthday cake was a hit! The safari theme was so detailed.", loc: "Kileleshwa" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-[2rem] shadow-sm border border-ink/5"
              >
                <div className="mb-6 opacity-30">
                  <MessageCircle size={32} />
                </div>
                <p className="italic mb-8 text-ink/70 font-light leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream"></div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-widest">{review.name}</p>
                    <p className="text-[10px] text-ink/40 uppercase tracking-widest">{review.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-white pt-24 pb-12 px-4 border-t border-ink/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <a href="#" className="flex flex-col mb-8">
                <span className="display-text text-2xl font-bold tracking-tight">VELVET BITES</span>
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">Luxury Patisserie</span>
              </a>
              <p className="text-ink/60 text-sm leading-relaxed font-light mb-8 max-w-xs">
                Crafting memories through artisanal baking since 2014. Based in the heart of Nairobi.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-gold hover:text-white transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-gold hover:text-white transition-all"><Facebook size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8">Quick Links</h4>
              <ul className="space-y-4 text-sm font-medium text-ink/60">
                <li><a href="#shop" className="hover:text-gold transition-colors">Our Cakes</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">Our Story</a></li>
                <li><a href="#gallery" className="hover:text-gold transition-colors">Gallery</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">Delivery Info</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8">Categories</h4>
              <ul className="space-y-4 text-sm font-medium text-ink/60">
                <li><a href="#" className="hover:text-gold transition-colors">Wedding Cakes</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Birthday Cakes</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Bento Cakes</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Cupcakes</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8">Contact Us</h4>
              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-4">
                  <Phone size={18} className="text-gold mt-1" />
                  <div>
                    <p className="font-bold text-[10px] uppercase tracking-wider mb-1">Call / WhatsApp</p>
                    <p className="text-ink/60">+254 700 000 000</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MessageCircle size={18} className="text-gold mt-1" />
                  <div>
                    <p className="font-bold text-[10px] uppercase tracking-wider mb-1">Email</p>
                    <p className="text-ink/60">hello@velvetbites.co.ke</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-ink/5 gap-6">
            <p className="text-[10px] uppercase tracking-widest text-ink/40">© 2026 Velvet Bites Nairobi. All Rights Reserved.</p>
            <div className="flex gap-8">
              <p className="text-[10px] uppercase tracking-widest text-ink/40">Privacy Policy</p>
              <p className="text-[10px] uppercase tracking-widest text-ink/40">Terms of Service</p>
            </div>
          </div>
        </div>
      </footer>

      {/* --- CAKE MODAL --- */}
      <AnimatePresence>
        {selectedCake && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setSelectedCake(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedCake(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-ink z-20 hover:bg-ink hover:text-white transition-all shadow-xl"
              >
                <X size={20} />
              </button>
              
              <div className="md:w-1/2 aspect-square md:aspect-auto">
                <img 
                  src={selectedCake.image} 
                  alt={selectedCake.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                <p className="text-gold font-bold uppercase tracking-widest text-[10px] mb-4">{selectedCake.category}</p>
                <h2 className="display-text text-3xl mb-4">{selectedCake.name}</h2>
                <p className="text-2xl font-bold text-ink mb-6">KSh {selectedCake.price.toLocaleString()}</p>
                
                <p className="text-ink/60 text-sm font-light leading-relaxed mb-8">
                  {selectedCake.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">Choose Flavor</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCake.flavors.map(flavor => (
                      <button key={flavor} className="px-4 py-2 rounded-full border border-ink/10 text-[10px] font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">Custom Message</h4>
                  <input 
                    type="text" 
                    placeholder="E.g. Happy Birthday Sarah!" 
                    className="w-full bg-cream/50 border border-ink/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      addToCart(selectedCake);
                      setSelectedCake(null);
                    }}
                    className="w-full bg-ink text-white py-4 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gold transition-all"
                  >
                    Add to Cart <ChevronRight size={14} />
                  </button>
                  <a 
                    href={`https://wa.me/254700000000?text=Hi, I would like to order the ${selectedCake.name}`}
                    target="_blank"
                    className="w-full border border-gold text-gold py-4 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-all shadow-lg shadow-gold/10"
                  >
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppButton />
    </div>
  );
}

