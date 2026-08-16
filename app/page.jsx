"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowRight, Package, Layers, Shirt, Box, ShieldCheck, Sparkles, FileImage, Palette, Upload, Check } from "lucide-react";
import Link from "next/link";
import CartOverlay from '../components/CartOverlay'

import Image from 'next/image';




// Replace these with your actual long/narrow poster image paths
const posterImages = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
];
// --- DUMMY DATA ---
const categories = [
  { name: "3d Posters", desc: "A3 & A4 Museum Quality", icon: Layers, color: "bg-blue-50" },
  { name: "Split posters", desc: "Mix, Match & Save", icon: Package, color: "bg-rose-50" },
  { name: "Car cubes", desc: "cool decoration", icon: Shirt, color: "bg-emerald-50" },
  { name: "Hand drawing", desc: "Custom requested by Artist", icon: Box, color: "bg-amber-50" },
];

const featuredProducts = [
  { id: 1, name: "Neon Tokyo Nights", type: "A3 Poster", price: "$24.00", image: "/featured/floating-car.png" },
  { id: 2, name: "Minimalist Geometry", type: "A4 Poster Bundle", price: "$45.00", image: "/featured/box-enclosed.png" },
  { id: 3, name: "Abstract Waves Tee", type: "Printed Shirt", price: "$35.00", image: "/featured/hand-drawing.png" },
  { id: 4, name: "Stay Wild", type: "3D Wall Sign", price: "$55.00", image: "/featured/broken-decor.jpg" },
];

const heroImages = [
  'printka-hero-img01',
  'printka-hero-img02',
  'printka-hero-img03',
  'printka-hero-img04',
];

// Config for scattering the images in the background
const scatteredImages = [
  { src: heroImages[0], className: "top-[-5%] left-[-5%] w-[40vw] h-[60vh] -rotate-6", delay: 0 },
  { src: heroImages[1], className: "top-[10%] right-[-10%] w-[35vw] h-[50vh] rotate-12", delay: 1 },
  { src: heroImages[2], className: "bottom-[-15%] left-[15%] w-[30vw] h-[45vh] -rotate-12", delay: 2 },
  { src: heroImages[3], className: "bottom-[5%] right-[10%] w-[25vw] h-[40vh] rotate-6", delay: 1.5 },
];

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};



const images = [
  '/hero/hero-p1.jpg',
  '/hero/hero-p2.png',
  '/hero/hero-p5.png',
  '/hero/hero-p4.png',

];

// Framer Motion variants for the sliding animation
const slideVariants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

