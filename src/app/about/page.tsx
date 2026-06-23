import type { Metadata } from 'next';
import { Coffee, Clock, MapPin, Heart, Star, Leaf } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    "WKND Coffee is Lahore's only ODK café at DHA Raya. Specialty coffee, matcha, sandwiches and desserts — in-store 9am to 11pm, FoodPanda & pick-up till 1am.",
};

const values = [
  {
    icon:  Coffee,
    title: 'Serious About Coffee',
    body:  "Espresso the Italian way — precise, intentional and uncompromising. Lahore's only ODK café 🇮🇹",
  },
  {
    icon:  Leaf,
    title: 'Matcha Mood',
    body:  'Ceremonial grade matcha in seven signature blends. From classic to Dragon Fruit Strawberry.',
  },
  {
    icon:  Heart,
    title: 'Made Here, For Here',
    body:  'Every dessert and sandwich on the menu is tested, tasted and refined in our own kitchen before earning a spot.',
  },
  {
    icon:  Star,
    title: 'WKND Specials',
    body:  'Iced Creme Brulee Latte, Kunafa Hot Chocolate, Pistachio Latte — drinks you will not find anywhere else in Lahore.',
  },
  {
    icon:  Clock,
    title: 'Open Every Day',
    body:  'In-store from 9am to 11pm. FoodPanda and pick-up orders open till 1am — every single day.',
  },
  {
    icon:  MapPin,
    title: 'Rooted in Raya',
    body:  'Born and built in DHA Raya. Plaza 92 is home, and the neighbourhood is everything.',
  },
];

const team = [
  {
    name:  'The Bar',
    role:  'Specialty Coffee & Matcha',
    quote: 'Every shot is pulled with intention. Every cup leaves here right.',
  },
  {
    name:  'The Kitchen',
    role:  'Sandwiches & Desserts',
    quote: 'We make the food we actually want to eat — honest, seasonal and worth the wait.',
  },
  {
    name:  'The Room',
    role:  'Hospitality',
    quote: 'We want every person who walks in to feel like they found their spot.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1400')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal/95" />
        <div className="container-px relative mx-auto max-w-5xl py-36 text-center text-cream">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/80 backdrop-blur-sm mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
            Plaza 92, DHA Raya, Lahore
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            What&apos;s better
            <br />
            <span className="text-pink-400">than a weekend?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70">
            Lahore&apos;s only ODK café 🇮🇹 — specialty coffee, matcha, sandwiches and
            house-made desserts. Open every day, because weekends should be every day.
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="container-px mx-auto max-w-5xl py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow">Who We Are</span>
            <h2 className="section-heading">
              Lahore&apos;s Only<br />ODK Café 🇮🇹
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-600">
              <p>
                WKND Coffee started with one obsession: great coffee. We wanted a place
                that took the craft seriously — Italian espresso methods, ceremonial
                matcha, house-made desserts and sandwiches worth sitting down for —
                without taking itself too seriously.
              </p>
              <p>
                Tucked into Plaza 92, DHA Raya, we built a space where every day feels
                like a long, unhurried weekend. Good coffee. Good food. Good vibes — and
                not a single reason to leave.
              </p>
              <p>
                We are open every day from 9am in-store, and our FoodPanda and pick-up
                orders run until 1am. Because some nights just need a Kunafa Hot
                Chocolate.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl img-zoom">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800"
                alt="WKND Coffee espresso bar"
                className="h-[400px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-pink-600 px-5 py-4 text-cream shadow-sage">
              <p className="font-display text-2xl font-bold">9 AM</p>
              <p className="mt-0.5 text-xs font-medium text-cream/80">
                Open daily · till 1am delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-cream-200 py-20">
        <div className="container-px mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="section-eyebrow">What We Stand For</span>
            <h2 className="section-heading">Built Around<br />a Few Simple Things</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100">
                    <Icon className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-charcoal">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="container-px mx-auto max-w-5xl py-20">
        <div className="mb-12 text-center">
          <span className="section-eyebrow">The People Behind It</span>
          <h2 className="section-heading">Three Teams.<br />One Standard.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {team.map((t) => (
            <div key={t.name} className="rounded-3xl bg-charcoal p-6 text-cream">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 font-display text-sm font-bold text-white">
                {t.name.charAt(0)}
              </div>
              <p className="font-display text-lg font-bold">{t.name}</p>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-pink-400 mt-0.5">
                {t.role}
              </p>
              <p className="text-sm leading-relaxed text-cream/70">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-pink-600">
        <div className="container-px mx-auto max-w-5xl py-16">
          <div className="grid grid-cols-2 gap-8 text-center text-cream lg:grid-cols-4">
            {[
              { number: '9 AM',  label: 'Open every day'           },
              { number: '52+',   label: 'Items on the menu'        },
              { number: '83',    label: 'Instagram posts'          },
              { number: '1 AM',  label: 'FoodPanda & pick-up till' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-bold">{s.number}</p>
                <p className="mt-2 text-sm font-medium text-cream/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="container-px mx-auto max-w-5xl py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow">Find Us</span>
            <h2 className="section-heading">Come In,<br />Stay A While.</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pink-100">
                  <MapPin className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">DHA Raya</p>
                  <p className="text-sm text-charcoal-600 mt-0.5">
                    Plaza No. 92, DHA Raya, Lahore, Pakistan
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pink-100">
                  <Clock className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Hours</p>
                  <p className="text-sm text-charcoal-600 mt-0.5">9:00 AM – 11:00 PM (in-store)</p>
                  <p className="text-sm text-charcoal-600">FoodPanda & pick-up till 1:00 AM</p>
                  <p className="text-xs text-charcoal-400 mt-1">Open every day of the week</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Plaza+92+DHA+Raya+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
              <a
                href="https://wa.me/message/DAINOCZIHB3UK1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl img-zoom">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"
              alt="WKND Coffee interior"
              className="h-[400px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream-200">
        <div className="container-px mx-auto max-w-3xl py-20 text-center">
          <span className="section-eyebrow">Come Visit</span>
          <h2 className="section-heading">
            Every Day is a<br />Good Day for Coffee.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-charcoal-600">
            Dine in, take away or order online. We are at Plaza 92, DHA Raya every
            day from 9am — coffee ready, kitchen open.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/menu" className="btn-primary">
              Browse the Menu
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}