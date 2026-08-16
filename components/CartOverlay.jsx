'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartOverlay({ isOpen, onClose }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from cookies whenever the overlay is opened
  useEffect(() => {
    if (isOpen) {
      const match = document.cookie.match(new RegExp('(^| )cart=([^;]+)'));
      if (match) {
        try {
          const parsedCart = JSON.parse(decodeURIComponent(match[2]));
          setCartItems(parsedCart || []);
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
      
      // Prevent background scrolling when cart is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle removing an item
  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    
    // Update the cookie to reflect the removed item
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(updatedCart))}; path=/; max-age=${7 * 24 * 60 * 60}`;
  };

  // Calculate total price (ensuring price is treated as a number)
  const cartTotal = cartItems.reduce((total, item) => {
    const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : (item.price || 0);
    return total + itemPrice;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Sliding Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full z-[110] bg-studio-950 border-l border-studio-800 flex flex-col w-full md:w-[40vw] xl:w-[35vw] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-studio-800 flex items-center justify-between bg-studio-950/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-amber-500" size={24} />
                <h2 className="text-xl font-medium tracking-wide text-white uppercase">Your Cart</h2>
                <span className="bg-amber-500/10 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest">
                  {cartItems.length} ITEM{cartItems.length !== 1 && 'S'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-studio-900 border border-studio-800 rounded-full text-studio-100 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                  <ShoppingBag size={64} className="text-studio-100/30 mb-2" />
                  <p className="text-lg tracking-widest uppercase font-medium">Your cart is empty</p>
                  <p className="text-xs text-studio-100/60 max-w-[250px]">
                    Looks like you haven't added any automotive art to your collection yet.
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-4 px-6 py-3 rounded-full border border-studio-800 hover:border-amber-500 hover:text-amber-400 text-xs uppercase tracking-widest font-bold transition-all duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${index}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex gap-4 p-4 rounded-2xl bg-studio-900/40 border border-studio-800/60 group"
                      >
                        {/* Item Image */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-studio-950 shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex flex-col justify-between flex-1 py-1">
                          <div>
                            <h3 className="text-sm sm:text-base font-medium text-white line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-amber-500 text-sm mt-1">
                              Rs. {item.price?.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[10px] uppercase tracking-widest text-studio-100/50">
                              Qty: 1
                            </span>
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="text-studio-100/40 hover:text-red-400 transition-colors p-2 -mr-2"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer / Checkout Area */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-studio-800 bg-studio-950">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm tracking-widest uppercase text-studio-100/70">Subtotal</span>
                  <span className="text-2xl font-medium text-white">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    onClose();
                    router.push('/checkout');
                  }}
                  className="w-full py-4 px-6 rounded-full bg-amber-500 hover:bg-amber-400 text-studio-950 text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(217,119,6,0.3)]"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}