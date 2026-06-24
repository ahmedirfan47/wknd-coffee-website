'use client';
import { useEffect, useState } from 'react';
import { Loader2, Save, CheckCircle2, AlertCircle, Link as LinkIcon } from 'lucide-react';

interface Settings {
  siteName:        string;
  tagline:         string;
  primaryPhone:    string;
  primaryEmail:    string;
  whatsappNumber:  string;
  deliveryFee:     number;
  freeDeliveryMin: number;
  instagramUrl:    string;
  facebookUrl:     string;
  aboutText:       string;
}

const DEFAULTS: Settings = {
  siteName:        'WKND Coffee',
  tagline:         "What's better than a weekend?",
  primaryPhone:    '+92 300 0000000',
  primaryEmail:    'hello@wkndcoffee.pk',
  whatsappNumber:  'DAINOCZIHB3UK1',
  deliveryFee:     150,
  freeDeliveryMin: 2000,
  instagramUrl:    'https://www.instagram.com/wkndcoffeeraya',
  facebookUrl:     'https://www.facebook.com/wkndcoffeeraya',
  aboutText:       '',
};

export default function SettingsClient() {
  const [form,    setForm]    = useState<Settings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => {
        setForm({
          siteName:        data.siteName        ?? DEFAULTS.siteName,
          tagline:         data.tagline         ?? DEFAULTS.tagline,
          primaryPhone:    data.primaryPhone    ?? DEFAULTS.primaryPhone,
          primaryEmail:    data.primaryEmail    ?? DEFAULTS.primaryEmail,
          whatsappNumber:  data.whatsappNumber  ?? DEFAULTS.whatsappNumber,
          deliveryFee:     Number(data.deliveryFee     ?? 150),
          freeDeliveryMin: Number(data.freeDeliveryMin ?? 2000),
          instagramUrl:    data.instagramUrl    ?? DEFAULTS.instagramUrl,
          facebookUrl:     data.facebookUrl     ?? DEFAULTS.facebookUrl,
          aboutText:       data.aboutText       ?? '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const set = (key: keyof Settings) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({
        ...f,
        [key]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
      }));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError('');

    try {
      const res  = await fetch('/api/admin/settings', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Save failed (${res.status}). Are you logged in as admin?`);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      }
    } catch (err: any) {
      setError('Network error — please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">

      {/* Site Info */}
      <div className="card p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-charcoal">Brand Identity</h2>
        <div className="space-y-4">
          <div>
            <label className="label-field">Brand / Site Name</label>
            <input value={form.siteName} onChange={set('siteName')} className="input-field" placeholder="WKND Coffee" />
          </div>
          <div>
            <label className="label-field">Tagline</label>
            <input value={form.tagline} onChange={set('tagline')} className="input-field" placeholder="What's better than a weekend?" />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="card p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-charcoal">Contact Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">Phone Number</label>
            <input value={form.primaryPhone} onChange={set('primaryPhone')} className="input-field" placeholder="+92 300 0000000" />
          </div>
          <div>
            <label className="label-field">Email</label>
            <input value={form.primaryEmail} onChange={set('primaryEmail')} className="input-field" placeholder="hello@wkndcoffee.pk" />
          </div>
          <div className="sm:col-span-2">
            <label className="label-field">WhatsApp Message Link ID</label>
            <div className="flex items-center gap-2 input-field p-0 overflow-hidden">
              <span className="px-3 py-3 bg-pink-50 text-charcoal-600 text-xs whitespace-nowrap">wa.me/message/</span>
              <input
                value={form.whatsappNumber}
                onChange={set('whatsappNumber')}
                className="flex-1 px-3 py-3 text-sm focus:outline-none bg-transparent"
                placeholder="DAINOCZIHB3UK1"
              />
            </div>
            <p className="mt-1 text-xs text-charcoal-400">From your Instagram bio: wa.me/message/<strong>DAINOCZIHB3UK1</strong></p>
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className="card p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-charcoal">Delivery Settings</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">Delivery Fee (Rs)</label>
            <input type="number" value={form.deliveryFee} onChange={set('deliveryFee')} className="input-field" min="0" />
          </div>
          <div>
            <label className="label-field">Free Delivery Above (Rs)</label>
            <input type="number" value={form.freeDeliveryMin} onChange={set('freeDeliveryMin')} className="input-field" min="0" />
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="card p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-charcoal">Social Links</h2>
        <div className="space-y-4">
          <div>
            <label className="label-field">Instagram URL</label>
            <input value={form.instagramUrl} onChange={set('instagramUrl')} className="input-field" placeholder="https://www.instagram.com/wkndcoffeeraya" />
          </div>
          <div>
            <label className="label-field">Facebook URL</label>
            <input value={form.facebookUrl} onChange={set('facebookUrl')} className="input-field" placeholder="https://www.facebook.com/wkndcoffeeraya" />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-charcoal">About Text</h2>
        <textarea
          value={form.aboutText}
          onChange={set('aboutText')}
          rows={5}
          className="input-field"
          placeholder="Lahore's only ODK café. Coffee, matcha, sandwiches and desserts — in-store 9am–11pm, FoodPanda & pick-up till 1am."
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Save button */}
      <button onClick={save} disabled={saving} className="btn-primary w-full py-4 text-base">
        {saving  ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
        : saved   ? <><CheckCircle2 className="h-4 w-4" /> Settings Saved!</>
        : <><Save className="h-4 w-4" /> Save All Settings</>}
      </button>

      {/* Image upload info */}
      <div className="rounded-2xl border border-pink-200 bg-pink-50 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-charcoal">
          <LinkIcon className="h-4 w-4 text-pink-600" />
          Product & Category Image Uploads
        </p>
        <p className="mt-2 text-xs text-charcoal-600 leading-relaxed">
          To enable file uploads: go to <strong>Vercel Dashboard → Storage → Create → Blob</strong>,
          name it <code className="bg-pink-100 px-1 rounded">wknd-images</code>, connect to project.
          Vercel automatically adds <code className="bg-pink-100 px-1 rounded">BLOB_READ_WRITE_TOKEN</code> — then redeploy.
        </p>
        <p className="mt-2 text-xs text-charcoal-600">
          <strong>Immediate workaround:</strong> In the Products/Categories form, use the
          <em> "Paste Image URL"</em> field to add images from any public URL (Unsplash, Google Photos, etc.)
        </p>
      </div>

    </div>
  );
}