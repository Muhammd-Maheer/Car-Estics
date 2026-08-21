'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Palette,
  Upload,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartOverlay from '../../components/CartOverlay';

const categories = [
  'All',
  'split posters',
  '3d posters',
  'car cubes',
];

export default function ProductsPage() {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [products, setProducts] =
    useState([]);

  // Custom Sketch States
  const [sketchPreview, setSketchPreview] =
    useState(null);

  const [sketchSize, setSketchSize] =
    useState('A4');

  const [sketchFrame, setSketchFrame] =
    useState('No Frame');

  const [sketchLighting, setSketchLighting] =
    useState('None');

  const [
    sketchInstructions,
    setSketchInstructions,
  ] = useState('');

  const [
    showSketchForm,
    setShowSketchForm,
  ] = useState(false);

  const [loading, setLoading] =
    useState(true);

  const [
    activeCategory,
    setActiveCategory,
  ] = useState('All');

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [showToast, setShowToast] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState('');

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter(
          (item) =>
            item.category === activeCategory
        );

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (
    product,
    isBuyNow
  ) => {
    const match = document.cookie.match(
      new RegExp('(^| )cart=([^;]+)')
    );

    let cart = [];

    if (match) {
      try {
        cart = JSON.parse(
          decodeURIComponent(match[2])
        );
      } catch (error) {
        cart = [];
      }
    }

    const cartItem = {
      id: product._id || product.id,
      image: product.image,
      name: product.name,
      price:
        product.discounted_price ||
        product.origional_price,
    };

    cart.push(cartItem);

    document.cookie = `cart=${encodeURIComponent(
      JSON.stringify(cart)
    )}; path=/; max-age=${7 * 24 * 60 * 60}`;

    setToastMessage(
      `${product.name} added to cart!`
    );

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    if (isBuyNow) {
      router.push('/checkout');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          '/api/fetch-products'
        );

        const result =
          await response.json();

        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error(
          'Error fetching products:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getSketchPrice = () => {
    const base =
      sketchSize === 'A3'
        ? 4000
        : 2700;

    const lightPrice =
      sketchLighting !== 'None'
        ? 500
        : 0;

    const framePrice =
      sketchFrame !== 'No Frame'
        ? 1200
        : 0;

    return (
      base +
      lightPrice +
      framePrice
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (sketchPreview) {
        URL.revokeObjectURL(
          sketchPreview
        );
      }

      setSketchPreview(
        URL.createObjectURL(file)
      );
    }
  };

  const removeSketchPreview = () => {
    if (sketchPreview) {
      URL.revokeObjectURL(
        sketchPreview
      );
    }

    setSketchPreview(null);
  };

  const handleSketchWhatsAppOrder = () => {
    if (!sketchPreview) {
      alert(
        'Please upload a car image first.'
      );
      return;
    }

    const message =
      `*CUSTOM HAND-DRAWN SKETCH ORDER*\n` +
      `-------------------------\n` +
      `*Size:* ${sketchSize}\n` +
      `*Frame:* ${sketchFrame}\n` +
      `*Lighting:* ${sketchLighting}\n` +
      `*Instructions:* ${
        sketchInstructions ||
        'No special instructions'
      }\n` +
      `*Estimated Price:* Rs. ${getSketchPrice().toLocaleString()}\n` +
      `-------------------------\n` +
      `*Note:* I will attach my car image in this chat now!`;

    const whatsappUrl =
      `https://wa.me/923359528726?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <main className="relative min-h-screen bg-studio-950 text-studio-100 selection:bg-amber-500/20 selection:text-amber-400 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-600/10 rounded-full blur-[120px] z-0 pointer-events-none" />

      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-studio-900/20 rounded-full blur-[150px] z-0 pointer-events-none" />

      {/* NAVBAR */}
      <nav className="fixed top-4 sm:top-7 w-full z-50  transition-all duration-300">
        <div className="max-w-5xl mx-auto px-3  py-2 sm:py-3 flex items-center backdrop-blur-md justify-between border border-slate-200/50 bg-slate-400/20 rounded-full">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl text-white tracking-tighter">
              CAR<span className="text-yellow-400">ESTICS</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <Link href="/products" className="hover:text-indigo-600 transition-colors">3d Posters</Link>
              <Link href="/products" className="hover:text-indigo-600 transition-colors">Car cubes</Link>
              <Link href="/products" className="hover:text-indigo-600 transition-colors">Split posters</Link>

            </div>
          </div>
          <div className="flex items-center gap-4">

            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full"></span>
            </button>
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {["Posters", "Bundles", "Apparel", "3D Signs"].map((item) => (
                  <Link key={item} href="#" className="text-lg font-medium text-slate-800 border-b border-slate-100 pb-2">
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MAIN CONTENT */}
      <section className="relative z-10 pt-24 pb-12 px-3 sm:pt-40 sm:pb-20 sm:px-6 max-w-7xl mx-auto">

        {/* CUSTOM SKETCH */}
        {!showSketchForm ? (
          <div className="flex justify-center mb-20">
            <button
              onClick={() =>
                setShowSketchForm(true)
              }
              className="group relative px-8 py-5 sm:px-12 sm:py-6 rounded-full bg-amber-500 hover:bg-amber-400 text-studio-950 text-xs sm:text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_0_40px_rgba(217,119,6,0.3)] hover:shadow-[0_0_60px_rgba(217,119,6,0.5)] flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />

              <span className="relative z-10 flex items-center gap-3">
                <Palette size={20} />
                Order Your Custom Sketch
              </span>
            </button>
          </div>
        ) : (
          <div className="relative mb-20 p-6 sm:p-10 rounded-3xl overflow-hidden border border-studio-800/80 bg-gradient-to-br from-studio-900/90 via-studio-950/80 to-black backdrop-blur-xl shadow-2xl">

            <button
              onClick={() =>
                setShowSketchForm(false)
              }
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 rounded-full bg-studio-950/80 border border-studio-800 text-studio-100/70 hover:text-amber-400 hover:border-amber-500/50 flex items-center justify-center transition-all duration-200"
            >
              <X size={18} />
            </button>

            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 mt-6 sm:mt-0">

              {/* UPLOAD */}
              <div className="lg:w-5/12 flex flex-col">

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 w-fit">
                  <Palette
                    size={14}
                    className="text-amber-400"
                  />

                  <span className="text-amber-400 text-[10px] tracking-[0.2em] uppercase font-bold">
                    Bespoke Commission
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-medium text-white mb-2 tracking-tight">
                  Custom Hand-Drawn Sketch
                </h1>

                <p className="text-sm text-studio-100/60 leading-relaxed mb-6">
                  Turn your car into a masterpiece.
                  Abstract pencil shades on premium
                  archival paper.
                  <strong className="text-amber-500/90">
                    {' '}
                    Car images only. No colors included.
                  </strong>
                </p>

                <div className="flex-1 min-h-[250px] relative rounded-2xl border-2 border-dashed border-studio-700 hover:border-amber-500/50 bg-studio-950/50 flex flex-col items-center justify-center overflow-hidden transition-all group">

                  {sketchPreview ? (
                    <>
                      <img
                        src={sketchPreview}
                        alt="Uploaded car preview"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-50 transition-opacity"
                      />

                      <button
                        onClick={
                          removeSketchPreview
                        }
                        className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-red-500 transition-colors backdrop-blur-md"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-6 pointer-events-none flex flex-col items-center">

                      <div className="w-16 h-16 rounded-full bg-studio-800 flex items-center justify-center mb-4 text-studio-400 group-hover:text-amber-400 transition-colors">
                        <Upload size={24} />
                      </div>

                      <span className="text-sm font-medium text-studio-200">
                        Upload your car image
                      </span>

                      <span className="text-xs text-studio-500 mt-2">
                        JPEG, PNG up to 10MB
                      </span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageUpload
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* OPTIONS */}
              <div className="lg:w-7/12 flex flex-col justify-between bg-studio-950/40 p-6 sm:p-8 rounded-2xl border border-studio-800/50">

                <div className="space-y-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-studio-100/60 block mb-3 font-bold">
                        Paper Size
                      </label>

                      <div className="flex gap-3">
                        {[
                          'A4',
                          'A3',
                        ].map((size) => (
                          <button
                            key={size}
                            onClick={() =>
                              setSketchSize(size)
                            }
                            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                              sketchSize === size
                                ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                                : 'bg-studio-900 border-studio-800 text-studio-400 hover:border-studio-600'
                            }`}
                          >
                            {size}

                            <span className="block text-[10px] font-normal mt-1 opacity-70">
                              {size === 'A4'
                                ? '2.7k PKR'
                                : '4k PKR'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-studio-100/60 block mb-3 font-bold">
                        Framing
                      </label>

                      <div className="flex gap-3">
                        {[
                          'No Frame',
                          'Framed',
                        ].map((opt) => (
                          <button
                            key={opt}
                            onClick={() =>
                              setSketchFrame(opt)
                            }
                            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                              sketchFrame === opt
                                ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                                : 'bg-studio-900 border-studio-800 text-studio-400 hover:border-studio-600'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-studio-100/60 block mb-3 font-bold">
                      Ambient Lighting (+500 PKR)
                    </label>

                    <div className="flex flex-wrap sm:flex-nowrap gap-3">
                      {[
                        'None',
                        'Back lights',
                        'Top lights',
                      ].map((light) => (
                        <button
                          key={light}
                          onClick={() =>
                            setSketchLighting(
                              light
                            )
                          }
                          className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                            sketchLighting === light
                              ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                              : 'bg-studio-900 border-studio-800 text-studio-400 hover:border-studio-600'
                          }`}
                        >
                          {light}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-studio-100/60 block mb-3 font-bold">
                      Special Instructions
                    </label>

                    <textarea
                      value={
                        sketchInstructions
                      }
                      onChange={(e) =>
                        setSketchInstructions(
                          e.target.value
                        )
                      }
                      placeholder="E.g. Focus on the aggressive front grille, make the wheels pop, etc."
                      className="w-full bg-studio-900 border border-studio-800 rounded-xl p-4 text-sm text-studio-100 placeholder:text-studio-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none h-24"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-studio-800 flex flex-col sm:flex-row items-center justify-between gap-4">

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-studio-100/50 block mb-1">
                      Estimated Price
                    </span>

                    <span className="text-3xl font-light text-white">
                      Rs.{' '}
                      {getSketchPrice().toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={
                      handleSketchWhatsAppOrder
                    }
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-studio-950 text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] flex items-center justify-center gap-2"
                  >
                    Order on WhatsApp

                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY FILTERS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.2,
          }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16 p-2 backdrop-blur-md bg-studio-900/40 rounded-full border border-studio-800/50 w-fit mx-auto shadow-2xl"
        >
          {categories.map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeCategory ===
                  category
                    ? 'bg-amber-500 text-studio-950 font-bold shadow-[0_0_20px_rgba(217,119,6,0.4)]'
                    : 'text-studio-100/70 hover:text-amber-400 hover:bg-studio-800/50'
                }`}
              >
                {category}
              </button>
            )
          )}
        </motion.div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">

          {loading ? (
            <div className="col-span-full flex justify-center py-20 text-amber-500 animate-pulse text-sm uppercase tracking-widest">
              Loading Collection...
            </div>
          ) : (
            <AnimatePresence>
              {filteredProducts.map(
                (product) => (
                  <motion.div
                    key={
                      product._id ||
                      product.id
                    }
                    onClick={() =>
                      setSelectedProduct(
                        product
                      )
                    }
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                    whileHover={{
                      scale: 1.04,
                      y: -5,
                    }}
                    className="group cursor-pointer flex flex-col bg-studio-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-studio-800/80 hover:border-amber-500/50 transition-all duration-150"
                  >
                    {/* OPTIMIZED PRODUCT IMAGE */}
                    <div className="relative w-full h-40 sm:h-64 lg:h-[20rem] overflow-hidden bg-studio-950 flex items-center justify-center p-2">

                      {product.image ? (
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={
                              product.image
                            }
                            alt={
                              product.name ||
                              'Car product'
                            }
                            fill
                            quality={85}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain p-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-studio-500 text-sm">
                          No image available
                        </div>
                      )}

                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-studio-950 via-studio-900/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-studio-950/80 backdrop-blur-md border border-studio-800 px-2 py-1 sm:px-4 sm:py-1.5 rounded-full">
                        <span className="text-[10px] sm:text-sm font-medium text-studio-100">
                          {product.discounted_price
                            ? `Rs. ${product.discounted_price}`
                            : `Rs. ${product.origional_price}`}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 sm:p-5 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-transparent to-studio-950/50">

                      <span className="text-[8px] sm:text-[10px] text-amber-500 font-bold tracking-[0.2em] uppercase mb-1 sm:mb-3">
                        {product.category}
                      </span>

                      <h3 className="text-sm sm:text-xl tracking-wide font-medium text-studio-100 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="mt-auto pt-3 sm:pt-6 flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-500 flex items-center gap-1 sm:gap-2">
                          Explore

                          <span className="text-sm sm:text-lg leading-none">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={closeModal}
              className="fixed inset-0 bg-studio-950/90 backdrop-blur-md"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.3,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-studio-900 border border-studio-800 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row my-auto shrink-0"
            >

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60] w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-amber-400 hover:border-amber-500/50 hover:bg-black/90 flex items-center justify-center transition-all duration-200 shadow-xl"
                aria-label="Close product"
              >
                ✕
              </button>

              {/* OPTIMIZED MODAL IMAGE */}
              <div className="lg:w-1/2 relative h-[250px] sm:h-[350px] lg:h-auto lg:min-h-[500px] bg-studio-950 shrink-0">

                {selectedProduct.image ? (
                  <Image
                    src={
                      selectedProduct.image
                    }
                    alt={
                      selectedProduct.name ||
                      'Selected product'
                    }
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-2 lg:p-4"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-studio-500">
                    No image available
                  </div>
                )}

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-studio-950/90 via-transparent to-transparent lg:hidden" />
              </div>

              {/* PRODUCT DETAILS */}
              <div className="lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-between bg-black">

                <div>
                  <span className="text-[10px] sm:text-xs text-amber-500 font-bold tracking-[0.25em] uppercase mb-2 block">
                    {
                      selectedProduct.category
                    }
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-2 sm:mb-4">
                    {selectedProduct.name}
                  </h2>

                  <div className="flex items-center gap-3 mb-4 sm:mb-6">

                    <span className="text-lg sm:text-2xl font-light text-amber-400">
                      {selectedProduct.discounted_price
                        ? `Rs. ${selectedProduct.discounted_price.toLocaleString()}`
                        : `Rs. ${selectedProduct.origional_price}`}
                    </span>

                    {selectedProduct.discounted_price &&
                      selectedProduct.origional_price && (
                        <span className="text-sm text-studio-100/40 line-through">
                          Rs.{' '}
                          {selectedProduct.origional_price?.toLocaleString()}
                        </span>
                      )}
                  </div>

                  <p className="text-studio-100/70 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                    {
                      selectedProduct.description
                    }
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-studio-800 mt-2 sm:mt-0">

                  <button
                    onClick={() =>
                      handleAddToCart(
                        selectedProduct,
                        false
                      )
                    }
                    className="flex-1 py-3.5 sm:py-4 px-4 sm:px-6 rounded-full border border-amber-500/50 hover:border-amber-500 text-amber-400 hover:bg-amber-500/10 text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-200 text-center"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      handleAddToCart(
                        selectedProduct,
                        true
                      )
                    }
                    className="flex-1 py-3.5 sm:py-4 px-4 sm:px-6 rounded-full bg-amber-500 hover:bg-amber-400 text-studio-950 text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-200 text-center shadow-[0_0_20px_rgba(217,119,6,0.3)]"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              x: '-50%',
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: '-50%',
            }}
            exit={{
              opacity: 0,
              y: 20,
              x: '-50%',
            }}
            className="fixed bottom-6 left-1/2 z-[100] w-[90%] sm:w-auto max-w-sm flex items-center justify-center gap-3 bg-studio-900 border border-amber-500/50 text-studio-100 px-6 py-3 rounded-full shadow-[0_10px_40px_-10px_rgba(217,119,6,0.3)]"
          >
            <Check
              size={18}
              className="text-amber-500 shrink-0"
            />

            <span className="text-sm font-medium tracking-wide truncate">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-neutral-950 text-neutral-400 pt-20 pb-10 border-t border-neutral-800">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            <div className="col-span-1 md:col-span-2">

              <Link
                href="/"
                className="text-2xl font-black tracking-tighter mb-4 block text-white"
              >
                CAR
                <span className="text-yellow-400">
                  ESTICS
                </span>
              </Link>

              <p className="text-neutral-400 max-w-md mb-6">
                Premium A3 & A4 posters,
                custom hand-drawn sketches,
                and automotive decor designed to
                make your space truly yours.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">
                Shop
              </h4>

              <ul className="space-y-4 text-neutral-400">

                <li>
                  <Link
                    href="/products"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    A4 Posters
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Custom Bundles
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Hand Drawings
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    3D Posters
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">
                Support
              </h4>

              <ul className="space-y-4 text-neutral-400">

                <li>
                  <Link
                    href="/shipping-and-returns"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Shipping & Returns
                  </Link>
                </li>

                <li>
                  <a
                    href={`https://wa.me/923359528726?text=${encodeURIComponent(
                      'Hello! I need some help regarding my order.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">

            <p>
              © {new Date().getFullYear()}{' '}
              CARESTICS. All rights reserved.
            </p>

            <div className="flex gap-6">

              <Link
                href="/privacy-policy"
                className="hover:text-neutral-300 transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/about"
                className="hover:text-neutral-300 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <CartOverlay
        isOpen={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
      />
    </main>
  );
}