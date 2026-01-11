
import React from 'react';
import { Database } from '../types';

const About: React.FC<{ db: Database }> = ({ db }) => {
  const { about } = db;

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src={about.bannerImage} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]" alt="About Pelarian" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <p className="text-[#0C61BC] font-black tracking-[0.4rem] uppercase mb-4 text-xs md:text-sm">TENTANG KAMI</p>
          <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
            {about.title}
          </h1>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-8 italic border-l-8 border-[#0C61BC] pl-6">
                SIAPA <span className="text-[#0C61BC]">KAMI?</span>
              </h2>
              <div className="text-gray-400 leading-relaxed text-lg md:text-xl prose prose-invert prose-blue" dangerouslySetInnerHTML={{ __html: about.description }}></div>
            </div>

            <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter text-[#0C61BC] italic">Sejarah Kami</h3>
              <p className="text-gray-300 leading-relaxed italic">"{about.history}"</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="bg-[#111] p-12 rounded-[3.5rem] border border-white/5 transform hover:scale-105 transition-all duration-500 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/5 group-hover:text-[#0C61BC]/10 transition-colors">V</div>
               <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Visi</h3>
               <p className="text-gray-400 text-lg leading-relaxed relative z-10">{about.vision}</p>
            </div>

            <div className="bg-[#0C61BC] p-12 rounded-[3.5rem] text-white transform hover:scale-105 transition-all duration-500 shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 text-8xl font-black text-black/5 group-hover:text-black/10 transition-colors">M</div>
               <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Misi</h3>
               <p className="text-white/90 text-lg leading-relaxed relative z-10 font-medium">{about.mission}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-[#111] p-8 rounded-3xl text-center border border-white/5">
                  <p className="text-3xl md:text-4xl font-black text-[#0C61BC] mb-2 tracking-tighter italic">{about.activeMembers}</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Anggota Aktif</p>
               </div>
               <div className="bg-[#111] p-8 rounded-3xl text-center border border-white/5">
                  <p className="text-3xl md:text-4xl font-black text-[#0C61BC] mb-2 tracking-tighter italic">{about.completedEvents}</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Event Terlaksana</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#050505] border-y border-white/5">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 italic">FILOSOFI <span className="text-[#0C61BC]">LARI</span></h2>
            <p className="text-xl md:text-2xl text-gray-500 font-bold leading-relaxed italic uppercase tracking-tight">
               "{about.philosophy}"
            </p>
         </div>
      </section>
    </div>
  );
};

export default About;
