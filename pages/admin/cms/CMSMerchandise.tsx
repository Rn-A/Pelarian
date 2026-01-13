import React, { useState } from 'react';
import { Database, Product } from '../../../types';
import { supabase } from '../../../supabaseClient';

interface CMSMerchandiseProps {
  db: Database;
  onUpdate: (db: Database) => void;
}

const CMSMerchandise: React.FC<CMSMerchandiseProps> = ({ db, onUpdate }) => {
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const readers = Array.from(files).map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file as Blob);
        });
      });
      Promise.all(readers).then(images => {
        setEditing(prev => ({ ...prev, images: [...(prev?.images || []), ...images] }));
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setIsSaving(true);

    try {
      const newProduct = { 
        ...editing, 
        id: editing.id || 'm' + Date.now().toString() 
      } as Product;

      let newList: Product[];
      if (editing.id) {
        newList = db.merchandise.map(p => p.id === editing.id ? newProduct : p);
      } else {
        newList = [...db.merchandise, newProduct];
      }

      await onUpdate({ ...db, merchandise: newList });
      setEditing(null);
    } catch (err) {
      alert("Gagal menyimpan produk.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus produk ini secara permanen?')) {
      try {
        const { error } = await supabase.from('merchandise').delete().eq('id', id);
        if (error) throw error;
        onUpdate({ ...db, merchandise: db.merchandise.filter(m => m.id !== id) });
      } catch (err) {
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Manage <span className="text-[#0C61BC]">Merchandise</span></h2>
        {!editing && (
          <button 
            onClick={() => setEditing({ name: '', images: [], price: 0, status: 'open', description: '', specifications: '', sizes: '', poPeriod: '', productionEstimation: '', gformLink: '', whatsappLink: '', poNotes: '' })}
            className="bg-[#0C61BC] hover:bg-white hover:text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg uppercase text-xs tracking-widest"
          >
            + Tambah Produk
          </button>
        )}
      </div>

      {editing ? (
        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 mb-10 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-[#0C61BC] uppercase tracking-tighter">Produk Detail</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Nama Produk</label>
              <input type="text" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" 
                value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Harga (Rp)</label>
              <input type="number" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" 
                value={editing.price} onChange={e => setEditing({...editing, price: Number(e.target.value)})} />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Status</label>
              <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" 
                value={editing.status} onChange={e => setEditing({...editing, status: e.target.value as any})}>
                <option value="open">Open Pre-Order</option>
                <option value="close">Closed</option>
              </select>
            </div>
            <div className="col-span-full">
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Upload Gambar Produk</label>
              <input type="file" multiple accept="image/*" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white file:bg-[#0C61BC] file:border-0 file:rounded-full file:text-white file:px-4 file:py-1 file:mr-4 file:text-[10px] file:font-black" 
                onChange={handleFileChange} />
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                {editing.images?.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} className="h-24 w-24 object-cover rounded-lg border border-white/10" alt="" />
                    <button 
                      type="button"
                      onClick={() => setEditing(prev => ({ ...prev, images: prev?.images?.filter((_, i) => i !== idx) }))}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black"
                    >X</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-full">
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Deskripsi Produk</label>
              <textarea className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" rows={3} 
                value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
            </div>
            <div className="col-span-full flex gap-4 pt-6">
              <button type="submit" disabled={isSaving} className="flex-1 bg-[#0C61BC] px-10 py-4 rounded-xl font-black text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest disabled:opacity-50">
                {isSaving ? 'MENGUPLOAD...' : 'SIMPAN PRODUK'}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="flex-1 bg-gray-800 px-10 py-4 rounded-xl font-black uppercase tracking-widest">BATAL</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {db.merchandise.map(item => (
            <div key={item.id} className="bg-[#1a1a1a] p-6 rounded-[2rem] flex flex-col border border-white/5 hover:border-[#0C61BC]/30 transition-all shadow-xl">
              <img src={item.images[0] || 'https://via.placeholder.com/300'} className="w-full h-48 object-cover rounded-2xl mb-4" alt="" />
              <h4 className="font-black text-lg uppercase tracking-tight">{item.name}</h4>
              <p className="text-[#0C61BC] font-black mb-4">Rp {item.price.toLocaleString('id-ID')}</p>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => setEditing(item)} className="flex-1 py-3 bg-[#0C61BC]/10 text-[#0C61BC] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0C61BC] hover:text-white transition-all">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="flex-1 py-3 bg-red-600/10 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Hapus</button>
              </div>
            </div>
          ))}
          {db.merchandise.length === 0 && <p className="col-span-full text-center text-gray-600 py-10 uppercase font-bold text-xs">Belum ada produk di database.</p>}
        </div>
      )}
    </div>
  );
};

export default CMSMerchandise;