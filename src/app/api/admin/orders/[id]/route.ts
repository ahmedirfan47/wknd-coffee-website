import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi } from '@/lib/admin-guard';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const order = await db.order.findUnique({
    where: { id },
    include: { items: true, user: { select: { id: true, name: true, email: true } } },
  });

  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id }   = await params;
  const { status } = await req.json();

  const order = await db.order.update({
    where: { id },
    data:  { status },
    include: { items: true },
  });

  // Create notification for status change
  db.notification.create({
    data: {
      type:  'ORDER',
      title: `Order ${order.orderNumber} → ${status}`,
      body:  `Status updated to ${status} for ${order.customerName}`,
      link:  '/admin/orders',
    },
  }).catch(() => {});

  return NextResponse.json(order);
}