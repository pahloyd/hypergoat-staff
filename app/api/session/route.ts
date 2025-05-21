// app/api/session/route.ts
import { NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  const { token } = await req.json();
  try {
    const decoded = await getAdminAuth().verifyIdToken(token);

    if (!decoded.email || !decoded.email.endsWith('@hyper-goat.com')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set('__session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return res;
  } catch (err) {
    console.error('Token verification error:', err);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
