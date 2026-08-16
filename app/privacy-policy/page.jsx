'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Cookie, Truck, Phone, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "August 14, 2026";

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
        
        {/* Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 mb-10 shadow-sm text-center sm:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-4">
            <ShieldCheck size={14} />
            Your Privacy Matters
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: <span className="font-medium text-slate-700">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-10 leading-relaxed text-sm text-slate-600">
          
          {/* Introduction */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>Carestics</strong>. We operate across Pakistan, specializing in premium automotive displays, isolation chambers, and accessories. We value your trust and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and how we handle your data when you visit our store or place an order with us.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Account-Free Experience & Information Collected */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lock size={20} className="text-amber-500 shrink-0" />
              2. Information We Collect
            </h2>
            <p className="mb-4">
              Carestics is designed to be completely account-free. We do not require you to sign up, log in, or create a user profile to shop on our website.
            </p>
            <p className="mb-3">
              When you choose to place an order, we only collect the minimum details necessary to process and ship your package:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700">
              <li><strong>Full Name:</strong> To identify the order recipient.</li>
              <li><strong>Email Address:</strong> For digital communication regarding order details.</li>
              <li><strong>Complete Shipping Address:</strong> To deliver your products accurately to your doorstep anywhere in Pakistan.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Cookies Usage */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Cookie size={20} className="text-amber-500 shrink-0" />
              3. How We Use Cookies
            </h2>
            <p className="mb-3">
              We keep our cookie usage strictly functional and minimal. We use browser cookies for one primary purpose:
            </p>
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 text-amber-900">
              <p className="font-semibold mb-1">Shopping Cart Memory</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                When you add products to your cart, a small cookie is saved in your browser to keep track of your selected items so you don’t lose them while browsing. These cart cookies automatically expire after <strong>3 weeks (21 days)</strong>.
              </p>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              We do not use tracking cookies, advertising networks, or invasive cross-site profiling tools.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Orders & Payments */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Phone size={20} className="text-amber-500 shrink-0" />
              4. WhatsApp Orders & Payment Terms
            </h2>
            <p className="mb-3">
              To keep communication fast and direct, all order requests placed on Carestics redirect you to our official WhatsApp messaging chat.
            </p>
            <p className="mb-3">
              Our payment structure for orders delivered within Pakistan operates as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
              <li><strong>30% Advance Payment:</strong> Required upon order confirmation via WhatsApp to initiate product preparation.</li>
              <li><strong>70% Cash on Delivery (COD):</strong> Paid directly to the courier agent when your package is delivered to your door.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Third-Party Data Sharing */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Truck size={20} className="text-amber-500 shrink-0" />
              5. Third-Party Data Sharing (Couriers)
            </h2>
            <p className="mb-3">
              We respect your privacy and <strong>never sell, trade, or rent</strong> your personal information to marketers or advertisers.
            </p>
            <p>
              We only share your shipping details (Full Name, Address, and Contact Number) with our trusted domestic logistics partners (such as <strong>TCS, Leopard Courier</strong>, or local delivery fleets) strictly for the purpose of dispatching and delivering your package.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Contact Us */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-2">
              6. Have Questions?
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              If you have any questions or concerns regarding your order details or this Privacy Policy, reach out to us directly through our official channels:
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

        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Carestics. All rights reserved. Delivered nationwide across Pakistan.
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