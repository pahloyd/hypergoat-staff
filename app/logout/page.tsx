'use client';

import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    fetch('/api/session', { method: 'DELETE' }).then(() => {
      window.location.href = '/login';
    });
  }, []);

  return <p>Logging out...</p>;
}
