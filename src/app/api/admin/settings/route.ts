import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi } from '@/lib/admin-guard';

const DEFAULTS = {
  siteName:        'WKND Coffee',
  tagline:         "What's better than a weekend?",
  primaryPhone:    '+92 300 0000000',
  primaryEmail:    'hello@wkndcoffee.pk',
  whatsappNumber:  'DAINOCZIHB3UK1',
  deliveryFee:     150,
  freeDeliveryMin: 2000,
  instagramUrl:    'https://www.instagram.com/wkndcoffeeraya',
  facebookUrl:     'https://www.facebook.com/wkndcoffeeraya',
  aboutText:       "Lahore's only ODK café. Coffee, matcha, sandwiches and desserts — in-store 9am–11pm, FoodPanda & pick-up till 1am.",
};

export async function GET() {
  try {
    const settings = await db.siteSettings.findUnique({ where: { id: 'settings' } });
    return NextResponse.json(settings ?? { id: 'settings', ...DEFAULTS });
  } catch (err) {
    console.error('[settings GET]', err);
    return NextResponse.json({ id: 'settings', ...DEFAULTS });
  }
}

export async function PUT(req: Request) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized — please log in as admin' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Explicit type-casting — Prisma requires Int, form sends strings
    const data = {
      siteName:        String(body.siteName        ?? DEFAULTS.siteName),
      tagline:         String(body.tagline         ?? DEFAULTS.tagline),
      primaryPhone:    String(body.primaryPhone    ?? DEFAULTS.primaryPhone),
      primaryEmail:    String(body.primaryEmail    ?? DEFAULTS.primaryEmail),
      whatsappNumber:  String(body.whatsappNumber  ?? DEFAULTS.whatsappNumber),
      deliveryFee:     parseInt(String(body.deliveryFee     ?? 150),  10),
      freeDeliveryMin: parseInt(String(body.freeDeliveryMin ?? 2000), 10),
      instagramUrl:    String(body.instagramUrl    ?? DEFAULTS.instagramUrl),
      facebookUrl:     String(body.facebookUrl     ?? DEFAULTS.facebookUrl),
      aboutText:       String(body.aboutText       ?? DEFAULTS.aboutText),
    };

    // Validate numbers are actually numbers
    if (isNaN(data.deliveryFee) || isNaN(data.freeDeliveryMin)) {
      return NextResponse.json({ error: 'Delivery fee and free delivery minimum must be numbers' }, { status: 400 });
    }

    const settings = await db.siteSettings.upsert({
      where:  { id: 'settings' },
      create: { id: 'settings', ...data },
      update: data,
    });

    return NextResponse.json(settings);
  } catch (err: any) {
    console.error('[settings PUT]', err);
    return NextResponse.json({ error: err.message || 'Failed to save settings' }, { status: 500 });
  }
}