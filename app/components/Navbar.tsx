'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bone, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="bg-amber-600 text-white p-2 rounded-xl shadow-md group-hover:bg-amber-700 transition">
            <Bone className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Sterchez Kennels</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link href="/" className="hover:text-amber-600 transition">Home</Link>
          <Link href="/catalog" className="hover:text-amber-600 transition">Dogs & Adoption</Link>
          <Link href="/memories" className="hover:text-amber-600 transition">Memories</Link>
          <Link href="/team" className="hover:text-amber-600 transition">Our Team</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition rounded-lg"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded-lg font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
          >
            Home
          </Link>
          <Link
            href="/catalog"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded-lg font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
          >
            Dogs & Adoption
          </Link>
          <Link
            href="/memories"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded-lg font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
          >
            Memories
          </Link>
          <Link
            href="/team"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded-lg font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
          >
            Our Team
          </Link>
        </div>
      )}
    </nav>
  );
}