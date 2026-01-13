import React, { useState } from 'react';
import { Database, Article } from '../../../types';
import ReactQuill from 'react-quill-new';

interface CMSArticlesProps { db: Database; onUpdate: (db: Database) => void; }

const CMSArticles: React.FC<CMSArticlesProps> = ({ db, onUpdate }) => {
  const [editing, setEditing] = useState<Partial<Article> | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'author' | 'main') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (type === 'author') {
        const reader = new FileReader();
        reader.onloadend = () => setEditing(p => ({ ...p, authorPhoto: reader.result as string }));
        // @google/genai fix: cast potentially unknown file element from FileList to Blob for readAsDataURL
        reader.readAsDataURL(files[0] as Blob);
      } else {
        const readers = Array.from(files).map(f => new Promise<string>((res) => {
          const r = new FileReader(); 
          r.onloadend = () => res(r.result as string); 
          // @google/genai fix: ensure each file in main images is treated as Blob for readAsDataURL
          r.readAsDataURL(f as Blob);
        }));
        Promise.all(readers).then(imgs => setEditing(p => ({ ...p, images: [...(p?.images || []), ...imgs] })));
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!editing) return;
    let list = [...db.articles];
    if (editing.id) {
      list = list.map(a => a.id === editing.id ? (editing as Article) : a);
    } else {
      list.push({ ...editing, id: 'a' + Date.now().toString() } as Article);
    }
    onUpdate({ ...db, articles: list }); 
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus artikel ini?')) {
      onUpdate({ ...db, articles: db.articles.filter(a => a.id !== id) });
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Manage <span className="text-[#0C61BC]">Articles</span></h2>
        {!editing && (
          <button 
            onClick={() => setEditing({ title: '', date: new Date().toISOString().split('T')[0], category: 'Tips Lari', authorName: '', authorPhoto: '', authorRole: 'Member', images: [], description: '' })} 
            className="bg-[#0C61BC] px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest"
          >
            + Tulis Artikel
          </button>
        )}
      </div>
      {editing ? (
        <form onSubmit={handleSave} className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-2xl">
          <div className="col-span-full">
            <label className="block text-[10px] text-gray-400 font-black uppercase mb-2">Judul Artikel</label>
            <input type="text" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={editing.title || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditing({...editing, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 font-black uppercase mb-2">Penulis</label>
            <input type="text" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white" value={editing.authorName || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditing({...editing, authorName: e.target.value})} />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 font-black uppercase mb-2">Gambar Utama</label>
            <input type="file" multiple accept="image/*" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 file:bg-[#0C61BC] file:border-0 file:rounded-full file:text-white file:text-[10px] file:px-4" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'main')} />
          </div>
          <div className="col-span-full">
            <label className="block text-[10px] text-gray-400 font-black uppercase mb-2">Konten</label>
            <div className="bg-black rounded-xl overflow-hidden min-h-[300px] shadow-inner"><ReactQuill theme="snow" value={editing.description || ''} onChange={(c: string) => setEditing({...editing, description: c})} /></div>
          </div>
          <div className="col-span-full flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-[#0C61BC] py-4 rounded-xl font-black uppercase text-white shadow-xl shadow-[#0C61BC]/20">PUBLISH</button>
            <button type="button" onClick={() => setEditing(null)} className="flex-1 bg-gray-800 py-4 rounded-xl font-black uppercase text-white">BATAL</button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {db.articles.map(article => (
            <div key={article.id} className="bg-[#1a1a1a] p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:border-[#0C61BC]/30 transition-all shadow-lg">
              <div className="flex items-center gap-4"><img src={article.images[0]} className="w-16 h-16 rounded-xl object-cover" alt="" /><h4 className="font-bold uppercase tracking-tight text-white">{article.title}</h4></div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(article)} className="p-3 bg-[#0C61BC]/10 text-[#0C61BC] rounded-lg text-[10px] font-black uppercase">Edit</button>
                <button onClick={() => handleDelete(article.id)} className="p-3 bg-red-600/10 text-red-500 rounded-lg text-[10px] font-black uppercase">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CMSArticles;