import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Browse the full WKND Coffee menu — specialty coffee, matcha, WKND specials, frappes, soft-sips, toasty treats and house-made desserts. Plaza 92, DHA Raya, Lahore.',
};

interface MenuPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const { category, q } = await searchParams;

  const categories = await db.category.findMany({
    where:   { isActive: true },
    orderBy: { position: 'asc' },
  });

  const activeCategory = category
    ? (categories.find((c) => c.slug === category) ?? null)
    : null;

  const products = await db.product.findMany({
    where: {
      ...(activeCategory ? { categoryId: activeCategory.id } : {}),
      ...(q
        ? {
            OR: [
              { name:        { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
              { tags:        { hasSome:  [q.toLowerCase()]       } },
            ],
          }
        : {}),
    },
    orderBy: { price: 'asc' },
    include: { category: true },
  });

  return (
    <div className="min-h-screen bg-cream pt-24">

      {/* ── Page Header ── */}
      <div className="bg-charcoal py-14">
        <div className="container-px mx-auto max-w-7xl text-center">
          <span className="section-eyebrow" style={{ color: '#A4C39E' }}>
            Plaza 92, DHA Raya
          </span>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl mt-2">
            {activeCategory ? activeCategory.name : 'Everything on the Menu'}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cream/60 sm:text-base">
            {activeCategory?.description ??
              "Coffee, matcha, WKND specials, frappes, sandwiches and house-made desserts — Lahore's only ODK café. In-store 9am–11pm · FoodPanda & pick-up till 1am."}
          </p>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl py-10">

        {/* ── Search ── */}
        <form action="/menu" method="GET" className="mx-auto mb-8 max-w-md">
          {category && <input type="hidden" name="category" value={category} />}
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-600/50" />
            <input
              type="text"
              name="q"
              defaultValue={q ?? ''}
              placeholder="Search — coffee, matcha, pistachio..."
              className="input-field pl-11"
            />
          </div>
        </form>

        {/* ── Category chips ── */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <Link
            href="/menu"
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
              !category
                ? 'bg-pink-600 text-cream shadow-sage'
                : 'bg-white text-charcoal border border-pink-200 hover:border-pink-400 hover:text-pink-600'
            )}
          >
            All Items
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/menu?category=${c.slug}`}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
                category === c.slug
                  ? 'bg-pink-600 text-cream shadow-sage'
                  : 'bg-white text-charcoal border border-pink-200 hover:border-pink-400 hover:text-pink-600'
              )}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* ── Results count ── */}
        {(activeCategory || q) && products.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-charcoal-600">
              Showing{' '}
              <span className="font-semibold text-charcoal">{products.length}</span>{' '}
              {products.length === 1 ? 'item' : 'items'}
              {activeCategory && ` in ${activeCategory.name}`}
              {q && ` matching "${q}"`}
            </p>
            <Link href="/menu" className="text-xs font-semibold text-pink-600 hover:underline">
              Clear filter
            </Link>
          </div>
        )}

        {/* ── Product grid ── */}
        {products.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-pink-200 py-20 text-center">
            <p className="text-lg font-display font-bold text-charcoal">Nothing found.</p>
            <p className="mt-2 text-sm text-charcoal-600">
              Try a different search or browse all categories.
            </p>
            <Link href="/menu" className="btn-primary mt-6 inline-flex">
              Clear Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={{ ...p, compareAtPrice: p.compareAtPrice ?? null }}
              />
            ))}
          </div>
        )}

        {/* ── Bottom note ── */}
        <div className="mt-16 rounded-3xl bg-charcoal p-6 text-center text-cream sm:p-8">
          <p className="font-display text-xl font-bold">
            Life happens, coffee helps. ☕
          </p>
          <p className="mt-2 text-sm text-cream/60">
            Add-ons available: Extra Shot (+250) · Extra Pump (+150) · Cheese Foam (+350) · Cold Foam (+200) · Whipped Cream (+200)
          </p>
          <p className="mt-2 text-xs text-cream/40">
            Milk alternatives: Coconut, Oat, Almond (+1100) · Skimmed (+200)
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/message/DAINOCZIHB3UK1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Order via WhatsApp
            </a>
            <Link href="/contact" className="btn-secondary text-sm py-2.5 px-5"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--background)' }}>
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}