
import React, { useState } from 'react';
import { Database } from '../../../types';

interface CMSHomeProps {
  db: Database;
  onUpdate: (db: Database) => void;
}

const CMSHome: React.FC<CMSHomeProps> = ({ db, onUpdate }) => {
  const [formData, setFormData] = useState(db.home);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'bannerImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...db, home: formData });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Edit <span className="text-[#0C61BC]">Home Content</span></h2>
      
      <form onSubmit={handleSubmit} className="bg-[#111] p-10 rounded-[3rem] border border-white/5 space-y-8 shadow-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Logo Navbar</label>
            <input 
              type="file" 
              accept="image/*"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#0C61BC] file:text-white"
              onChange={(e) => handleFileChange(e, 'logo')}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Banner Utama</label>
            <input 
              type="file" 
              accept="image/*"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#0C61BC] file:text-white"
              onChange={(e) => handleFileChange(e, 'bannerImage')}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Nama Komunitas</label>
              <input 
                type="text" 
                className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#0C61BC] outline-none font-bold"
                value={formData.communityName}
                onChange={(e) => setFormData({...formData, communityName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Slogan</label>
              <input 
                type="text" 
                className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#0C61BC] outline-none font-bold"
                value={formData.slogan}
                onChange={(e) => setFormData({...formData, slogan: e.target.value})}
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#0C61BC] hover:bg-white hover:text-black px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-[#0C61BC]/20 uppercase tracking-widest"
        >
          SIMPAN PERUBAHAN
        </button>
      </form>
    </div>
  );
};

export default CMSHome;
