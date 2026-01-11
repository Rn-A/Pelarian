
import React from 'react';
import { Database } from '../types';

const Organizer: React.FC<{ db: Database }> = ({ db }) => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">THE <span className="text-[#0C61BC]">ORGANIZERS</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Tim di balik layar yang menggerakkan roda komunitas Pelarian Running Clan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {db.organizers.map(member => (
            <a 
              key={member.id} 
              href={member.instagramLink} 
              target="_blank" 
              className="group bg-[#1a1a1a] rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#0C61BC] transition-all transform hover:-translate-y-2 shadow-2xl"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#0C61BC] font-bold text-sm uppercase tracking-widest">{member.position}</p>
                </div>
              </div>
              <div className="p-6 flex justify-between items-center bg-black/40">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">View Profile</span>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#0C61BC] group-hover:translate-x-1 transition-all" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organizer;
