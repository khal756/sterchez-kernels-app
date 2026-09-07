'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useKennel } from '../context/KennelContext';
import { Video, Image as ImageIcon } from 'lucide-react';

export default function MemoriesPage() {
  const { memories } = useKennel();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-black text-gray-900">Shared Memories & Moments</h1>
          <p className="text-gray-600 mt-2">A wonderful look into life at Sterchez Kennels and our happy puppies with their new families.</p>
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-400 italic">No memories shared yet. Upload photos and videos from the admin panel!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {memories.map((mem) => (
              <div key={mem.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="relative h-64 w-full bg-black">
                  {mem.mediaType === 'image' ? (
                    <img src={mem.mediaUrl} alt="Memory" className="w-full h-full object-cover" />
                  ) : (
                    <video src={mem.mediaUrl} controls className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-gray-800 font-medium">{mem.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
