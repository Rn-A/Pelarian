
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Database } from '../types';

const EventDetail: React.FC<{ db: Database }> = ({ db }) => {
  const { id } = useParams();
  const event = db.events.find(e => e.id === id);

  if (!event) return <div className="p-20 text-center text-white">Event tidak ditemukan.</div>;

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-12 md:pb-24 overflow-hidden">
        <img src={event.images[0]} alt={event.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-[#0C61BC] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{event.category}</span>
             <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${event.status === 'ongoing' ? 'bg-green-600' : 'bg-gray-700'}`}>{event.status}</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black mb-8 leading-none tracking-tighter uppercase break-words">{event.title}</h1>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          <div className="lg:col-span-2 overflow-hidden">
            <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
              TENTANG <span className="text-[#0C61BC]">EVENT</span>
            </h3>
            <div className="space-y-6 leading-relaxed text-base md:text-lg text-gray-300 break-words prose prose-invert" dangerouslySetInnerHTML={{ __html: event.description }}></div>
          </div>

          <div className="relative">
            <div className="bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 lg:sticky lg:top-32 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-black mb-8 md:mb-10 uppercase tracking-tight text-center">INFORMASI <span className="text-[#0C61BC]">DAFTAR</span></h3>
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-gray-500 font-black text-[10px] uppercase tracking-widest">Kuota Slot</span>
                    <span className="font-bold text-sm text-[#0C61BC]">{event.slots || 'Terbatas'}</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-gray-500 font-black text-[10px] uppercase tracking-widest">Waktu</span>
                    <span className="font-bold text-sm">{event.date} • {event.time}</span>
                 </div>
              </div>

              {event.status === 'ongoing' ? (
                <a href={event.gformLink} target="_blank" className="block text-center w-full bg-[#0C61BC] hover:bg-white hover:text-black py-4 rounded-full font-black text-lg transition-all shadow-xl shadow-[#0C61BC]/20">
                  DAFTAR SEKARANG
                </a>
              ) : (
                <div className="text-center py-4 bg-white/5 rounded-full text-gray-600 font-black uppercase text-sm">EVENT SELESAI</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;
