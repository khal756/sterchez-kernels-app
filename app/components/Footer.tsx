'use client';

import { Bone, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-center">
        <div className="flex items-center gap-3">
          <div className="bg-amber-600 text-white p-2 rounded-xl">
            <Bone className="w-6 h-6" />
          </div>
          <span className="text-xl font-black">Sterchez Kennels</span>
        </div>
        <p className="text-sm text-gray-400 text-center">
          © 2026 Sterchez Kennels. All rights reserved. Elite breeding & adoption.
        </p>
        <div className="flex justify-end gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500" /> Support</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> Kennels</div>
        </div>
      </div>
    </footer>
  );
}
