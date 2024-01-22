'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'unauthenticated' && (
        <Link href="/api/auth/signin" className="mr-5">
          Login
        </Link>
      )}
      {status === 'authenticated' && (
        <Link href="/" className="mr-5">
          {session.user!.name}
        </Link>
      )}
    </div>
  );
};

export default Navbar;
