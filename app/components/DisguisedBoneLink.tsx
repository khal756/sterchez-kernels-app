'use client';

import Link from 'next/link';
import { Bone } from 'lucide-react';

export default function DisguisedBoneLink() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link 
        href="/admin" 
        title="Admin Disguise Portal"
        className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition transform hover:scale-110"
      >
        <Bone className="w-6 h-6 animate-pulse" />
      </Link>
    </div>
  );
}
