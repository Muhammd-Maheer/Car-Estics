'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles, ShieldCheck, Heart, Award, Mail, Phone, Hammer } from 'lucide-react';

// Custom SVG for Instagram
function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

// Custom SVG for TikTok
function TikTokIcon({ size = 20, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.121 6.39 6.39 0 0 0 1.578 8.928 6.335 6.335 0 0 0 7.28 0A6.388 6.388 0 0 0 15.82 15.2V8.342a8.211 8.211 0 0 0 4.77 1.838V6.71a4.79 4.79 0 0 1-1.001-.024z"/>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-0">
      
      {/* Sticky Navigation Header */}
      <nav className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-0">
          CAR<span className="text-amber-500">ESTICS</span>
        </Link>
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-slate-600 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Store
        </Link>
      </nav>

      {/* Main Container */}
      <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        
        {/* Header Hero Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 mb-10 shadow-sm text-center sm:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-4">
            <Sparkles size={14} />
            Driven By Precision
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            About Carestics
          </h1>
          <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
            Handcrafting high-end, bespoke display chambers and elite accessories tailored specifically for hypercar collectors and automotive enthusiasts.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-10 leading-relaxed text-sm text-slate-600 mb-10">
          
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Award className="text-amber-500 shrink-0" size={20} />
              Our Mission & Craftsmanship
            </h2>
            <p className="mb-4">
              At <strong>Carestics</strong>, hypercars are more than vehicles—they are masterpieces of human engineering and design. We exist to provide the isolation and presentation these extraordinary machines deserve.
            </p>
            <p>
              Every chamber and custom accessory in our catalog is meticulously handcrafted with uncompromising attention to detail. By controlling every step of the artisan process, we ensure museum-grade optical clarity, seamless ambient lighting, and complete protection against dust and micro-fluctuations.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <Hammer className="text-amber-500 mb-2" size={24} />
              <h3 className="font-bold text-slate-900 text-sm mb-1">Bespoke Handcrafted</h3>
              <p className="text-xs text-slate-500">
                Carefully crafted by hand to meet the exact standards required for elite hypercar displays.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="text-amber-500 mb-2" size={24} />
              <h3 className="font-bold text-slate-900 text-sm mb-1">Hypercar Isolation</h3>
              <p className="text-xs text-slate-500">
                Climate-conscious enclosures designed to shield automotive finishes from dust and static.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <Heart className="text-amber-500 mb-2" size={24} />
              <h3 className="font-bold text-slate-900 text-sm mb-1">Nationwide Delivery</h3>
              <p className="text-xs text-slate-500">
                Safely delivered across Pakistan with personalized customer service and direct WhatsApp order handling.
              </p>
            </div>
          </div>

        </div>

        {/* Social Media & Community Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm mb-10">
          <div className="text-center sm:text-left mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Join Our Community
            </h2>
            <p className="text-xs text-slate-500">
              Follow our handcrafting process, behind-the-scenes builds, and hypercar showcases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Instagram Account 1 */}
            <a 
              href="https://instagram.com/YOUR_INSTAGRAM_1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <InstagramIcon size={20} />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Instagram</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors truncate block">
                  @carestics_official
                </span>
              </div>
            </a>

            {/* Instagram Account 2 */}
            <a 
              href="https://instagram.com/YOUR_INSTAGRAM_2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <InstagramIcon size={20} />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Instagram (Studio)</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors truncate block">
                  @carestics_studio
                </span>
              </div>
            </a>

            {/* TikTok Account */}
            <a 
              href="https://tiktok.com/@YOUR_TIKTOK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-900 hover:text-white hover:border-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-sm">
                <TikTokIcon size={18} />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 group-hover:text-slate-300 block">TikTok</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-white transition-colors truncate block">
                  @carestics
                </span>
              </div>
            </a>

          </div>
        </div>

        {/* Contact Block */}
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-2">
            Get In Touch
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-xl">
            Interested in a custom dimensions build or have questions about our handcrafting timeline? Speak to us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs font-medium">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-amber-400 shrink-0" />
              <a href="mailto:muhammadmaheer89@gmail.com" className="hover:underline">
                muhammadmaheer89@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-amber-400 shrink-0" />
              <a href="https://wa.me/923359528726" target="_blank" rel="noopener noreferrer" className="hover:underline">
                +92 335 9528726 (WhatsApp)
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Carestics. All rights reserved.
          </p>
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