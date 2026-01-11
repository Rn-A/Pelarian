
import React from 'react';
import { Database } from '../types';
import { Link } from 'react-router-dom';

const Articles: React.FC<{ db: Database }> = ({ db }) => {
  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <div className="relative py-24 px-4 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549576490-b0b4831ef60a')] bg-cover bg-center opacity-20 blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">ARTIKEL & <span className="text-[#0C61BC]">BERITA</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Tips, laporan kegiatan, dan cerita inspiratif seputar dunia lari.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {db.articles.map(article => (
            <Link key={article.id} to={`/article/${article.id}`} className="flex flex-col group bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all shadow-xl">
              <div className="h-56 overflow-hidden">
                <img src={article.images[0]} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#0C61BC]/10 text-[#0C61BC] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{article.category}</span>
                  <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">{article.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-[#0C61BC] transition-colors">{article.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-6">{article.description?.replace(/<[^>]*>?/gm, '')}</p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={article.authorPhoto} alt="" className="w-10 h-10 rounded-full border border-white/10" />
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">{article.authorName}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{article.authorRole}</p>
                    </div>
                  </div>
                  <span className="text-[#0C61BC] font-black uppercase text-xs tracking-widest">Baca →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
