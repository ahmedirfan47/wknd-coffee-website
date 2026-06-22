'use client';
import { useEffect, useState, useCallback } from 'react';
import {
  Search, X, Loader2, Package, Eye,
  Phone, Mail, MapPin, CreditCard, Calendar,
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

const STATUSES = ['PENDING','CONFIRMED','PREPARING','READY','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'];

const STATUS_LABELS: Record<string, string> = {
  PENDING:          'Pending',
  CONFIRMED:        'Confirmed',
  PREPARING:        'Preparing',
  READY:            'Ready',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED:        'Delivered',
  CANCELLED:        'Cancelled',
};

const STATUS_COLORS: Record<string, string> = {
  PENDING:          'bg-amber-100 text-amber-700 border-amber-200',
  CONFIRMED:        'bg-blue-100 text-blue-700 border-blue-200',
  PREPARING:        'bg-purple-100 text-purple-700 border-purple-200',
  READY:            'bg-pistachio-100 text-pistachio-700 border-pistachio-200',
  OUT_FOR_DELIVERY: 'bg-pink-100 text-pink-700 border-pink-200',
  DELIVERED:        'bg-green-100 text-green-700 border-green-200',
  CANCELLED:        'bg-red-100 text-red-700 border-red-200',
};

interface OrderItem {
  id: string; name: string; quantity: number;
  price: number; image: string | null;
}

interface Order {
  id: string; orderNumber: string; status: string;
  customerName: string; customerEmail: string; customerPhone: string;
  deliveryType: string; address: string | null; area: string | null;
  city: string | null; branch: string | null;
  subtotal: number; discount: number; deliveryFee: number; total: number;
  paymentMethod: string; couponCode: string | null; notes: string | null;
  createdAt: string; items: OrderItem[];
}

export default function OrdersClient() {
  const [orders,      setOrders]      = useState<Order[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState('');
  const [statusFilter,setStatusFilter]= useState('');
  const [selected,    setSelected]    = useState<Order | null>(null);
  const [updating,    setUpdating]    = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search)       params.set('q', search);
    if (statusFilter) params.set('status', statusFilter);
    const data = await fetch(`/api/admin/orders?${params}`).then(r => r.json());
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => {
    const t = setTimeout(fetchOrders, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchOrders]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true);
    const res  = await fetch(`/api/admin/orders/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body:   JSON.stringify({ status }),
    });
    const updated = await res.json();
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: updated.status } : o));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: updated.status } : prev);
    setUpdating(false);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-600/50" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search orders, customers..." className="input-field w-64 pl-11"
          />
        </div>
        <select
          value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="input-field w-44"
        >
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
        <p className="ml-auto text-sm text-charcoal-600">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-pink-50/80">
              <tr className="text-xs uppercase tracking-wide text-charcoal-600">
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Items</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="py-14 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-pink-500" />
                </td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="py-14 text-center">
                  <Package className="mx-auto mb-2 h-10 w-10 text-pink-200" />
                  <p className="text-charcoal-600">No orders found.</p>
                </td></tr>
              ) : orders.map(o => (
                <tr key={o.id} className="border-b border-pink-50 hover:bg-pink-50/20">
                  <td className="px-4 py-3">
                    <p className="font-mono text-xs font-bold text-charcoal">{o.orderNumber}</p>
                    <p className="text-xs text-charcoal-600">{formatDate(o.createdAt)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-charcoal">{o.customerName}</p>
                    <p className="text-xs text-charcoal-600">{o.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">{o.items.length} item{o.items.length !== 1 ? 's' : ''}</td>
                  <td className="px-4 py-3 font-semibold text-pink-600">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-charcoal/10 px-2 py-0.5 text-xs font-medium text-charcoal">
                      {o.paymentMethod === 'COD' ? 'Cash' : o.paymentMethod === 'BANK_TRANSFER' ? 'Bank' : 'Card'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={e => updateStatus(o.id, e.target.value)}
                      disabled={updating}
                      className={`rounded-2xl border px-2.5 py-1 text-xs font-semibold cursor-pointer ${STATUS_COLORS[o.status] ?? ''}`}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(o)}
                      className="flex items-center gap-1.5 rounded-xl bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-600 hover:bg-pink-100"
                    >
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-soft">

            {/* Modal header */}
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl bg-white px-6 py-4 shadow-sm">
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal">{selected.orderNumber}</h2>
                <p className="text-xs text-charcoal-600">{formatDate(selected.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selected.status}
                  onChange={e => updateStatus(selected.id, e.target.value)}
                  disabled={updating}
                  className={`rounded-2xl border px-3 py-1.5 text-xs font-semibold ${STATUS_COLORS[selected.status] ?? ''}`}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
                <button onClick={() => setSelected(null)} className="rounded-xl p-2 hover:bg-pink-50">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-6">

              {/* Customer info */}
              <div className="rounded-2xl border border-pink-100 p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-charcoal-600">Customer</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 font-semibold text-charcoal">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 font-display text-sm font-bold text-pink-600">
                      {selected.customerName.charAt(0).toUpperCase()}
                    </span>
                    {selected.customerName}
                  </div>
                  <p className="flex items-center gap-2 text-charcoal-600">
                    <Mail className="h-4 w-4 text-pink-400 shrink-0" /> {selected.customerEmail}
                  </p>
                  <p className="flex items-center gap-2 text-charcoal-600">
                    <Phone className="h-4 w-4 text-pink-400 shrink-0" /> {selected.customerPhone}
                  </p>
                </div>
              </div>

              {/* Delivery info */}
              <div className="rounded-2xl border border-pink-100 p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-charcoal-600">
                  {selected.deliveryType === 'pickup' ? 'Pickup Details' : 'Delivery Address'}
                </h3>
                {selected.deliveryType === 'pickup' ? (
                  <p className="flex items-start gap-2 text-sm text-charcoal">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                    {selected.branch ?? 'Branch not specified'}
                  </p>
                ) : (
                  <p className="flex items-start gap-2 text-sm text-charcoal">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                    {[selected.address, selected.area, selected.city].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>

              {/* Payment */}
              <div className="rounded-2xl border border-pink-100 p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-charcoal-600">Payment</h3>
                <div className="flex items-center justify-between text-sm">
                  <p className="flex items-center gap-2 text-charcoal">
                    <CreditCard className="h-4 w-4 text-pink-400" />
                    {selected.paymentMethod === 'COD' ? 'Cash on Delivery'
                      : selected.paymentMethod === 'BANK_TRANSFER' ? 'Bank Transfer'
                      : 'Card at Branch'}
                  </p>
                  {selected.couponCode && (
                    <span className="rounded-full bg-pistachio-100 px-2.5 py-0.5 text-xs font-semibold text-pistachio-700">
                      Coupon: {selected.couponCode}
                    </span>
                  )}
                </div>
              </div>

              {/* Order items */}
              <div className="rounded-2xl border border-pink-100 p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-charcoal-600">
                  Items ({selected.items.length})
                </h3>
                <div className="space-y-3">
                  {selected.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-pink-600">
                          {item.quantity}×
                        </span>
                        <span className="line-clamp-1 font-medium text-charcoal">{item.name}</span>
                      </div>
                      <span className="ml-3 shrink-0 font-semibold text-charcoal">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-4 space-y-1.5 border-t border-pink-100 pt-4 text-sm">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(selected.subtotal)}</span>
                  </div>
                  {selected.discount > 0 && (
                    <div className="flex justify-between text-pistachio-600">
                      <span>Discount</span>
                      <span>−{formatPrice(selected.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-charcoal-600">
                    <span>Delivery Fee</span>
                    <span>{selected.deliveryFee === 0 ? 'Free' : formatPrice(selected.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between border-t border-pink-100 pt-2 text-base font-bold text-charcoal">
                    <span>Total</span>
                    <span className="text-pink-600">{formatPrice(selected.total)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">Customer Note</h3>
                  <p className="text-sm text-charcoal">{selected.notes}</p>
                </div>
              )}

              {/* Order timeline */}
              <div className="rounded-2xl border border-pink-100 p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-charcoal-600">Order Timeline</h3>
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {['PENDING','CONFIRMED','PREPARING','READY','OUT_FOR_DELIVERY','DELIVERED'].map((s, i, arr) => {
                    const statusIdx   = arr.indexOf(selected.status);
                    const isCompleted = i <= statusIdx;
                    const isCurrent   = s === selected.status;
                    return (
                      <div key={s} className="flex items-center gap-1 shrink-0">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${isCurrent ? 'bg-pink-600 text-white' : isCompleted ? 'bg-pistachio-500 text-white' : 'bg-pink-100 text-charcoal-600'}`}>
                          {i + 1}
                        </div>
                        <span className={`text-[10px] font-medium ${isCurrent ? 'text-pink-600' : isCompleted ? 'text-pistachio-600' : 'text-charcoal-600'}`}>
                          {STATUS_LABELS[s]}
                        </span>
                        {i < arr.length - 1 && <div className={`h-px w-4 ${isCompleted && i < statusIdx ? 'bg-pistachio-400' : 'bg-pink-100'}`} />}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}