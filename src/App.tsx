import { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Star, 
  ChevronRight, 
  RefreshCw,
  X,
  Plus,
  Minus,
  Trash2,
  Check,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from './data';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  // Store Navigation & View router
  const [storeView, setStoreView] = useState<'home' | 'catalog' | 'detail'>('home');
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [storeCategory, setStoreCategory] = useState<string>('All');
  
  // Cart & Drawer State
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[2], quantity: 1 }, // Chronos Smart Watch Ultra
    { product: PRODUCTS[3], quantity: 1 }, // AeroPods Studio Pro
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([3]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  
  // Checkout Simulation State
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'form' | 'success'>('idle');
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const activeProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const relatedProducts = PRODUCTS.filter(p => p.category === activeProduct.category && p.id !== activeProduct.id).slice(0, 3);
  const filteredProducts = storeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === storeCategory);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Cart Handlers
  const addToCart = (product: Product) => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setCart(prev => {
        const existing = prev.find(item => item.product.id === product.id);
        if (existing) {
          return prev.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      setIsCartOpen(true);
    }, 600);
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const toggleFavorite = (productId: number) => {
    if (favoriteIds.includes(productId)) {
      setFavoriteIds(prev => prev.filter(id => id !== productId));
    } else {
      setFavoriteIds(prev => [...prev, productId]);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    setTimeout(() => {
      // Clear cart on successful order
      setCart([]);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C] flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      
      {/* Dynamic Storefront Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 px-6 py-5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStoreView('home')}>
            <span className="w-8 h-8 bg-stone-900 flex items-center justify-center text-white font-bold text-base">S</span>
            <span className="text-xl font-black tracking-tighter uppercase italic text-stone-950 font-sans">
              Shop<span className="text-orange-600">Wave</span>
            </span>
          </div>
          
          {/* Main Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <button 
              onClick={() => setStoreView('home')} 
              className={`transition tracking-widest ${storeView === 'home' ? 'text-orange-600 font-black' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setStoreView('catalog'); setStoreCategory('All'); }} 
              className={`transition tracking-widest ${storeView === 'catalog' && storeCategory === 'All' ? 'text-orange-600 font-black' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Browse Catalog
            </button>
            <button 
              onClick={() => { setStoreView('catalog'); setStoreCategory('Electronics'); }} 
              className={`transition tracking-widest ${storeView === 'catalog' && storeCategory === 'Electronics' ? 'text-orange-600 font-black' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Electronics
            </button>
            <button 
              onClick={() => { setStoreView('catalog'); setStoreCategory('Accessories'); }} 
              className={`transition tracking-widest ${storeView === 'catalog' && storeCategory === 'Accessories' ? 'text-orange-600 font-black' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Accessories
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-6 text-stone-600">
            <button 
              onClick={() => { setStoreView('catalog'); setStoreCategory('All'); }} 
              className="hover:text-stone-900 transition p-1"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>
            
            {/* Bag Button with Counter Badge */}
            <div 
              onClick={() => setIsCartOpen(true)} 
              className="relative cursor-pointer hover:text-stone-900 transition p-1"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] h-4 w-4 rounded-full font-bold flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME LANDING PAGE */}
        {storeView === 'home' && (
          <div className="animate-fade-in-up">
            
            {/* Hero Section Grid */}
            <section className="bg-white border-b border-stone-200 grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
              <div className="md:col-span-7 flex flex-col justify-center px-8 md:px-16 py-12 md:py-20 border-r border-stone-200 text-left bg-white">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Premium Curated Drops
                </span>
                <h2 className="text-[50px] sm:text-[60px] md:text-[72px] leading-[0.92] font-black uppercase tracking-tighter text-stone-950 mb-8">
                  Ride the<br/>Wave of<br/><span className="text-stone-300">Excellence</span>
                </h2>
                <p className="text-stone-500 max-w-sm mb-8 leading-relaxed text-sm">
                  Curated high-performance gear for the modern explorer. Experience the intersection of technology and minimalist aesthetic design.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => { setStoreView('catalog'); setStoreCategory('All'); }} 
                    className="px-10 py-4 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition rounded-none shadow-md"
                  >
                    Shop Now
                  </button>
                  <button 
                    onClick={() => { setStoreView('catalog'); setStoreCategory('Accessories'); }}
                    className="px-10 py-4 border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-900 hover:bg-stone-50 transition rounded-none"
                  >
                    Lookbook
                  </button>
                </div>
              </div>

              {/* Hero Right Visual Column */}
              <div className="md:col-span-5 relative bg-stone-50 flex items-center justify-center p-8 overflow-hidden min-h-[350px]">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 via-transparent to-transparent"></div>
                <div className="w-56 h-[340px] bg-stone-900 transform rotate-6 shadow-2xl relative p-6 flex flex-col justify-between text-white border-2 border-stone-850">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs tracking-widest text-orange-500 uppercase">AURA</span>
                    <span className="text-white/40 font-mono text-[9px]">S#58293</span>
                  </div>
                  <div className="space-y-2 text-left">
                    <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Wave Series</p>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">CHRONOS EDITION</h3>
                  </div>
                  <div className="text-white/20 font-black text-6xl select-none text-right">01</div>
                </div>
                
                {/* Float-badge */}
                <div className="absolute bottom-8 left-8 p-4 bg-white border border-stone-200 shadow-xl max-w-[190px] text-left">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-orange-600 mb-1">Trending Item</p>
                  <h4 className="text-xs font-bold text-stone-900 uppercase">AeroPods Studio Pro</h4>
                  <p className="text-sm font-black mt-1 text-stone-950">$299.99</p>
                </div>
              </div>
            </section>

            {/* Shop by Category */}
            <section className="py-16 px-6 max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-stone-950">Shop by Category</h3>
                <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mt-1">Explore our custom tailored catalog filters</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Electronics', icon: '💻' },
                  { name: 'Accessories', icon: '⌚' },
                  { name: 'Audio', icon: '🎧' },
                  { name: 'Home & Office', icon: '🛋️' }
                ].map((cat) => {
                  const count = PRODUCTS.filter(p => p.category === cat.name).length;
                  return (
                    <div 
                      key={cat.name}
                      onClick={() => { setStoreCategory(cat.name); setStoreView('catalog'); }}
                      className="bg-white border border-stone-200 hover:border-orange-600 hover:bg-stone-50 rounded-none p-8 text-center cursor-pointer transition duration-300 group"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition">{cat.icon}</div>
                      <span className="font-bold text-xs uppercase tracking-widest text-stone-900 block">{cat.name}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 block mt-1">{count} Items</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Featured Products showcase */}
            <section className="py-16 bg-stone-50 border-t border-stone-200 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-stone-950">Featured Products</h3>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">Sought-after, high-performance equipment</p>
                  </div>
                  <button 
                    onClick={() => { setStoreCategory('All'); setStoreView('catalog'); }} 
                    className="text-xs font-bold uppercase tracking-widest text-orange-600 hover:text-orange-500 flex items-center gap-0.5 transition"
                  >
                    Explore all <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white border border-stone-200 rounded-none overflow-hidden hover:border-stone-400 transition duration-300 flex flex-col group shadow-sm"
                    >
                      <div 
                        className="relative aspect-square bg-stone-100 overflow-hidden cursor-pointer" 
                        onClick={() => { setSelectedProductId(product.id); setStoreView('detail'); }}
                      >
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-stone-900 text-[#FAF9F6] text-[9px] font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-5 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <h4 
                            onClick={() => { setSelectedProductId(product.id); setStoreView('detail'); }}
                            className="font-bold text-stone-900 text-sm uppercase tracking-tight hover:text-orange-600 cursor-pointer line-clamp-1 transition"
                          >
                            {product.name}
                          </h4>
                          <p className="text-stone-500 text-xs mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                          <span className="text-base font-black text-stone-950">${product.price.toFixed(2)}</span>
                          <button 
                            onClick={() => { setSelectedProductId(product.id); setStoreView('detail'); }} 
                            className="w-8 h-8 rounded-none border border-stone-200 text-stone-600 hover:bg-stone-900 hover:text-white flex items-center justify-center transition"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-6 max-w-6xl mx-auto border-t border-stone-200">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-stone-950">Verified ShopWave Reviews</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Marcus Vance', title: 'Developer', text: "The EliteBook Pro completely revolutionized my portable development workspace. Incredible screen quality and compiled runs have never been this rapid.", init: 'MV' },
                  { name: 'Sarah Jenkins', title: 'Mountain Guide', text: "I was skeptical about the smartwatch battery claims but it easily lasts through rigorous multi-day mountaineering hikes with live navigation.", init: 'SJ' },
                  { name: 'David Lee', title: 'Audiophile Reviewer', text: "Impeccable acoustic performance. Clean mids, crisp response, and beautiful minimalist industrial hardware styling.", init: 'DL' }
                ].map((rev) => (
                  <div key={rev.name} className="bg-white border border-stone-200 p-6 rounded-none text-left">
                    <div className="flex gap-0.5 text-orange-600 mb-3">
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                    </div>
                    <p className="text-xs text-stone-600 italic leading-relaxed mb-4">"{rev.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-800">{rev.init}</div>
                      <div>
                        <span className="text-xs font-bold text-stone-900 uppercase tracking-wide block">{rev.name}</span>
                        <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold block mt-0.5">{rev.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PRODUCTS CATALOG LIST */}
        {storeView === 'catalog' && (
          <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in-up">
            <div className="border-b border-stone-200 pb-4 mb-8 text-left">
              <h2 className="text-2xl font-black uppercase tracking-tight text-stone-950">Catalog: {storeCategory} Products</h2>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mt-1">Discover premium, functional items built for durability.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar filter */}
              <aside className="w-full md:w-56 shrink-0 space-y-4 text-left">
                <div className="bg-white rounded-none p-5 border border-stone-200">
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">Filter Category</h4>
                  <div className="space-y-1.5">
                    {['All', 'Electronics', 'Accessories', 'Audio', 'Home & Office'].map((cat) => {
                      const count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length;
                      return (
                        <button 
                          key={cat} 
                          onClick={() => setStoreCategory(cat)}
                          className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-none transition ${storeCategory === cat ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'}`}
                        >
                          <span className="uppercase tracking-wider text-[10px] font-bold">{cat === 'All' ? 'All Products' : cat}</span>
                          <span className={`px-1.5 py-0.5 text-[9px] font-mono font-bold ${storeCategory === cat ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-500'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* List Grid */}
              <div className="flex-grow">
                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center bg-white border border-stone-200 p-8">
                    <p className="text-stone-500 text-sm">No products found in this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="bg-white border border-stone-200 rounded-none overflow-hidden hover:border-stone-400 transition duration-300 flex flex-col group">
                        <div 
                          className="relative aspect-square bg-stone-50 overflow-hidden cursor-pointer" 
                          onClick={() => { setSelectedProductId(product.id); setStoreView('detail'); }}
                        >
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                          />
                          <span className="absolute top-2 left-2 bg-stone-900 text-white font-bold text-[9px] uppercase px-2 py-0.5 tracking-wider">
                            {product.category}
                          </span>
                        </div>
                        <div className="p-5 flex-grow flex flex-col justify-between text-left">
                          <div>
                            <h4 
                              onClick={() => { setSelectedProductId(product.id); setStoreView('detail'); }} 
                              className="font-bold text-stone-950 text-sm uppercase tracking-tight hover:text-orange-600 cursor-pointer line-clamp-1 transition"
                            >
                              {product.name}
                            </h4>
                            <p className="text-stone-500 text-xs mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
                          </div>
                          <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-stone-100">
                            <span className="text-base font-black text-stone-950">${product.price.toFixed(2)}</span>
                            <button 
                              onClick={() => { setSelectedProductId(product.id); setStoreView('detail'); }} 
                              className="px-3 py-1.5 border border-stone-200 hover:bg-stone-900 hover:text-white rounded-none text-[10px] font-bold uppercase tracking-widest transition flex items-center gap-1"
                            >
                              Details <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SINGLE PRODUCT DETAILS VIEW */}
        {storeView === 'detail' && (
          <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in-up">
            <div className="mb-6 text-[10px] uppercase font-bold tracking-widest text-stone-500 flex items-center gap-1.5 justify-start">
              <button onClick={() => setStoreView('home')} className="hover:text-orange-600 transition">Home</button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => setStoreView('catalog')} className="hover:text-orange-600 transition">Products</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-stone-850 font-bold">{activeProduct.name}</span>
            </div>

            <div className="bg-white rounded-none border border-stone-200 overflow-hidden p-6 sm:p-10 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Product Image */}
                <div className="aspect-square bg-stone-50 border border-stone-200 rounded-none overflow-hidden flex items-center justify-center p-4">
                  <img src={activeProduct.imageUrl} alt={activeProduct.name} className="max-h-full max-w-full object-contain" />
                </div>

                {/* Metadata & Actions */}
                <div className="text-left">
                  <span className="px-2.5 py-0.5 bg-stone-100 text-stone-900 text-[9px] font-bold rounded-none uppercase tracking-widest block w-fit mb-3">
                    {activeProduct.category}
                  </span>
                  <h2 className="text-2xl sm:text-3.5xl font-black text-stone-950 uppercase tracking-tight mb-2 leading-tight">
                    {activeProduct.name}
                  </h2>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-orange-600">
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                      <Star className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                    </div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">(4.9 / 5.0 Rating • 32 Reviews)</span>
                  </div>

                  <div className="border-t border-stone-100 my-4"></div>

                  <div className="mb-5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block">Retail Price</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2.5xl font-black text-stone-950">${activeProduct.price.toFixed(2)}</span>
                      <span className="text-xs text-stone-400 line-through">${(activeProduct.price * 1.15).toFixed(2)}</span>
                      <span className="text-[9px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded-none uppercase tracking-wide">
                        15% Off
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[9px] uppercase font-bold tracking-widest text-stone-900 mb-1.5">Overview</h4>
                    <p className="text-xs text-stone-650 leading-relaxed font-medium">{activeProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6 text-[9px]">
                    <div className="bg-stone-50 border border-stone-150 p-3 rounded-none">
                      <span className="text-stone-400 block uppercase font-bold tracking-widest">Warranty</span>
                      <span className="font-bold text-stone-850">2-Year Full Cover</span>
                    </div>
                    <div className="bg-stone-50 border border-stone-150 p-3 rounded-none">
                      <span className="text-stone-400 block uppercase font-bold tracking-widest">Delivery Status</span>
                      <span className="font-bold text-orange-600 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping"></span> Immediate Dispatch
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => addToCart(activeProduct)}
                      disabled={isAdding}
                      className="flex-grow inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white rounded-none py-4 text-xs font-bold uppercase tracking-widest transition shadow-md"
                    >
                      {isAdding ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> ADDING TO WAVEBAG...
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" /> ADD TO WAVEBAG
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => toggleFavorite(activeProduct.id)}
                      className={`w-12 h-12 rounded-none border flex items-center justify-center transition ${favoriteIds.includes(activeProduct.id) ? 'border-orange-200 bg-orange-50 text-orange-600' : 'border-stone-200 text-stone-400 hover:bg-stone-50'}`}
                      title={favoriteIds.includes(activeProduct.id) ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart className={`w-4.5 h-4.5 ${favoriteIds.includes(activeProduct.id) ? 'fill-orange-600 text-orange-600' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products list */}
            {relatedProducts.length > 0 && (
              <div className="text-left border-t border-stone-250 pt-10">
                <h3 className="text-sm font-bold text-stone-950 uppercase tracking-widest mb-6 pb-2 border-b border-stone-100">Related Gear</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedProducts.map(rel => (
                    <div key={rel.id} className="bg-white border border-stone-200 rounded-none p-4 flex gap-4 items-center hover:border-stone-450 transition duration-300">
                      <div className="w-16 h-16 bg-stone-50 border border-stone-100 rounded-none overflow-hidden shrink-0 cursor-pointer" onClick={() => setSelectedProductId(rel.id)}>
                        <img src={rel.imageUrl} alt={rel.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0 text-left">
                        <h4 
                          onClick={() => setSelectedProductId(rel.id)} 
                          className="font-bold text-stone-950 text-xs uppercase tracking-tight truncate hover:text-orange-600 cursor-pointer transition"
                        >
                          {rel.name}
                        </h4>
                        <span className="text-orange-600 font-bold text-xs block mt-1">${rel.price.toFixed(2)}</span>
                        <button 
                          onClick={() => setSelectedProductId(rel.id)} 
                          className="text-[9px] uppercase font-bold tracking-widest text-stone-400 hover:text-orange-600 mt-1 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Real E-Commerce Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-10">
          <div className="space-y-3">
            <span className="text-white font-black text-lg tracking-tighter uppercase italic">Shop<span className="text-orange-600">Wave</span></span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
              Handpicked hardware products designed for modern developers, programmers, and digital outdoor adventurers.
            </p>
          </div>
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Products</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { setStoreView('catalog'); setStoreCategory('Electronics'); }} className="hover:text-white transition">Electronics</button></li>
              <li><button onClick={() => { setStoreView('catalog'); setStoreCategory('Accessories'); }} className="hover:text-white transition">Accessories</button></li>
              <li><button onClick={() => { setStoreView('catalog'); setStoreCategory('Audio'); }} className="hover:text-white transition">Audio</button></li>
              <li><button onClick={() => { setStoreView('catalog'); setStoreCategory('Home & Office'); }} className="hover:text-white transition">Home & Office</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Support</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">Delivery & Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Warranty Cover</a></li>
              <li><a href="#" className="hover:text-white transition">Secured Payments</a></li>
              <li><a href="#" className="hover:text-white transition">Corporate Inquiries</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Stay Tuned</h5>
            <p className="text-xs text-stone-400">Subscribe for custom limited drop notifications.</p>
            <div className="flex border border-stone-700 bg-stone-950 overflow-hidden">
              <input 
                type="email" 
                placeholder="developer@work.com" 
                className="bg-transparent px-3 py-2 text-xs text-white focus:outline-none flex-grow" 
              />
              <button className="px-4 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase">Go</button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-mono text-[11px]">&copy; 2026 ShopWave Inc. Crafted for performance.</p>
          <div className="flex gap-6 font-semibold text-stone-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms & Licensing</a>
          </div>
        </div>
      </footer>

      {/* WAVEBAG SLIDING DRAWER & BACKDROP */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-stone-200 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                  <span className="text-base font-black uppercase tracking-tight text-stone-950 font-sans">
                    WaveBag ({cartCount})
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:bg-stone-100 rounded-none text-stone-500 hover:text-stone-900 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Content list */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 gap-3 text-stone-400">
                    <ShoppingBag className="w-12 h-12 stroke-stone-300" />
                    <span className="text-xs uppercase tracking-widest font-bold">Your WaveBag is empty</span>
                    <button 
                      onClick={() => { setIsCartOpen(false); setStoreView('catalog'); }}
                      className="px-6 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-800 mt-2 transition"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 border border-stone-150 rounded-none relative bg-stone-50">
                      <div className="w-16 h-16 bg-white border border-stone-200 rounded-none overflow-hidden shrink-0">
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow text-left">
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-tight line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-stone-500 uppercase tracking-widest text-[9px] block mt-0.5">
                          {item.product.category}
                        </span>
                        <div className="flex items-center gap-3 mt-2.5">
                          <div className="flex items-center border border-stone-250 bg-white">
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-stone-100 text-stone-650"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-stone-100 text-stone-650"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-stone-400 hover:text-red-600 transition text-[10px] uppercase font-bold flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-between">
                        <span className="font-black text-xs text-stone-950">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total & Checkout Section */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-200 bg-stone-50 text-left space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500">WaveBag Subtotal</span>
                    <span className="text-xl font-black text-stone-950">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-stone-400 font-medium">Shipping calculated at checkout. Express fast dispatch is guaranteed.</p>
                  
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckingOut(true);
                      setCheckoutStep('form');
                    }}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest text-xs py-4 transition shadow-md flex items-center justify-center gap-1.5"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CHECKOUT FLOW DIALOG MODAL */}
      <AnimatePresence>
        {isCheckingOut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckingOut(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-stone-950 max-w-lg w-full p-6 sm:p-8 relative z-10 shadow-2xl text-left"
            >
              <button 
                onClick={() => setIsCheckingOut(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-950 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {checkoutStep === 'form' && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-stone-950">Shipping Details</h3>
                    <p className="text-xs text-stone-500 font-semibold mt-1">Provide your delivery address to complete your order.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-550 block mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({...shippingForm, fullName: e.target.value})}
                        placeholder="Sarah Jenkins" 
                        className="w-full bg-stone-50 border border-stone-250 px-3 py-2.5 text-xs focus:outline-none focus:border-stone-900 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-550 block mb-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
                        placeholder="sarah@adventure.com" 
                        className="w-full bg-stone-50 border border-stone-250 px-3 py-2.5 text-xs focus:outline-none focus:border-stone-900 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-550 block mb-1">Delivery Address</label>
                      <input 
                        required
                        type="text" 
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({...shippingForm, address: e.target.value})}
                        placeholder="1824 Alpine Ridge Trail" 
                        className="w-full bg-stone-50 border border-stone-250 px-3 py-2.5 text-xs focus:outline-none focus:border-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-550 block mb-1">City</label>
                        <input 
                          required
                          type="text" 
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                          placeholder="Boulder" 
                          className="w-full bg-stone-50 border border-stone-250 px-3 py-2.5 text-xs focus:outline-none focus:border-stone-900 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-550 block mb-1">Zip / Postcode</label>
                        <input 
                          required
                          type="text" 
                          value={shippingForm.zip}
                          onChange={(e) => setShippingForm({...shippingForm, zip: e.target.value})}
                          placeholder="80301" 
                          className="w-full bg-stone-50 border border-stone-250 px-3 py-2.5 text-xs focus:outline-none focus:border-stone-900 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block">Total Due</span>
                      <span className="text-lg font-black text-stone-950">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <button 
                      type="submit"
                      className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-widest transition"
                    >
                      Place WaveOrder
                    </button>
                  </div>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto rounded-full">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-stone-950">Order Placed Successfully!</h3>
                    <p className="text-xs text-stone-500 font-semibold mt-1.5 leading-relaxed">
                      Thank you for riding with ShopWave, <strong className="text-stone-900">{shippingForm.fullName}</strong>. We've sent your receipt and tracking info to <strong className="text-stone-900">{shippingForm.email}</strong>.
                    </p>
                  </div>
                  <div className="bg-stone-50 p-4 border border-stone-200 rounded-none text-xs text-stone-600 leading-relaxed font-mono">
                    <p className="font-bold text-stone-900 uppercase tracking-widest text-[10px] mb-2 font-sans border-b border-stone-200 pb-1.5">Simulated Shipment Details</p>
                    <p>Deliver To: {shippingForm.address}, {shippingForm.city}</p>
                    <p>Payment Method: WaveCard Tokenized</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCheckingOut(false);
                      setStoreView('home');
                    }}
                    className="px-10 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest transition"
                  >
                    Continue Exploring
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
