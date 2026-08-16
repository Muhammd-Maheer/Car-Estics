'use client';

import Link from 'next/link';
import { ArrowLeft, Truck, RefreshCw, AlertCircle, ShieldCheck, Phone, Mail, Package, CheckCircle2, Clock } from 'lucide-react';

export default function ShippingAndReturnsPage() {
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
            <Truck size={14} />
            Nationwide Delivery Across Pakistan
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Shipping & Returns
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: <span className="font-medium text-slate-700">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-10 leading-relaxed text-sm text-slate-600 mb-10">
          
          {/* Shipping Policy */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Package className="text-amber-500 shrink-0" size={20} />
              1. Processing & Delivery Timelines
            </h2>
            <p className="mb-4">
              Because every Carestics display chamber and custom accessory is handcrafted for precision, we take great care in dispatching your orders securely.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  Crafting & Dispatch
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  1 to 2 Days
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Time taken to prepare, package, and dispatch your order.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  Courier Transit
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  3 to 7 Business Days
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Nationwide shipping across Pakistan once handed over to the courier.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              *Once dispatched, tracking updates will be shared directly with you via WhatsApp so you can monitor your parcel's progress.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Payment Terms */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="text-amber-500 shrink-0" size={20} />
              2. Payment Terms
            </h2>
            <p className="mb-4">
              To confirm and start processing your order, we follow a simple two-step payment structure:
            </p>

            <ul className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>30% Advance Payment:</strong> Required upon order confirmation via WhatsApp to start preparation.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>70% Cash on Delivery (COD):</strong> Paid directly to the courier representative when the parcel arrives at your address.
                </div>
              </li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Damaged Goods & Strict Return Policy */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <RefreshCw className="text-amber-500 shrink-0" size={20} />
              3. Damaged Items & Strict Return Policy
            </h2>
            <p className="mb-4">
              We package every item with extreme precaution. However, if your parcel arrives damaged or defective in transit, please strictly follow the guidelines below to claim a return or refund:
            </p>

            {/* Strict Unboxing Notice Box */}
            <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-950 text-xs leading-relaxed mb-6">
              <div className="flex items-center gap-2 font-bold mb-2 text-rose-900 text-sm">
                <Clock size={18} className="text-rose-600 shrink-0" />
                Mandatory Same-Day Unboxing Verification (24-Hour Limit)
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-rose-900/90">
                <li>You must take clear photos/videos of the damaged item <strong>at the exact moment you open the parcel</strong>.</li>
                <li>You must send us the video/photo evidence on WhatsApp on the <strong>same day the parcel is delivered</strong>.</li>
                <li className="font-bold text-rose-950">After 24 hours of delivery, we strictly do NOT entertain any claims, returns, or refunds for defective or damaged pieces.</li>
              </ul>
            </div>

            {/* Refund Rules */}
            <h3 className="font-bold text-slate-900 text-sm mb-2">Refund Structure</h3>
            <p className="text-xs text-slate-600 mb-3">
              If an item is verified as damaged upon arrival and reported within the 24-hour window:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 pl-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <li><strong>Full Product Price:</strong> 100% of the item's purchase price will be refunded to you.</li>
              <li><strong>Delivery Fees:</strong> Please note that initial shipping/delivery charges are non-refundable under any circumstances.</li>
            </ul>
          </div>

        </div>

        {/* Contact Block */}
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-2">
            Need Immediate Help With a Delivered Item?
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-xl">
            If your parcel has just arrived damaged, record your unboxing video immediately and send it to our WhatsApp support before the 24-hour window expires:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs font-medium">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-amber-400 shrink-0" />
              <a href="https://wa.me/923359528726" target="_blank" rel="noopener noreferrer" className="hover:underline">
                +92 335 9528726 (WhatsApp Support)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-amber-400 shrink-0" />
              <a href="mailto:muhammadmaheer89@gmail.com" className="hover:underline">
                muhammadmaheer89@gmail.com
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