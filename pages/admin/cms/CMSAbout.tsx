
import React, { useState } from 'react';
import { Database } from '../../../types';
import ReactQuill from 'react-quill-new';

interface CMSAboutProps {
  db: Database;
  onUpdate: (db: Database) => void;
}

const CMSAbout: React.FC<CMSAboutProps> = ({ db, onUpdate }) => {
  const [formData, setFormData] = useState(db.about);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, bannerImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...db, about: formData });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter italic">Edit <span className="text-[#0C61BC]">About Content</span></h2>
      
      <form onSubmit={handleSubmit} className="bg-[#111] p-10 rounded-[3rem] border border-white/5 space-y-10 shadow-2xl">
        <div className="space-y-8">
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Banner Image</label>
            <input 
              type="file" 
              accept="image/*"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#0C61BC] file:text-white"
              onChange={handleFileChange}
            />
            {formData.bannerImage && (
              <img src={formData.bannerImage} className="mt-4 h-32 w-full object-cover rounded-xl border border-white/10" alt="Preview" />
            )}
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Hero Title</label>
            <input 
              type="text" 
              className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#0C61BC] outline-none font-bold"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Deskripsi Tentang Kami (Editor)</label>
            <div className="bg-black rounded-xl overflow-hidden min-h-[250px]">
              <ReactQuill 
                theme="snow"
                value={formData.description}
                onChange={(content: string) => setFormData({...formData, description: content})}
                modules={quillModules}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-black/40 rounded-[2rem] border border-white/5">
            <div>
              <label className="block text-[10px] font-black text-[#0C61BC] uppercase tracking-widest mb-2">Anggota Aktif</label>
              <input 
                type="text" 
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#0C61BC] outline-none font-black italic"
                value={formData.activeMembers}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, activeMembers: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#0C61BC] uppercase tracking-widest mb-2">Event Terlaksana</label>
              <input 
                type="text" 
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#0C61BC] outline-none font-black italic"
                value={formData.completedEvents}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, completedEvents: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Visi</label>
              <textarea 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none h-24"
                value={formData.vision}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, vision: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Misi</label>
              <textarea 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none h-24"
                value={formData.mission}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, mission: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Sejarah</label>
            <textarea 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none h-24"
              value={formData.history}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, history: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Filosofi Lari</label>
            <textarea 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none h-24 italic"
              value={formData.philosophy}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, philosophy: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#0C61BC] hover:bg-white hover:text-black px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-[#0C61BC]/20 uppercase tracking-widest"
        >
            SIMPAN SEMUA PERUBAHAN
          </button>
        </form>
      </div>
  );
};

export default CMSAbout;
