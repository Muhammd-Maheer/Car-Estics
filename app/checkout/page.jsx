'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Helper function to update the cookie across the app
const saveCartToCookie = (updatedProducts) => {
  const cookieData = updatedProducts.map(p => ({
    id: p._id || p.id,
    image: p.image,
    name: p.name,
    price: p.discounted_price || p.origional_price,
    quantity: p.quantity
  }));
  document.cookie = `cart=${encodeURIComponent(JSON.stringify(cookieData))}; path=/; max-age=${7 * 24 * 60 * 60}`;
};

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    notes: ''
  });

  const [products, setProducts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchCartData = async () => {
      // 1. Read cart items from cookie
      const match = document.cookie.match(new RegExp('(^| )cart=([^;]+)'));
      let cookieCart = [];
      if (match) {
        try {
          cookieCart = JSON.parse(decodeURIComponent(match[2]));
        } catch (e) {
          cookieCart = [];
        }
      }

      if (cookieCart.length === 0) {
        setProducts([]);
        return;
      }

      // 2. Aggregate quantities (in case user clicked "Add" multiple times on the same item)
      const quantityMap = {};
      cookieCart.forEach(item => {
        const id = item.id || item._id;
        quantityMap[id] = (quantityMap[id] || 0) + (item.quantity || 1);
      });

      const productIds = Object.keys(quantityMap);

      // 3. Fetch fresh product data from MongoDB
      try {
        const response = await fetch('/api/fetch-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Merge database product data with the user's quantities
          const enrichedProducts = result.data.map(dbItem => ({
            ...dbItem,
            id: dbItem._id, // Ensure id is accessible
            quantity: quantityMap[dbItem._id] || 1
          }));
          
          setProducts(enrichedProducts);
          // Sync corrected quantities back to cookie
          saveCartToCookie(enrichedProducts); 
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getStockLimit = (item) => {
    const limit = item.pieces ?? item.stock ?? Infinity;
    return Number(limit);
  };

  const handleIncrement = (id) => {
    setProducts((prev) => {
      const updated = prev.map((item) => {
        const itemId = item._id || item.id;
        const stockLimit = getStockLimit(item);
        
        if (itemId === id && item.quantity < stockLimit) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      saveCartToCookie(updated);
      return updated;
    });
  };

  const handleDecrement = (id) => {
    setProducts((prev) => {
      const updated = prev.map((item) => {
        const itemId = item._id || item.id;
        if (itemId === id) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      });
      saveCartToCookie(updated);
      return updated;
    });
  };

  const handleDelete = (id) => {
    setProducts((prev) => {
      const updated = prev.filter((item) => (item._id || item.id) !== id);
      saveCartToCookie(updated);
      return updated;
    });
  };

  const grandTotal = products.reduce((acc, item) => {
    const price = item.discounted_price || item.origional_price || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();

    if (products.length === 0) {
      alert('Your cart is empty. Please add items to proceed.');
      return;
    }

    if (!formData.name || !formData.email || !formData.address) {
      alert('Please fill in all required fields.');
      return;
    }

    const whatsappNumber = '923359528726';

    const itemDetails = products
      .map((p) => {
        const price = p.discounted_price || p.origional_price || 0;
        return `• ${p.name} (Qty: ${p.quantity}) - Rs. ${price * p.quantity}`;
      })
      .join('\n');

    const message =
      `*NEW ORDER REQUEST*\n` +
      `-------------------------\n` +
      `*ORDERED ITEMS:*\n${itemDetails}\n\n` +
      `*GRAND TOTAL:* Rs. ${grandTotal.toLocaleString()}\n` +
      `-------------------------\n` +
      `*CUSTOMER DETAILS:*\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Shipping Address:* ${formData.address}\n` +
      (formData.notes ? `*Notes:* ${formData.notes}\n` : '') +
      `-------------------------\n` +
      `Please confirm my order and share payment details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-0">
      
      <nav className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          CAR<span className="text-amber-500">ESTICS</span>
        </Link>
        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Secure Checkout
        </span>
      </nav>

      <section className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Complete Your Order
          </h1>
          <p className="text-sm text-slate-600">
            Review your selected products and fill in your delivery details below.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              Delivery Information
            </h2>
            <form onSubmit={handleWhatsAppOrder} className="space-y-6">
              
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Complete Shipping Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  placeholder="House/Apartment #, Street, City, Postal Code"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm resize-none"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Order Notes <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  placeholder="Special instructions or customization details"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={products.length === 0}
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-3 mt-4"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Order on WhatsApp
              </button>

            </form>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6 w-full">
            
            <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-3">
                  How WhatsApp Checkout Works
                </h2>
                <ul className="text-xs text-slate-600 space-y-3 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <span>Fill in your contact and delivery address details.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <span>Click <strong>Order on WhatsApp</strong> to launch a direct chat with us.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-center flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Support
                </span>
                <p className="text-xs font-bold text-slate-800">
                  +92 335 9528726
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
              <h2 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
                Order Items ({products.length})
              </h2>

              {products.length > 0 ? (
                <>
                  <div className="divide-y divide-slate-100">
                    {products.map((item) => {
                      const itemId = item._id || item.id;
                      const origPrice = item.origional_price || 0;
                      const discPrice = item.discounted_price || origPrice;
                      const discountPercent = origPrice > 0 && discPrice < origPrice
                        ? Math.round(((origPrice - discPrice) / origPrice) * 100)
                        : 0;
                      
                      const stockLimit = getStockLimit(item);

                      return (
                        <div key={itemId} className="py-4 first:pt-0 last:pb-0">
                          
                          <div className="flex gap-3 mb-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                              <img
                                src={item.image || '/hero/hero-p1.jpg'}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <span className="text-[9px] text-amber-500 font-bold tracking-widest uppercase">
                                {item.category}
                              </span>
                              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                                {item.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-sm font-extrabold text-amber-500">
                              Rs. {discPrice.toLocaleString()}
                            </span>
                            {discountPercent > 0 && (
                              <>
                                <span className="text-[10px] text-slate-400 line-through font-medium">
                                  Rs. {origPrice.toLocaleString()}
                                </span>
                                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded uppercase tracking-wider">
                                  {discountPercent}% OFF
                                </span>
                              </>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                              Quantity
                            </span>
                            
                            <div className="flex items-center gap-2">
                              <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200">
                                <button
                                  type="button"
                                  onClick={() => handleDecrement(itemId)}
                                  disabled={item.quantity <= 1}
                                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent rounded-l-lg transition-colors"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                                </button>
                                <span className="w-7 text-center text-xs font-bold text-slate-900">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleIncrement(itemId)}
                                  disabled={item.quantity >= stockLimit}
                                  className={`w-7 h-7 flex items-center justify-center rounded-r-lg transition-colors ${
                                    item.quantity >= stockLimit
                                      ? 'text-slate-300 cursor-not-allowed opacity-50'
                                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                  }`}
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDelete(itemId)}
                                title="Remove item"
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {item.quantity >= stockLimit && stockLimit !== Infinity && (
                            <div className="mt-1 text-[10px] text-amber-600 font-medium text-right w-full">
                              Maximum stock reached
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-slate-200">
                    <span className="text-sm font-bold text-slate-900">Sum Total</span>
                    <span className="text-2xl font-black text-slate-900">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500 mb-3">Your cart is empty.</p>
                  <Link href="/products" className="text-xs font-bold text-amber-500 hover:text-amber-600 uppercase tracking-widest">
                    &larr; Return to Store
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>


      

      <footer className="bg-neutral-950 text-neutral-400 pt-20 pb-10 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* Brand Info & Socials */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="text-2xl font-black tracking-tighter mb-4 block text-white">
                CAR<span className="text-yellow-400">ESTICS</span>
              </Link>
              <p className="text-neutral-400 max-w-md mb-6">
                Premium A3 & A4 posters, printed apparel, and revolutionary 3D wall signs to make your space and style truly yours.
              </p>

              {/* Social Icons (Pure Inline SVGs) */}
              <div className="flex gap-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-yellow-400 hover:text-white hover:border-yellow-400 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-yellow-400 hover:text-white hover:border-yellow-600 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.65a7 7 0 1 0 8.84 6.78V9.39a8.16 8.16 0 0 0 4.27 1.18V7.12a4.83 4.83 0 0 1-3-0.43z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-yellow-400 hover:text-white hover:border-yellow-400 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-bold text-white mb-6">Shop</h4>
              <ul className="space-y-4 text-neutral-400">
                <li><Link href="/products" className="hover:text-indigo-400 transition-colors">A4 Posters</Link></li>
                <li><Link href="/products" className="hover:text-indigo-400 transition-colors">Custom Bundles</Link></li>
                <li><Link href="/products" className="hover:text-indigo-400 transition-colors">Hand drawings</Link></li>
                <li><Link href="/products" className="hover:text-indigo-400 transition-colors">3D Posters</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-bold text-white mb-6">Support</h4>
              <ul className="space-y-4 text-neutral-400">
                <li><Link href="shipping-and-returns" className="hover:text-indigo-400 transition-colors">Shipping & Returns</Link></li>
                {/* <li><Link href="#" className="hover:text-indigo-400 transition-colors">FAQ</Link></li> */}
             <li>
  <a 
    href={`https://wa.me/923359528726?text=${encodeURIComponent("Hello! I need some help regarding my order.")}`} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:text-indigo-400 transition-colors"
  >
    Contact Us
  </a>
</li>
                {/* <li><Link href="#" className="hover:text-indigo-400 transition-colors">Track Order</Link></li> */}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} ArtVibe. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
              <Link href="/about" className="hover:text-neutral-300 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}