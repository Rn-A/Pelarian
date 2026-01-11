
import React, { useState } from 'react';
import { Database } from '../../../types';

interface CMSHomeProps { db: Database; onUpdate: (db: Database) => void; }

const CMSHome: React.FC<CMSHomeProps> = ({ db, onUpdate }) => {
  const [formData, setFormData] = useState(db.home);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'bannerImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...db, home: formData });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter italic">Edit <span className="text-[#0C61BC]">Home Content</span></h2>
      <form onSubmit={handleSubmit} className="bg-[#111] p-10 rounded-[3rem] border border-white/5 space-y-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Logo Navbar</label>
            <input type="file" accept="image/*" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white file:bg-[#0C61BC] file:border-0 file:rounded-full file:text-white file:text-[10px] file:px-4" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'logo')} />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Banner Utama</label>
            <input type="file" accept="image/*" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white file:bg-[#0C61BC] file:border-0 file:rounded-full file:text-white file:text-[10px] file:px-4" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'bannerImage')} />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Nama Komunitas</label>
            <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-white font-bold" value={formData.communityName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, communityName: e.target.value})} />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Slogan</label>
            <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-white font-bold" value={formData.slogan} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, slogan: e.target.value})} />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#0C61BC] py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl shadow-[#0C61BC]/20">SIMPAN PERUBAHAN</button>
      </form>
    </div>
  );
};

export default CMSHome;
