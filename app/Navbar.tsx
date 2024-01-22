import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      <Link href="/api/auth/signin" className="mr-5">
        Login
      </Link>
    </div>
  );
};

export default Navbar;
