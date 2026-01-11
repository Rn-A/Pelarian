
import React, { useState } from 'react';
import { Database, GalleryAlbum } from '../../../types';

interface CMSGalleryProps {
  db: Database;
  onUpdate: (db: Database) => void;
}

const CMSGallery: React.FC<CMSGalleryProps> = ({ db, onUpdate }) => {
  const [editing, setEditing] = useState<Partial<GalleryAlbum> | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditing(prev => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus album galeri ini?')) {
      onUpdate({ ...db, gallery: db.gallery.filter(g => g.id !== id) });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    let newList = [...db.gallery];
    if (editing.id) {
      newList = newList.map(g => g.id === editing.id ? (editing as GalleryAlbum) : g);
    } else {
      newList.push({ ...editing, id: 'g' + Date.now().toString() } as GalleryAlbum);
    }

    onUpdate({ ...db, gallery: newList });
    setEditing(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Manage <span className="text-[#0C61BC]">Gallery</span></h2>
        {!editing && (
          <button 
            onClick={() => setEditing({ title: '', coverImage: '', gdriveLink: '' })}
            className="bg-[#0C61BC] hover:bg-white hover:text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#0C61BC]/20 uppercase text-xs tracking-widest"
          >
            + Tambah Album Baru
          </button>
        )}
      </div>

      {editing ? (
        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 mb-10 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-[#0C61BC] uppercase tracking-tighter italic">{editing.id ? 'Edit Album' : 'Album Baru'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Judul Album</label>
              <input type="text" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none font-bold" 
                value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Upload Gambar Sampul (Cover)</label>
              <input 
                type="file" 
                accept="image/*" 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white file:bg-[#0C61BC] file:border-0 file:rounded-full file:text-white file:px-4 file:py-1 file:mr-4 file:text-[10px] file:font-black" 
                onChange={handleFileChange} 
              />
              {editing.coverImage && (
                <div className="mt-4">
                  <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Pratinjau Sampul:</p>
                  <img src={editing.coverImage} className="w-full aspect-video rounded-2xl object-cover border-4 border-[#0C61BC] shadow-xl" alt="Preview" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Link Google Drive</label>
              <input type="url" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" 
                placeholder="https://drive.google.com/..."
                value={editing.gdriveLink} onChange={e => setEditing({...editing, gdriveLink: e.target.value})} />
            </div>
            <div className="flex gap-4 pt-6 border-t border-white/5">
              <button type="submit" className="flex-1 bg-[#0C61BC] px-8 py-4 rounded-xl font-black text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest shadow-lg shadow-[#0C61BC]/20">SIMPAN ALBUM</button>
              <button type="button" onClick={() => setEditing(null)} className="flex-1 bg-gray-800 px-8 py-4 rounded-xl font-black text-white hover:bg-gray-700 transition-all uppercase tracking-widest">BATAL</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {db.gallery.map(album => (
            <div key={album.id} className="bg-[#1a1a1a] p-4 rounded-[2.5rem] border border-white/5 flex flex-col group hover:border-[#0C61BC]/50 transition-all shadow-xl">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <img src={album.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 shadow-md" />
              </div>
              <h4 className="font-black text-lg mb-6 truncate uppercase tracking-tight px-2 group-hover:text-[#0C61BC] transition-colors">{album.title}</h4>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => setEditing(album)} className="flex-1 py-3 bg-[#0C61BC]/10 text-[#0C61BC] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0C61BC] hover:text-white transition-all">Edit</button>
                <button onClick={() => handleDelete(album.id)} className="flex-1 py-3 bg-red-600/10 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CMSGallery;
