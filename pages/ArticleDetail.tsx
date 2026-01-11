
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Database } from '../types';

const ArticleDetail: React.FC<{ db: Database }> = ({ db }) => {
  const { id } = useParams();
  const article = db.articles.find(a => a.id === id);
  const relatedArticles = db.articles.filter(a => a.id !== id).slice(0, 5);

  if (!article) return <div className="p-20 text-center text-white">Artikel tidak ditemukan.</div>;

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <section className="relative h-[65vh] flex items-center justify-center">
        <img src={article.images[0]} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10 w-full text-center">
          <h1 className="text-3xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter mb-12 shadow-black drop-shadow-2xl break-words px-4">
            {article.title}
          </h1>
          
          <div className="bg-white/5 backdrop-blur-xl inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 px-6 md:px-10 py-4 md:py-5 rounded-3xl md:rounded-full border border-white/10 mx-auto shadow-2xl">
            <div className="flex items-center gap-4">
              <img src={article.authorPhoto} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0C61BC] object-cover" alt="" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-white tracking-tight">{article.authorName}</p>
                <p className="text-[10px] text-[#0C61BC] font-bold uppercase tracking-widest">{article.authorRole}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-gray-400">
               <span className="text-[10px] font-bold uppercase tracking-widest">{article.date}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 overflow-hidden">
            <div className="prose prose-invert prose-blue max-w-full overflow-hidden">
              <div 
                className="text-base md:text-lg text-gray-300 leading-relaxed font-normal break-words whitespace-pre-wrap selection:bg-[#0C61BC]" 
                dangerouslySetInnerHTML={{ __html: article.description }}
              ></div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 border border-white/5 shadow-2xl lg:sticky lg:top-32">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-8 md:mb-10 border-b border-white/10 pb-6 text-white">Artikel <span className="text-[#0C61BC]">Terkait</span></h3>
              
              <div className="space-y-8 md:space-y-12">
                {relatedArticles.map(rel => (
                  <Link key={rel.id} to={`/article/${rel.id}`} className="group block">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 md:mb-5 bg-[#111] border border-white/10 shadow-lg">
                      <img src={rel.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="" />
                    </div>
                    <h4 className="font-black text-white text-sm uppercase leading-tight group-hover:text-[#0C61BC] transition-colors tracking-tight">{rel.title}</h4>
                    <p className="text-gray-600 text-[10px] font-bold uppercase mt-3 tracking-widest">{rel.date}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">Bagikan</span>
                <div className="flex gap-3">
                   <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#111] text-white flex items-center justify-center hover:bg-[#0C61BC] transition-colors shadow-lg text-[10px] font-black uppercase">WA</button>
                   <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#111] text-white flex items-center justify-center hover:bg-[#0C61BC] transition-colors shadow-lg text-[10px] font-black uppercase">IG</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
