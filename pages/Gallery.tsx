
import React from 'react';
import { Database } from '../types';

const Gallery: React.FC<{ db: Database }> = ({ db }) => {
  return (
    <div className="bg-black min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">GALERI <span className="text-[#0C61BC]">ALBUM</span></h1>
          <p className="text-gray-400">Jelajahi dokumentasi lengkap kegiatan kami di Google Drive.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {db.gallery.map(album => (
            <a 
              key={album.id} 
              href={album.gdriveLink} 
              target="_blank" 
              className="group relative aspect-square rounded-[2rem] overflow-hidden bg-[#1a1a1a] shadow-2xl"
            >
              <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/40 transition-all"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#0C61BC] transition-colors leading-tight mb-2 uppercase tracking-tighter">{album.title}</h3>
                <div className="flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Buka di GDrive</span>
                   <svg className="w-4 h-4 text-[#0C61BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
