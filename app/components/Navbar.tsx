'use client';

import Link from 'next/link';
import { Bone } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-amber-600 text-white p-2 rounded-xl shadow-md group-hover:bg-amber-700 transition">
            <Bone className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">Sterchez Kennels</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link href="/" className="hover:text-amber-600 transition">Home</Link>
          <Link href="/catalog" className="hover:text-amber-600 transition">Dogs & Adoption</Link>
          <Link href="/memories" className="hover:text-amber-600 transition">Memories</Link>
          <Link href="/team" className="hover:text-amber-600 transition">Our Team</Link>
        </div>
      </div>
    </nav>
  );
}
