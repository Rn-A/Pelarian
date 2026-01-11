
import React from 'react';
import { Database } from '../types';
import { Link } from 'react-router-dom';

const Events: React.FC<{ db: Database }> = ({ db }) => {
  return (
    <div className="bg-black min-h-screen">
      <div className="relative h-64 bg-black flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
        <h1 className="relative text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">EVENT <span className="text-[#0C61BC]">MENDATANG</span></h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {db.events.map(event => (
            <div key={event.id} className="bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5 flex flex-col group h-full shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-[#0C61BC] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{event.category}</div>
                {event.status === 'completed' && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xl font-black uppercase tracking-tighter">Completed</div>}
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight leading-none">{event.title}</h3>
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-widest">
                  <span className="text-[#0C61BC]">📅</span>
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-6 uppercase tracking-widest">
                  <span className="text-[#0C61BC]">📍</span>
                  <span>{event.location}</span>
                </div>
                <div className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: event.description }}></div>
                
                <div className="mt-auto">
                  <Link 
                    to={`/event/${event.id}`} 
                    className="block text-center w-full py-4 rounded-xl border-2 border-white/10 hover:border-[#0C61BC] hover:text-[#0C61BC] font-black text-sm uppercase transition-all tracking-widest"
                  >
                    Detail Event
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
