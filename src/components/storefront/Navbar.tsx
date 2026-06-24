'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, User, LogOut, ClipboardList, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useSession, signOut } from '@/lib/session-context';

export default function Navbar() {
  const [open,         setOpen]         = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [userMenu,     setUserMenu]     = useState(false);
  const pathname    = usePathname();
  const { session } = useSession();
  const count       = useCartStore(s => s.getCount());

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); setUserMenu(false); }, [pathname]);

  useEffect(() => {
    if (!userMenu) return;
    const handler = () => setUserMenu(false);
    const t = setTimeout(() => document.addEventListener('click', handler), 0);
    return () => { clearTimeout(t); document.removeEventListener('click', handler); };
  }, [userMenu]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-cream/95 backdrop-blur-md shadow-soft border-b border-pink-100'
        : 'bg-transparent'
    )}>
      <div className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between gap-4">

        {/* ── LOGO — prominent WKND branding ── */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="WKND Coffee">
          {/* Circular logo mark matching Instagram profile picture */}
          <div className={cn(
            'flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full transition-all duration-300',
            scrolled
              ? 'bg-pink-600 group-hover:bg-pink-700'
              : 'bg-pink-500/90 backdrop-blur-sm group-hover:bg-pink-600'
          )}>
            <span className="font-mono text-[11px] font-black leading-tight text-cream tracking-tighter">wk</span>
            <span className="font-mono text-[11px] font-black leading-tight text-cream tracking-tighter">nd</span>
          </div>

          {/* Brand name — always visible, adapts colour to background */}
          <div className="flex flex-col leading-none gap-0.5">
            <span className={cn(
              'font-mono text-lg font-black uppercase tracking-tight transition-colors duration-300',
              scrolled
                ? 'text-charcoal group-hover:text-pink-600'
                : 'text-cream group-hover:text-pink-200 drop-shadow-sm'
            )}>
              WKND
            </span>
            <span className={cn(
              'text-[9px] font-bold uppercase tracking-[0.25em] transition-colors duration-300',
              scrolled ? 'text-charcoal-400' : 'text-cream/60'
            )}>
              Coffee
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200',
                pathname === link.href
                  ? 'bg-pink-600 text-cream'
                  : scrolled
                    ? 'text-charcoal hover:text-pink-600 hover:bg-pink-50'
                    : 'text-cream/90 hover:text-cream hover:bg-white/10'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-2">
          {/* Order CTA */}
          <Link href="/menu" className="hidden sm:inline-flex btn-primary py-2.5 px-5 text-xs">
            Order Now
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Cart — ${count} item${count !== 1 ? 's' : ''}`}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200',
              scrolled
                ? 'border-pink-200 bg-white/80 text-charcoal hover:bg-pink-600 hover:text-cream hover:border-pink-600'
                : 'border-cream/30 bg-cream/10 text-cream hover:bg-cream/20'
            )}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* User — desktop */}
          <div className="relative hidden sm:block">
            <button
              onClick={e => { e.stopPropagation(); setUserMenu(v => !v); }}
              aria-label="Account"
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 overflow-hidden',
                scrolled
                  ? 'border-pink-200 bg-white/80 text-charcoal hover:bg-pink-600 hover:text-cream hover:border-pink-600'
                  : 'border-cream/30 bg-cream/10 text-cream hover:bg-cream/20'
              )}
            >
              {session
                ? <span className="flex h-full w-full items-center justify-center rounded-full bg-pink-600 text-sm font-bold text-white">{session.user.name.charAt(0).toUpperCase()}</span>
                : <User className="h-5 w-5" strokeWidth={1.5} />}
            </button>

            {userMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-pink-100 bg-white p-2 shadow-hover animate-scale-in">
                {session ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl bg-pink-50 px-3 py-3 mb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-600 text-sm font-bold text-white shrink-0">
                        {session.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-charcoal">{session.user.name}</p>
                        <p className="truncate text-xs text-charcoal-600">{session.user.email}</p>
                      </div>
                    </div>
                    <Link href="/account" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-charcoal hover:bg-pink-50 transition-colors"><User className="h-4 w-4 text-pink-500 shrink-0" /> My Account</Link>
                    <Link href="/account/orders" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-charcoal hover:bg-pink-50 transition-colors"><ClipboardList className="h-4 w-4 text-pink-500 shrink-0" /> Order History</Link>
                    {session.user.role === 'ADMIN' && (
                      <>
                        <div className="my-1 border-t border-pink-50" />
                        <Link href="/admin/dashboard" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-pink-600 hover:bg-pink-50 transition-colors">
                          Admin Dashboard <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </>
                    )}
                    <div className="my-1 border-t border-pink-50" />
                    <button onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="h-4 w-4 shrink-0" /> Sign Out
                    </button>
                  </>
                ) : (
                  <div className="space-y-1.5 p-1">
                    <Link href="/login" className="block rounded-xl px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-pink-50 transition-colors">Sign In</Link>
                    <Link href="/register" className="block rounded-xl bg-pink-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-pink-700 transition-colors">Create Account</Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 lg:hidden',
              scrolled
                ? 'border-pink-200 bg-white/80 text-charcoal hover:bg-pink-50'
                : 'border-cream/30 bg-cream/10 text-cream hover:bg-cream/20'
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className="fixed inset-0 top-20 z-40 overflow-y-auto bg-cream/98 backdrop-blur-md lg:hidden">
          <div className="container-px py-6 space-y-1">

            {/* WKND branding strip */}
            <div className="flex items-center gap-4 rounded-2xl bg-charcoal px-5 py-4 mb-4">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-pink-600">
                <span className="font-mono text-[11px] font-black text-cream leading-tight">wk</span>
                <span className="font-mono text-[11px] font-black text-cream leading-tight">nd</span>
              </div>
              <div>
                <p className="font-mono text-lg font-black uppercase text-cream">WKND Coffee</p>
                <p className="text-xs text-cream/50">Plaza 92, DHA Raya · 9am–11pm</p>
              </div>
            </div>

            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                className={cn('flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold transition-colors',
                  pathname === link.href ? 'bg-pink-600 text-cream' : 'text-charcoal hover:bg-pink-50'
                )}>
                {link.label}
                <ChevronRight className={cn('h-4 w-4 shrink-0', pathname === link.href ? 'text-cream/60' : 'text-charcoal-400')} />
              </Link>
            ))}

            <div className="border-t border-pink-100 pt-4 mt-4 space-y-1">
              {session ? (
                <>
                  <div className="flex items-center gap-3 rounded-2xl bg-pink-50 px-4 py-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-600 font-bold text-white">{session.user.name.charAt(0).toUpperCase()}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-charcoal">{session.user.name}</p>
                      <p className="truncate text-xs text-charcoal-600">{session.user.email}</p>
                    </div>
                  </div>
                  <Link href="/account" className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-charcoal hover:bg-pink-50 transition-colors"><User className="h-4 w-4 text-pink-500" />My Account</Link>
                  <Link href="/account/orders" className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-charcoal hover:bg-pink-50 transition-colors"><ClipboardList className="h-4 w-4 text-pink-500" />Order History</Link>
                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin/dashboard" className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-pink-600 hover:bg-pink-50 transition-colors">Admin Dashboard <ChevronRight className="h-4 w-4" /></Link>
                  )}
                  <div className="border-t border-pink-100 pt-2 mt-2">
                    <button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center gap-2 rounded-2xl px-4 py-3.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" className="rounded-2xl border-2 border-charcoal px-4 py-3.5 text-center text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-cream transition-colors">Sign In</Link>
                  <Link href="/register" className="rounded-2xl bg-pink-600 px-4 py-3.5 text-center text-sm font-semibold text-white hover:bg-pink-700 transition-colors">Register</Link>
                </div>
              )}

              <Link href="/menu" className="btn-primary w-full justify-center mt-3 py-4 text-base">Order Online</Link>

              <div className="mt-4 rounded-2xl bg-charcoal p-4 text-cream">
                <p className="text-xs font-semibold text-pink-300 uppercase tracking-wider mb-2">Visit Us</p>
                <p className="text-sm font-medium">Plaza No. 92, DHA Raya, Lahore</p>
                <p className="text-xs text-cream/60 mt-1">9am–11pm in-store · till 1am on delivery</p>
                <a href="https://wa.me/message/DAINOCZIHB3UK1" target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-pink-700 transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}