import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin-guard';

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized — please log in as admin' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      // Vercel Blob not configured — clear instructions
      return NextResponse.json({
        error:
          'Image storage not set up. Go to Vercel Dashboard → Storage → Create → Blob Store → ' +
          'name it "wknd-images" → Connect to project. This auto-adds BLOB_READ_WRITE_TOKEN. ' +
          'Then redeploy. Alternatively paste an image URL directly in the URL field below.',
        setupRequired: true,
      }, { status: 503 });
    }

    // Vercel Blob upload
    const { put } = await import('@vercel/blob');
    const safeFilename = `wknd-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    const blob = await put(safeFilename, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err: any) {
    console.error('[upload] error:', err);
    return NextResponse.json({
      error: err.message || 'Upload failed. Ensure BLOB_READ_WRITE_TOKEN is set in Vercel.',
    }, { status: 500 });
  }
}