// 1. Create an array mapping thumbnails to their hero images
const imageData = [
  { id: 1, thumb: "/posters/slider-p1.jpg", hero: "/posters/hero-p1.png" },
  { id: 2, thumb: "/posters/slider-p2.jpg", hero: "/posters/hero-p2.png" },
  { id: 3, thumb: "/posters/slider-p3.jpg", hero: "/posters/hero-p3.png" },
  { id: 4, thumb: "/posters/slider-p4.jpg", hero: "/posters/hero-p4.png" },
  { id: 5, thumb: "/posters/slider-p5.jpg", hero: "/posters/hero-p5.png" },
];


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState('A3');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  // 2. State to track the currently active image ID (defaults to 1)
  const [activeId, setActiveId] = useState(1);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3. Find the hero image URL based on the active ID
  const currentHero = imageData.find((img) => img.id === activeId)?.hero || imageData[0].hero;

  // Auto-play effect: changes the slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);





  // Size specifications & pricing
  const sizes = [
    { id: 'A4', label: 'A4 Size', dimensions: '21 x 29.7 cm (8.3 x 11.7 in)', price: '$49' },
    { id: 'A3', label: 'A3 Size', dimensions: '29.7 x 42 cm (11.7 x 16.5 in)', price: '$79', popular: true },
    { id: 'A2', label: 'A2 Size', dimensions: '42 x 59.4 cm (16.5 x 23.4 in)', price: '$119' },
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-7 w-full z-50  transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6  py-3 flex items-center backdrop-blur-md justify-between border border-slate-200/50 bg-slate-400/20 rounded-full">
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

      {/* HERO SECTION WITH COLLAGE HEARTBEAT BACKGROUND */}
      <section className="relative pt-20 pb-20 lg:pt-36 lg:pb-40 overflow-hidden bg-black flex flex-col items-center justify-center min-h-[90vh]">


        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className=" text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-poppins mb-10">
            SHOP THE <span className="text-yellow-400">ART</span>VIBE
          </motion.h1>


        </div>



        <div className="relative w-[50%] h-[300px] overflow-hidden bg-black flex items-center justify-center">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Hero slide ${currentIndex + 1}`}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full h-full object-contain"
              style={{
                maskImage: `
          linear-gradient(to right, transparent, black 15%, black 85%, transparent),
          linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)
        `,
                maskComposite: 'intersect',
                WebkitMaskImage: `
          linear-gradient(to right, transparent, black 15%, black 85%, transparent),
          linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)
        `,
                WebkitMaskComposite: 'source-in', // Safari fallback for intersect
              }}
            />
          </AnimatePresence>

          {/* Slide Indicators (Dots) */}
          {/* <div className="absolute bottom-4 flex gap-2 z-10">
    {images.map((_, index) => (
      <div
        key={index}
        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
          index === currentIndex ? 'bg-white' : 'bg-white/50'
        }`}
      />
    ))}
  </div> */}
        </div>



        <div className="flex gap-4 mt-8">
          <Link href="/products" className="w-32 sm:w-48 text-center py-3 sm:py-4 rounded-full bg-white text-black cursor-pointer">
            Shop now
          </Link>
          {/* <Link href="/products" className="w-28 sm:w-36 text-center py-3 sm:py-4 rounded-full border-2 border-white text-white hover:bg-[#191970] hover:text-white hover:border-[#191970] transition-colors duration-300 cursor-pointer">
            Bundle
          </Link> */}
        </div>

      </section>


      {/* FEATURED PRODUCTS */}
      <section id="shop" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Trending Now</h2>
              <p className="text-slate-500">Our most sought-after pieces this week.</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-0 w-full px-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-full py-3 bg-white/95 backdrop-blur-sm text-slate-900 rounded-xl font-medium shadow-sm hover:bg-slate-900 hover:text-white transition-colors">
                      Quick Add
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">{product.type}</div>
                  <h3 className="text-lg font-bold text-slate-900 flex justify-between">
                    {product.name}
                    <span>{product.price}</span>
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* CATEGORIES GRID */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-slate-900 px-8 max-w-7xl m-auto block mb-8">Shop by Category</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className={`${cat.color} p-8 rounded-3xl cursor-pointer transition-shadow hover:shadow-xl hover:shadow-slate-200/50`}
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <cat.icon size={24} className="text-slate-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-slate-600 text-sm">{cat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      <section id="bundles" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Outer Box */}
          <div className="relative rounded-4xl bg-blue-950 p-8 sm:p-12 overflow-hidden text-white flex flex-col items-center text-center shadow-xl">

            {/* Subtle Ambient Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            {/* Text Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className=" sm:text-lg tracking-tight text-blue-50 max-w-3xl mb-6 capitalize"
            >
              Shop the custom aesthetic wallpaper for your prestigious wall available in different sizes
            </motion.p>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-md mb-10 hover:scale-105"
            >
              <ShoppingBag size={15} />
              <Link href="/products?category=POSTERS">
                <span>Shop Now</span>
              </Link>
            </motion.button>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-[95%] sm:w-[80%] md:w-[60%] max-w-5xl rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-3">
                {/* TOP ROW: THUMBNAILS */}
                <div className="flex flex-row gap-3 w-full overflow-x-auto hide-scrollbar shrink-0 pb-1">
                  {imageData.map((img) => (
                    <img
                      key={img.id}
                      src={img.thumb}
                      alt={`Thumbnail ${img.id}`}
                      onClick={() => setActiveId(img.id)}
                      // I've added a cursor-pointer and dynamic borders/opacity so the active thumbnail stands out
                      className={`h-16 w-16 sm:h-20 sm:w-20 shrink-0 aspect-square object-cover rounded-md cursor-pointer transition-all duration-200 ${activeId === img.id
                        ? "border-2 border-white opacity-100" // Active state
                        : "border border-white/40 opacity-60 hover:opacity-100" // Inactive state
                        }`}
                    />
                  ))}
                </div>

                {/* BOTTOM: MAIN IMAGE */}
                <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-zinc-900/50 flex items-center justify-center">
                  {/* Framer motion on the image itself adds a nice crossfade effect when switching */}
                  <motion.img
                    key={currentHero} // The key forces React to re-mount the image, triggering the animation
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={currentHero}
                    alt="Custom aesthetic wallpaper preview"
                    className="w-full h-auto object-contain mx-auto"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>




      <section className="relative bg-black max-w-6xl rounded-3xl sm:mx-auto overflow-hidden font-sans mb-20 mx-4">
        {/* 
        Pencilled / Noise Texture Overlay 
        Replace the background image URL with your actual texture asset.
      */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('/textures/pencil-noise.png')", backgroundSize: 'cover' }}
        ></div>

        {/* Minimal Container */}
        <div className="relative max-w-6xl mx-auto bg-zinc-900/40 backdrop-blur-md p-8 sm:p-14 text-zinc-200 border border-zinc-800/60 shadow-2xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Hand-Drawn Image Container */}
            <div className="w-full rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-900 relative group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img
                src="/drawings/hero-p1.PNG"
                alt="Custom hand drawn portrait example"
                className="w-full h-80 sm:h-[480px] object-cover object-center grayscale-[20%] contrast-125 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Optional: Small label indicating it's a sample */}
              <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-300">
                  Sample Sketch
                </span>
              </div>
            </div>

            {/* Information & Call to Action */}
            <div className="flex flex-col justify-center space-y-10">

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 w-fit">
                  <span className="text-zinc-300 text-[10px] tracking-[0.2em] uppercase font-bold">
                    Bespoke Commission
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-zinc-50 leading-tight">
                  Commission a <br />
                  <span className="font-semibold">Hand-Drawn Portrait</span>
                </h2>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                  Turn your hypercar or prized vehicle into a timeless masterpiece. We offer bespoke pencil sketches featuring abstract shading on premium archival paper.
                </p>

                <ul className="space-y-2 mt-4 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                    Available in A4 and A3 dimensions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                    Optional premium framing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                    Custom ambient backlighting upgrades
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href="/products"
                  className="inline-flex justify-center items-center w-full sm:w-auto bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm tracking-wide px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.99]"
                >
                  Order Your Sketch
                </Link>
              </div>

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

      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
