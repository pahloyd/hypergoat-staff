'use client';

import { auth } from '@/lib/firebaseClient';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ hd: 'hyper-goat.com' }); // Workspace domain restriction hint

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error('Session creation failed:', errData);
        alert('Access denied. You may not have a valid hyper-goat.com account.');
        return;
      }

      // Cookie now stored; reload protected route
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Login error', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Portal Login</h1>
      <button
        onClick={login}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Sign in with Google
      </button>
    </main>
  );
}
