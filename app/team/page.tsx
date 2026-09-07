'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useKennel } from '../context/KennelContext';

export default function TeamPage() {
  const { staffList } = useKennel();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-black text-gray-900">Meet Our Expert Team</h1>
          <p className="text-gray-600 mt-2">The dedicated professionals behind the health, training, and care at Sterchez Kennels.</p>
        </div>

        {staffList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-400 italic">No team members listed yet. Add staff from the admin panel!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {staffList.map((staff) => (
              <div key={staff.id} className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
                <img src={staff.imageUrl} alt={staff.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-amber-600 shadow-md" />
                <h3 className="text-xl font-bold text-gray-900">{staff.name}</h3>
                <p className="text-amber-700 font-semibold text-sm mt-1">{staff.position}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
