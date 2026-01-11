import React from 'react';
import { Database } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC<{ db: Database }> = ({ db }) => {
  const { home, events, about } = db;

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={home.bannerImage || "https://images.unsplash.com/photo-1554284126-aa88f22d8b74"} 
            alt="Hero Banner" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_infinite]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="overflow-hidden mb-4">
            <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-none uppercase text-reveal">
              <span className="text-white">PELARIAN</span>
              <span className="text-[#0C61BC]">RC</span>
            </h1>
          </div>
          
          <p className="text-sm md:text-xl font-medium tracking-[0.3rem] text-gray-400 mb-12 uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {home.slogan ? home.slogan.split(' • ').join('  •  ') : 'RUN • CONNECT • INSPIRE'}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-in fade-in zoom-in duration-1000 delay-300">
            <a 
              href="https://www.strava.com/clubs/pelarianrc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#0C61BC] hover:bg-white hover:text-black px-10 py-4 rounded-full text-lg font-black text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#0C61BC]/20 uppercase"
            >
              Join Strava Club
            </a>
            <Link 
              to="/events" 
              className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-full text-lg font-black transition-all transform hover:scale-105 active:scale-95 uppercase"
            >
              Agenda Terbaru
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Slogan */}
      <div className="bg-[#0C61BC] py-6 overflow-hidden border-y border-white/10 transform -rotate-1 relative z-20">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-3xl md:text-5xl font-black text-white/30 mx-8 italic uppercase tracking-tighter">
              RUN CONNECT INSPIRE • PELARIAN RC • 
            </span>
          ))}
        </div>
      </div>

      {/* About Snippet Section */}
      <section className="py-32 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <p className="text-[#0C61BC] font-black tracking-[0.3rem] uppercase text-xs mb-3">// WHO WE ARE</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none italic">
                {about.title || 'MENGALIR DALAM SETIAP LANGKAH'}
              </h2>
              <div 
                className="text-gray-400 text-lg leading-relaxed mb-10 prose prose-invert prose-blue line-clamp-4" 
                dangerouslySetInnerHTML={{ __html: about.description }}
              ></div>
              <Link 
                to="/about" 
                className="inline-block bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0C61BC] hover:text-white transition-all transform hover:translate-x-2"
              >
                Kenali Kami Lebih Dekat →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right duration-1000">
              <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 group hover:border-[#0C61BC]/50 transition-all shadow-2xl">
                <p className="text-4xl md:text-5xl font-black text-[#0C61BC] mb-2 italic tracking-tighter">{about.activeMembers || '200+'}</p>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2rem]">Anggota Aktif</p>
              </div>
              <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 group hover:border-[#0C61BC]/50 transition-all shadow-2xl">
                <p className="text-4xl md:text-5xl font-black text-[#0C61BC] mb-2 italic tracking-tighter">{about.completedEvents || '50+'}</p>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2rem]">Event Sukses</p>
              </div>
              <div className="col-span-full bg-[#0C61BC]/10 p-10 rounded-[3rem] border border-[#0C61BC]/20">
                <h4 className="text-[10px] font-black text-[#0C61BC] uppercase tracking-[0.2rem] mb-4">Misi Utama Kami:</h4>
                <p className="text-white text-lg font-bold italic leading-snug">"{about.mission || 'Menyelenggarakan kegiatan lari rutin yang aman dan menyenangkan.'}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Mendatang Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-[#0C61BC] font-black tracking-[0.3rem] uppercase text-xs mb-3">// READY TO RUN?</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Event <span className="text-[#0C61BC]">Mendatang</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {events && events.length > 0 ? (
              events.slice(0, 3).map(event => (
                <Link key={event.id} to={`/event/${event.id}`} className="group relative h-[550px] rounded-[3rem] overflow-hidden border border-white/5 bg-[#111] transition-all hover:border-[#0C61BC]/30 shadow-2xl">
                  <img 
                    src={event.images[0] || "https://images.unsplash.com/photo-1552674605-db6ffd4facb5"} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-10 left-10 right-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter leading-tight italic">{event.title}</h3>
                    <div className="flex justify-between items-center mb-8 border-t border-white/10 pt-4">
                      <p className="text-[#0C61BC] font-bold text-[10px] tracking-[0.2rem] uppercase">{event.date}</p>
                      <span className="text-[9px] font-black uppercase bg-[#0C61BC] px-3 py-1 rounded-full shadow-lg">
                        {event.slots || 'Terbatas'}
                      </span>
                    </div>
                    <span className="inline-block w-full text-center bg-white/10 backdrop-blur-md border border-white/10 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase group-hover:bg-[#0C61BC] group-hover:border-[#0C61BC] transition-all duration-300 tracking-widest">
                      Lihat Detail
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-gray-500 font-bold uppercase tracking-widest">Belum ada event mendatang.</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link to="/events" className="inline-block text-xs font-black uppercase tracking-[0.3rem] text-gray-500 hover:text-[#0C61BC] transition-colors border-b border-gray-800 pb-2">
              Lihat Agenda Lengkap →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;