import Link from 'next/link';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Coffee, ArrowRight } from 'lucide-react';
import { SITE, BRANCHES, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  const branch = BRANCHES[0];

  return (
    <footer className="bg-charcoal text-cream">

      {/* Top section */}
      <div className="container-px mx-auto max-w-7xl pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-600">
                <Coffee className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold text-cream">WKND</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-medium">Coffee</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-cream/60 max-w-xs mb-6">
              Specialty coffee, all-day brunch and light bites at DHA Raya, Lahore.
              Good coffee. Good food. Good vibes — every single day.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/60 transition-all duration-200 hover:bg-pink-600 hover:text-white hover:border-pink-600"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/60 transition-all duration-200 hover:bg-pink-600 hover:text-white hover:border-pink-600"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/60 transition-all duration-200 hover:bg-pink-600 hover:text-white hover:border-pink-600"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
              Navigate
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/account/orders" className="group flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/login" className="group flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu categories */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
              Menu
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Espresso Bar',      slug: 'espresso-bar'    },
                { label: 'Cold Brew & Iced',  slug: 'cold-brew-iced'  },
                { label: 'All-Day Brunch',    slug: 'all-day-brunch'  },
                { label: 'Light Bites',       slug: 'light-bites'     },
                { label: 'Pastries & Bakes',  slug: 'pastries-bakes'  },
                { label: 'Smoothies & Shakes',slug: 'smoothies-shakes'},
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/menu?category=${cat.slug}`}
                    className="group flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Location */}
          <div className="lg:col-span-4">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
              Find Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-600/20">
                  <MapPin className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">{branch.name}</p>
                  <p className="text-sm text-cream/60">{branch.address}</p>
                  <a
                    href={branch.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Get Directions <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-600/20">
                  <Clock className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">Hours</p>
                  <p className="text-sm text-cream/60">{branch.hours}</p>
                  <p className="text-xs text-cream/40 mt-0.5">Every day of the week</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-600/20">
                  <Phone className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <a href={`tel:${branch.phone}`} className="text-sm text-cream/60 hover:text-cream transition-colors">
                    {branch.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-600/20">
                  <Mail className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <a href={`mailto:${SITE.email}`} className="text-sm text-cream/60 hover:text-cream transition-colors">
                    {SITE.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter strip */}
      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl py-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <p className="text-sm font-semibold text-cream">Stay in the loop</p>
              <p className="text-xs text-cream/50 mt-0.5">New menu items, special offers and weekend specials.</p>
            </div>
            <form className="flex w-full max-w-sm gap-2" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-pink-700 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream/30">
            DHA Raya, Lahore, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}