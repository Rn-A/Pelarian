
import React from 'react';
import { Database } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC<{ db: Database }> = ({ db }) => {
  const { home, events, merchandise, organizers, articles, gallery } = db;

  return (
    <div className="bg-black text-white">
      {/* Hero Section - Text scale reduced for better UX */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={home.bannerImage} alt="Hero Banner" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-[8rem] font-black mb-4 tracking-tighter leading-none uppercase">
            <span className="text-white">PELARIAN</span>
            <span className="text-[#0C61BC]">RC</span>
          </h1>
          <p className="text-sm md:text-xl font-medium tracking-[0.3rem] text-gray-400 mb-12 uppercase">
            {home.slogan.split(' • ').join('  •  ')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.strava.com/clubs/pelarianrc" target="_blank" rel="noopener noreferrer" className="bg-[#0C61BC] hover:bg-white hover:text-black px-10 py-4 rounded-full text-lg font-black text-white transition-all shadow-xl shadow-[#0C61BC]/20 uppercase">
              Join Strava Club
            </a>
            <Link to="/events" className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-full text-lg font-black transition-all uppercase">
              Agenda Terbaru
            </Link>
          </div>
        </div>
      </section>

      {/* Event Mendatang Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Event <span className="text-[#0C61BC]">Mendatang</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {events.slice(0, 3).map(event => (
              <Link key={event.id} to={`/event/${event.id}`} className="group relative h-[500px] rounded-3xl overflow-hidden border border-white/5 bg-[#111]">
                <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">{event.title}</h3>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-[#0C61BC] font-bold text-sm tracking-widest">{event.date}</p>
                    <span className="text-[10px] font-black uppercase bg-[#0C61BC] px-3 py-1 rounded-full">{event.slots || 'Terbatas'}</span>
                  </div>
                  <span className="inline-block w-full text-center bg-[#0C61BC] text-white px-6 py-3 rounded-lg font-black text-sm uppercase group-hover:bg-white group-hover:text-black transition-colors">Lihat Detail</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
