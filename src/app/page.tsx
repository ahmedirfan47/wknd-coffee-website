import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import { MapPin, Clock, ArrowRight, Coffee, Star, Instagram } from 'lucide-react';

export const dynamic = 'force-dynamic';

function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    db.category.findMany({ where: { isActive: true }, orderBy: { position: 'asc' }, take: 8 }),
    db.product.findMany({
      where:   { isFeatured: true, isAvailable: true },
      include: { category: true },
      take:    8,
    }),
  ]).catch(() => [[], []]) as any;

  const menuSections = [
    { emoji: '☕', label: 'Coffee',        slug: 'coffee',        bg: 'bg-wknd-brown text-cream'   },
    { emoji: '🍵', label: 'Matcha Mood',   slug: 'matcha-mood',   bg: 'bg-pink-600 text-cream'     },
    { emoji: '⭐', label: 'WKND Specials', slug: 'wknd-specials', bg: 'bg-charcoal text-cream'     },
    { emoji: '🧊', label: 'Frappe Club',   slug: 'frappe-club',   bg: 'bg-wknd-pink text-charcoal' },
    { emoji: '🥤', label: 'Soft-Sips',    slug: 'soft-sips',     bg: 'bg-cream-200 text-charcoal' },
    { emoji: '🥪', label: 'Toasty Treats',slug: 'toasty-treats', bg: 'bg-pistachio-100 text-charcoal' },
    { emoji: '🍰', label: 'Desserts',      slug: 'desserts',      bg: 'bg-pistachio-200 text-charcoal' },
  ];

  return (
    <div className="overflow-x-hidden">

      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1920"
            alt="WKND Coffee DHA Raya Lahore"
            fill priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        </div>

        <div className="container-px relative mx-auto max-w-7xl w-full pt-28 pb-24">
          <div className="max-w-3xl">

            {/* Location badge */}
            <div className="animate-fade-in delay-100">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/80 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
                Plaza 92, DHA Raya, Lahore · ODK Café 🇮🇹
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] text-cream sm:text-6xl lg:text-[78px] animate-fade-in-up delay-200">
              What&apos;s
              <br />
              <span className="text-pink-400">better</span> than
              <br />
              a weekend?
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70 animate-fade-in-up delay-300">
              Coffee · Matcha · Sandwiches · Desserts
              <br />
              <span className="text-sm text-cream/50">In-store 9am–11pm &nbsp;·&nbsp; FoodPanda & pick-up till 1am</span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <Link href="/menu" className="btn-primary text-base py-4 px-8">
                Order Online <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/message/DAINOCZIHB3UK1" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-cream/40 px-8 py-4 text-base font-semibold text-cream hover:bg-cream/10 transition-all">
                WhatsApp Us
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 animate-fade-in delay-600">
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                <span className="text-xs text-cream/60 ml-1">Highly rated in DHA Raya</span>
              </div>
              <div className="h-4 w-px bg-cream/20 hidden sm:block" />
              <span className="text-xs text-cream/60"><strong className="text-cream">52+</strong> menu items</span>
              <div className="h-4 w-px bg-cream/20 hidden sm:block" />
              <span className="text-xs text-cream/60">Verified <strong className="text-cream">@wkndcoffeeraya</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INFO STRIP ══════════════════════════════════ */}
      <section className="bg-charcoal border-t border-white/5">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: MapPin, label: 'Location',            value: 'Plaza 92, DHA Raya, Lahore' },
              { icon: Clock,  label: 'In-Store',            value: '9:00 AM – 11:00 PM'         },
              { icon: Clock,  label: 'FoodPanda & Pick-Up', value: 'Open till 1:00 AM'           },
              { icon: Coffee, label: 'We Are',              value: "Lahore's only ODK café 🇮🇹"  },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-5 group">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-pink-600/20 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300">
                  <Icon className="h-4 w-4 text-pink-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-cream/40 font-semibold">{label}</p>
                  <p className="text-xs font-medium text-cream/80 mt-0.5 leading-snug">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MENU CATEGORIES ═════════════════════════════ */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="section-eyebrow">The Menu</span>
            <h2 className="section-heading">Sip. Eat.<br />Repeat.</h2>
          </div>
          <Link href="/menu" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-pink-600 transition-colors group">
            Full Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {menuSections.map((s, i) => (
            <Link key={s.slug} href={`/menu?category=${s.slug}`}
              className={`group relative overflow-hidden rounded-3xl p-5 min-h-[130px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-hover ${s.bg}`}
              style={{ animationDelay: `${i * 60}ms` }}>
              <span className="text-3xl">{s.emoji}</span>
              <div>
                <p className="font-display font-bold text-base leading-tight">{s.label}</p>
                <div className="mt-2 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-medium">View</span>
                  <ChevronRightIcon />
                </div>
              </div>
            </Link>
          ))}

          <Link href="/menu" className="group rounded-3xl bg-pink-600 p-5 min-h-[130px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-hover text-cream">
            <Coffee className="h-7 w-7" strokeWidth={1.5} />
            <div>
              <p className="font-display font-bold text-lg leading-tight">Order Online →</p>
              <p className="text-xs mt-1 text-cream/70">Delivery & pick-up</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══ FEATURED / WKND SPECIALS ════════════════════ */}
      {(featured as any[]).length > 0 && (
        <section className="bg-wknd-brown py-20">
          <div className="container-px mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="section-eyebrow" style={{ color: '#A4C39E' }}>Must Try</span>
                <h2 className="section-heading text-cream">Signatures<br />&amp; Bestsellers</h2>
              </div>
              <Link href="/menu?category=wknd-specials" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-pink-300 hover:text-pink-200 transition-colors group">
                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {(featured as any[]).map((p: any, i: number) => (
                <div key={p.id} style={{ animationDelay: `${i * 60}ms` }}>
                  <ProductCard product={{ ...p, compareAtPrice: p.compareAtPrice ?? null }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ABOUT TEASER ════════════════════════════════ */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative h-[480px]">
            <div className="absolute left-0 top-0 h-64 w-[58%] overflow-hidden rounded-3xl shadow-hover">
              <Image src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=700" alt="WKND Coffee espresso" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="35vw" />
            </div>
            <div className="absolute bottom-0 right-0 h-64 w-[58%] overflow-hidden rounded-3xl shadow-hover">
              <Image src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=700" alt="WKND matcha" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="35vw" />
            </div>
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-pink-600 text-cream text-center shadow-hover">
                <span className="font-mono text-xs font-black leading-tight">wk<br/>nd</span>
              </div>
            </div>
          </div>

          <div>
            <span className="section-eyebrow">About WKND</span>
            <h2 className="section-heading">Lahore&apos;s Only<br />ODK Café 🇮🇹</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-600">
              <p>We do coffee the Italian way — precisely, intentionally and without compromise. Single-origin espresso. Ceremonial matcha. House-made desserts. Sandwiches that actually hit.</p>
              <p>WKND Coffee is at Plaza 92, DHA Raya, open every day from 9am. Because some days the weekend needs to start a little earlier.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[{ n: '52+', l: 'Menu Items' }, { n: '9AM', l: 'Open Daily' }, { n: '1AM', l: 'Delivery Till' }].map(s => (
                <div key={s.l} className="rounded-2xl bg-pink-50 p-4 text-center border border-pink-100">
                  <p className="font-display text-xl font-bold text-pink-600">{s.n}</p>
                  <p className="text-xs font-medium text-charcoal-600 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">Our Story <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="btn-secondary">Find Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INSTAGRAM ═══════════════════════════════════ */}
      <section className="py-20 bg-cream-200">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">Instagram</span>
            <h2 className="section-heading">Sip Happens ✨</h2>
            <p className="mt-3 text-charcoal-600 text-sm">Follow <strong>@wkndcoffeeraya</strong> for daily drops and weekend specials.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 mb-8">
            {[
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400',
              'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400',
              'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400',
              'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400',
              'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=400',
              'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400',
            ].map((img, i) => (
              <a key={i} href="https://www.instagram.com/wkndcoffeeraya" target="_blank" rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl">
                <Image src={img} alt="WKND Coffee on Instagram" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="16vw" />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a href="https://www.instagram.com/wkndcoffeeraya" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-pink-600 px-7 py-3 text-sm font-semibold text-pink-600 hover:bg-pink-600 hover:text-cream transition-all">
              <Instagram className="h-4 w-4" /> @wkndcoffeeraya · 3,434 followers
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══════════════════════════════════ */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-pink-600">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
            <div className="absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-white/5" />
          </div>
          <div className="relative container-px py-16 text-center text-cream">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">
              <Coffee className="h-3 w-3" /> Ready to Order?
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">Order online<br />or come visit.</h2>
            <p className="mt-4 text-cream/70 max-w-md mx-auto text-sm sm:text-base">
              Plaza 92, DHA Raya, Lahore. In-store from 9am every day. FoodPanda and pick-up orders open till 1am.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/menu" className="inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-semibold text-charcoal hover:bg-cream/90 transition-all">
                Browse Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://maps.google.com/?q=Plaza+92+DHA+Raya+Lahore" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-cream/40 px-8 py-4 text-sm font-semibold text-cream hover:bg-cream/10 transition-all">
                <MapPin className="h-4 w-4" /> Plaza 92, DHA Raya
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}