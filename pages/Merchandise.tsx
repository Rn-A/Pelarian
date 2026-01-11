
import React from 'react';
import { Database } from '../types';
import { Link } from 'react-router-dom';

const Merchandise: React.FC<{ db: Database }> = ({ db }) => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="bg-[#050505] py-20 text-center border-b border-white/5">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">OFFICIAL <span className="text-[#0C61BC]">MERCHANDISE</span></h1>
        <p className="text-gray-400 mt-4">Koleksi eksklusif dari Pelarian Running Clan</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {db.merchandise.map(item => (
            <Link key={item.id} to={`/merchandise/${item.id}`} className="group flex flex-col">
              <div className="relative aspect-[4/5] bg-[#111] rounded-3xl overflow-hidden mb-6 border border-white/5 shadow-xl">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'open' ? 'bg-[#0C61BC] text-white' : 'bg-gray-700 text-gray-400'}`}>
                  {item.status === 'open' ? 'Open PO' : 'Closed'}
                </div>
              </div>
              
              <div className="px-2">
                <h3 className="text-xl font-bold mb-1 group-hover:text-[#0C61BC] transition-colors uppercase tracking-tight">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-1">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-[#0C61BC]">Rp {item.price.toLocaleString('id-ID')}</span>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">Lihat Detail →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
