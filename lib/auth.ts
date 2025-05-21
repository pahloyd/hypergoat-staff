// lib/auth.ts
import { cookies as getCookies } from 'next/headers';
import { getAdminAuth } from './firebaseAdmin';

export async function verifyUser() {
  // cookies() is returning a Promise here, so await it:
  const cookieStore = await getCookies();
  const token = cookieStore.get('__session')?.value;
  if (!token) return null;

  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    if (!decoded.email || !decoded.email.endsWith('@hyper-goat.com')) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}
