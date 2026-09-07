'use client';

import { useState } from 'react';
import { useKennel, Dog } from '../context/KennelContext';
import { MessageCircle, Phone, Bone, Search } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function CatalogPage() {
  const { dogs } = useKennel();
  const [filter, setFilter] = useState<'All' | 'For Sale' | 'Adoption'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDogs = dogs.filter(dog => {
    const matchesFilter = filter === 'All' || dog.category === filter;
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dog.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleWhatsAppInquiry = (dog: Dog) => {
    const phoneNumber = '254114557095';
    const message = encodeURIComponent(`Hello Sterchez Kennels, I am interested in inquiring about ${dog.name} (${dog.breed}), listed under ${dog.category}. Please share more details.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dogs Catalog & Adoption</h1>
            <p className="text-gray-600 max-w-xl mx-auto">Explore our top-tier pedigree dogs for sale and wonderful rescue dogs waiting for adoption.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <div className="flex gap-2">
                {(['All', 'For Sale', 'Adoption'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-5 py-2 rounded-full font-medium transition text-sm ${
                      filter === tab ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or breed..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>
          </div>

          {filteredDogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <Bone className="w-12 h-12 text-amber-600 mx-auto mb-3 opacity-50 animate-bounce" />
              <h3 className="text-lg font-bold text-gray-800">No dogs found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filter settings.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredDogs.map(dog => (
                <div key={dog.id} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 flex flex-col hover:shadow-md transition group">
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img src={dog.imageUrl} alt={dog.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      dog.category === 'For Sale' ? 'bg-amber-600 text-white shadow' : 'bg-emerald-600 text-white shadow'
                    }`}>
                      {dog.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{dog.name}</h3>
                      <p className="text-amber-700 font-semibold text-sm">{dog.breed}</p>
                      {dog.category === 'For Sale' && (
                        <p className="text-lg font-black text-gray-900 mt-2">${dog.price}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleWhatsAppInquiry(dog)}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium transition shadow-sm text-sm"
                      >
                        <MessageCircle className="w-4 h-4" /> Reach out on WhatsApp
                      </button>
                      
                      <a
                        href="tel:+254114557095"
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl font-medium transition text-sm"
                      >
                        <Phone className="w-4 h-4 text-amber-600" /> Or Call: +254 114 557095
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
