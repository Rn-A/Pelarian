
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Database } from '../types';

const MerchandiseDetail: React.FC<{ db: Database }> = ({ db }) => {
  const { id } = useParams();
  const product = db.merchandise.find(m => m.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return <div className="p-20 text-center text-white">Produk tidak ditemukan.</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="aspect-square bg-[#111] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImg(idx)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-4 flex-shrink-0 transition-all ${activeImg === idx ? 'border-[#0C61BC]' : 'border-transparent opacity-40'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <span className={`inline-block px-4 py-1.5 text-xs font-black rounded-full mb-4 uppercase tracking-widest ${product.status === 'open' ? 'bg-[#0C61BC] text-white' : 'bg-gray-800 text-gray-500'}`}>
                {product.status === 'open' ? 'Open Pre-Order' : 'PO Closed'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter leading-none">{product.name}</h1>
              <p className="text-3xl font-black text-[#0C61BC]">Rp {product.price.toLocaleString('id-ID')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-[#111] p-6 rounded-3xl border border-white/5">
                <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Ukuran Tersedia</h4>
                <p className="font-bold text-lg">{product.sizes || '-'}</p>
              </div>
              <div className="bg-[#111] p-6 rounded-3xl border border-white/5">
                <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Periode PO</h4>
                <p className="font-bold text-lg">{product.poPeriod || '-'}</p>
              </div>
            </div>
            
            <div className="mb-10">
              <h4 className="text-xs font-black uppercase text-[#0C61BC] mb-4 tracking-widest">Deskripsi</h4>
              <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
            </div>

            {product.poNotes && (
               <div className="bg-[#0C61BC]/10 p-6 rounded-3xl border border-[#0C61BC]/20 mb-10">
                  <h4 className="text-[10px] font-black uppercase text-[#0C61BC] tracking-widest mb-1">Catatan Penting</h4>
                  <p className="text-[#0C61BC] font-medium text-sm italic">"{product.poNotes}"</p>
               </div>
            )}

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <a 
                href={product.gformLink} 
                target="_blank"
                className={`flex-1 text-center py-5 rounded-full font-black text-lg transition-all transform hover:-translate-y-1 shadow-2xl ${product.status === 'open' ? 'bg-[#0C61BC] text-white hover:bg-white hover:text-black' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
              >
                {product.status === 'open' ? 'PESAN SEKARANG' : 'DITUTUP'}
              </a>
              <a 
                href={product.whatsappLink} 
                target="_blank"
                className="flex-1 text-center py-5 rounded-full font-black text-lg border-2 border-white/10 hover:border-[#0C61BC] hover:text-[#0C61BC] transition-all transform hover:-translate-y-1"
              >
                CHAT ADMIN
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchandiseDetail;
