import type { Metadata } from 'next';
import { Coffee, Clock, MapPin, Heart, Star, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'WKND Coffee is a specialty coffee cafe and all-day brunch spot in DHA Raya, Lahore. Learn our story, our values and what makes us your everyday weekend.',
};

const values = [
  {
    icon:  Coffee,
    title: 'Serious About Coffee',
    body:  'Single-origin espresso, 18-hour cold brew, dialled in every single morning. We care about what is in your cup.',
  },
  {
    icon:  Clock,
    title: 'Brunch Without Rules',
    body:  'Served all day, every day. Because good mornings should not have a deadline — or a time limit.',
  },
  {
    icon:  Heart,
    title: 'Made Here, For Here',
    body:  'Every item on the menu is tested, tasted and refined in our own kitchen before it earns a spot on the board.',
  },
  {
    icon:  Star,
    title: 'Worth Sitting Down For',
    body:  'Warm interiors, earthy tones and the kind of light that makes everything look better. A room that earns your time.',
  },
  {
    icon:  Leaf,
    title: 'Thoughtfully Sourced',
    body:  'We work with roasters who share our obsession with traceability, freshness and doing right by the people who grow the beans.',
  },
  {
    icon:  MapPin,
    title: 'Rooted in Raya',
    body:  'Born in DHA Raya and built for its community. A neighbourhood cafe that takes its craft seriously.',
  },
];

const team = [
  {
    name:  'The Kitchen',
    role:  'All-Day Brunch',
    quote: 'We cook the kind of food we actually want to eat — honest, seasonal and worth the wait.',
  },
  {
    name:  'The Bar',
    role:  'Specialty Coffee',
    quote: 'Every shot is pulled with intention. Every cup leaves here right.',
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1400')",
          }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="container-px relative mx-auto max-w-5xl py-32 text-center text-cream">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-pink-300">
            Our Story
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Good Coffee.
            <br />
            Good Food.
            <br />
            Good Vibes.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            WKND Coffee is a specialty coffee cafe and all-day brunch spot
            in the heart of DHA Raya, Lahore.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-px mx-auto max-w-5xl py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow">Who We Are</span>
            <h2 className="section-heading">Your Weekend, Every Day.</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-600">
              <p>
                WKND Coffee started with one obsession: great coffee. We
                wanted a place that took the craft seriously — single-origin
                beans, dialled-in espresso, cold brew steeped for eighteen
                hours — without taking itself too seriously.
              </p>
              <p>
                Set in the heart of DHA Raya, we built a space where every
                day feels like a long, unhurried weekend. Good espresso, food
                worth sitting down for, and a room that earns your time.
              </p>
              <p>
                We source with care, brunch without a clock, and serve
                everything with the kind of attention that makes the
                difference between a good cafe and your regular.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800"
                alt="WKND Coffee bar"
                className="h-[420px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-pink-600 px-6 py-5 text-cream shadow-hover">
              <p className="font-display text-3xl font-bold">8 AM</p>
              <p className="mt-1 text-sm font-medium text-cream/80">
                Until close, every day
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-200">
        <div className="container-px mx-auto max-w-6xl py-20">
          <div className="mb-12 text-center">
            <span className="section-eyebrow">What We Stand For</span>
            <h2 className="section-heading">Built Around a Few Simple Beliefs</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100">
                    <Icon className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-charcoal">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team / Sections */}
      <section className="container-px mx-auto max-w-5xl py-20">
        <div className="mb-12 text-center">
          <span className="section-eyebrow">The People Behind It</span>
          <h2 className="section-heading">Three Teams. One Standard.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {team.map((t) => (
            <div
              key={t.name}
              className="relative overflow-hidden rounded-3xl bg-charcoal p-6 text-cream"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 font-display text-base font-bold text-white">
                {t.name.charAt(0)}
              </div>
              <p className="font-display text-lg font-bold">{t.name}</p>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-pink-300">
                {t.role}
              </p>
              <p className="text-sm leading-relaxed text-cream/70">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-pink-600">
        <div className="container-px mx-auto max-w-5xl py-16">
          <div className="grid grid-cols-2 gap-8 text-center text-cream lg:grid-cols-4">
            {[
              { number: '8 AM',    label: 'We open every day'           },
              { number: '18hrs',   label: 'Cold brew steep time'        },
              { number: '34+',     label: 'Items on the menu'           },
              { number: '1',       label: 'Location — DHA Raya, Lahore' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-bold">{s.number}</p>
                <p className="mt-2 text-sm font-medium text-cream/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="container-px mx-auto max-w-5xl py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow">Find Us</span>
            <h2 className="section-heading">Come In, Stay A While.</h2>
            <div className="mt-6 space-y-4 text-charcoal-600">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />
                <div>
                  <p className="font-semibold text-charcoal">DHA Raya</p>
                  <p className="text-sm">
                    Raya Fairways Commercial, Phase 6, DHA, Lahore
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />
                <div>
                  <p className="font-semibold text-charcoal">Hours</p>
                  <p className="text-sm">8:00 AM – 12:00 AM, Every Day</p>
                </div>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Raya+Fairways+DHA+Phase+6+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 w-fit"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"
              alt="WKND Coffee interior"
              className="h-[380px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-200">
        <div className="container-px mx-auto max-w-3xl py-20 text-center">
          <span className="section-eyebrow">Come Visit</span>
          <h2 className="section-heading">Every Day is a Good Day for Coffee.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-charcoal-600">
            Dine in, take away, or order online. We are at DHA Raya
            every day from 8 AM — coffee ready, kitchen open, table waiting.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/menu" className="btn-primary">
              Browse the Menu
            </a>
            <a href="/contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}