// lib/firebaseAdmin.ts
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';

let _auth: Auth | null = null;

export function getAdminAuth(): Auth {
  if (!_auth) {
    // this only runs once at request time
    const key = process.env.FIREBASE_PRIVATE_KEY!;
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: key.replace(/\\n/g, '\n'),
      }),
    });
    _auth = getAuth();
  }
  return _auth;
}
