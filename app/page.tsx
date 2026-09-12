'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Heart, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    title: 'Welcome to Sterchez Kennels',
    subtitle: 'Home of elite guard dogs, loving companions, and professional breeding.'
  },
  {
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
    title: 'Purebred Puppies for Sale',
    subtitle: 'Healthy, vaccinated, and well-socialized puppies ready for their forever homes.'
  },
  {
    url: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a',
    title: 'Adoption & Second Chances',
    subtitle: 'Giving wonderful dogs a new lease on life with caring families.'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />

      {/* Carousel Wallpaper Hero */}
      <header className="relative h-[75vh] sm:h-[80vh] md:h-[85vh] w-full overflow-hidden bg-gray-900 flex-grow">
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 md:to-transparent z-10" />
            <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl space-y-3 sm:space-y-4 text-white">
                <span className="inline-block bg-amber-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                  Premier Breeders
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 font-medium">
                  {slide.subtitle}
                </p>
                <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link href="/catalog" className="bg-amber-600 text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-center hover:bg-amber-700 transition shadow-lg text-sm sm:text-base">
                    View Available Dogs
                  </Link>
                  <Link href="/catalog" className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-6 sm:px-8 py-3 rounded-xl font-bold text-center hover:bg-white/20 transition text-sm sm:text-base">
                    Explore Adoption
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </header>

      {/* Highlights Bar */}
      <section className="bg-amber-50 py-8 sm:py-12 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
            <div className="bg-amber-100 p-3 rounded-xl text-amber-700 shrink-0"><Shield className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Health Guaranteed</h3>
              <p className="text-sm text-gray-600 mt-1">All our puppies are fully vaccinated and vet-checked.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
            <div className="bg-amber-100 p-3 rounded-xl text-amber-700 shrink-0"><Award className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Elite Bloodlines</h3>
              <p className="text-sm text-gray-600 mt-1">Carefully bred purebred dogs with exceptional temperament.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-amber-100 sm:col-span-2 md:col-span-1">
            <div className="bg-amber-100 p-3 rounded-xl text-amber-700 shrink-0"><Heart className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Adoption Program</h3>
              <p className="text-sm text-gray-600 mt-1">We help rescue and rehome dogs into safe, loving environments.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}