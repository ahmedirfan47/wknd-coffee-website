import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { SITE, BRANCHES } from '@/lib/constants';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with WKND Coffee — Plaza 92, DHA Raya, Lahore. WhatsApp, email or visit us in-store. Open 9am–11pm daily, FoodPanda & pick-up till 1am.',
};

export default function ContactPage() {
  const branch = BRANCHES[0];

  return (
    <div className="min-h-screen bg-cream pt-24">

      {/* ── Header ── */}
      <div className="bg-charcoal py-14">
        <div className="container-px mx-auto max-w-5xl text-center">
          <span className="section-eyebrow" style={{ color: '#A4C39E' }}>Get in Touch</span>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl mt-2">
            We&apos;d Love to<br />Hear From You
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/60 sm:text-base">
            Questions, feedback, catering enquiries or just want to say hello —
            drop us a message and our team will get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div className="container-px mx-auto max-w-6xl py-16">
        <div className="grid gap-10 lg:grid-cols-5">

          {/* ── Left: contact details ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Quick contact cards */}
            <a
              href="https://wa.me/message/DAINOCZIHB3UK1"
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex items-start gap-4 p-5 block group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-600 group-hover:bg-pink-700 transition-colors">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm">WhatsApp Us</p>
                <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">
                  Fastest way to reach us. Order questions, catering, anything.
                </p>
                <p className="text-xs font-semibold text-pink-600 mt-2">
                  wa.me/message/DAINOCZIHB3UK1 →
                </p>
              </div>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="card-hover flex items-start gap-4 p-5 block group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-charcoal group-hover:bg-pink-600 transition-colors">
                <Mail className="h-5 w-5 text-cream" />
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm">Email Us</p>
                <p className="text-xs text-charcoal-600 mt-0.5">{SITE.email}</p>
                <p className="text-xs text-charcoal-400 mt-1">We reply within 24 hours</p>
              </div>
            </a>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex items-start gap-4 p-5 block group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 group-hover:bg-pink-600 transition-colors">
                <Instagram className="h-5 w-5 text-pink-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm">Instagram</p>
                <p className="text-xs text-charcoal-600 mt-0.5">@wkndcoffeeraya</p>
                <p className="text-xs text-charcoal-400 mt-1">3,434 followers · 83 posts</p>
              </div>
            </a>

            {/* Branch info */}
            <div className="card p-5 mt-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-pink-600 mb-4">
                Our Location
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-50">
                    <MapPin className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{branch.name}</p>
                    <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{branch.address}</p>
                    <a
                      href={branch.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-pink-600 hover:underline mt-1 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-50">
                    <Clock className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Opening Hours</p>
                    <p className="text-xs text-charcoal-600 mt-0.5">{branch.hours} (in-store)</p>
                    <p className="text-xs text-charcoal-600">{branch.hoursNote}</p>
                    <p className="text-xs text-charcoal-400 mt-1">Open every day of the week</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-50">
                    <Phone className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Phone</p>
                    <a href={`tel:${branch.phone}`} className="text-xs text-charcoal-600 hover:text-pink-600 transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* ── Right: contact form ── */}
          <div className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-1">
                Send Us a Message
              </h2>
              <p className="text-sm text-charcoal-600 mb-6">
                We read every message and reply promptly.
              </p>
              <Suspense fallback={<div className="h-64 flex items-center justify-center text-charcoal-600 text-sm">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

        </div>

        {/* ── Map embed placeholder ── */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-charcoal/5 border border-pink-100">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MapPin className="h-10 w-10 text-pink-600 mb-4" />
            <p className="font-display text-xl font-bold text-charcoal">Plaza No. 92, DHA Raya</p>
            <p className="text-charcoal-600 text-sm mt-1">Lahore, Pakistan</p>
            <a
              href="https://maps.google.com/?q=Plaza+92+DHA+Raya+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              <MapPin className="h-4 w-4" />
              Open in Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}