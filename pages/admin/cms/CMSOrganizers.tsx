
import React, { useState } from 'react';
import { Database, Organizer } from '../../../types';

interface CMSOrganizersProps {
  db: Database;
  onUpdate: (db: Database) => void;
}

const CMSOrganizers: React.FC<CMSOrganizersProps> = ({ db, onUpdate }) => {
  const [editing, setEditing] = useState<Partial<Organizer> | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditing(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus anggota organizer ini?')) {
      onUpdate({ ...db, organizers: db.organizers.filter(o => o.id !== id) });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    let newList = [...db.organizers];
    if (editing.id) {
      newList = newList.map(o => o.id === editing.id ? (editing as Organizer) : o);
    } else {
      newList.push({ ...editing, id: 'o' + Date.now().toString() } as Organizer);
    }

    onUpdate({ ...db, organizers: newList });
    setEditing(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Manage <span className="text-[#0C61BC]">Organizers</span></h2>
        {!editing && (
          <button 
            onClick={() => setEditing({ name: '', photo: '', position: '', instagramLink: '' })}
            className="bg-[#0C61BC] hover:bg-white hover:text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#0C61BC]/20"
          >
            + Tambah Anggota
          </button>
        )}
      </div>

      {editing ? (
        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 mb-10 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-[#0C61BC] uppercase tracking-tighter italic">{editing.id ? 'Edit Anggota' : 'Anggota Baru'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Nama Lengkap</label>
              <input type="text" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" 
                value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Jabatan</label>
              <input type="text" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" 
                value={editing.position} onChange={e => setEditing({...editing, position: e.target.value})} />
            </div>
            <div className="col-span-full">
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Upload Foto Profil</label>
              <input 
                type="file" 
                accept="image/*" 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white file:bg-[#0C61BC] file:border-0 file:rounded-full file:text-white file:px-4 file:py-1 file:mr-4 file:text-[10px] file:font-black" 
                onChange={handleFileChange} 
              />
              {editing.photo && (
                <div className="mt-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Pratinjau Foto:</p>
                  <img src={editing.photo} className="h-32 w-32 rounded-full object-cover border-4 border-[#0C61BC] shadow-xl" alt="Preview" />
                </div>
              )}
            </div>
            <div className="col-span-full">
              <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Link Instagram</label>
              <input type="url" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" 
                placeholder="https://instagram.com/username"
                value={editing.instagramLink} onChange={e => setEditing({...editing, instagramLink: e.target.value})} />
            </div>
            <div className="col-span-full flex gap-4 pt-6 border-t border-white/5">
              <button type="submit" className="flex-1 bg-[#0C61BC] px-8 py-4 rounded-xl font-black text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest shadow-lg shadow-[#0C61BC]/20">SIMPAN ANGGOTA</button>
              <button type="button" onClick={() => setEditing(null)} className="flex-1 bg-gray-800 px-8 py-4 rounded-xl font-black text-white hover:bg-gray-700 transition-all uppercase tracking-widest">BATAL</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {db.organizers.map(member => (
            <div key={member.id} className="bg-[#1a1a1a] p-6 rounded-[2.5rem] border border-white/5 flex flex-col items-center group hover:border-[#0C61BC]/50 transition-all shadow-xl">
              <img src={member.photo} alt="" className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-white/5 group-hover:border-[#0C61BC] transition-all shadow-md" />
              <h4 className="font-black text-center mb-1 text-lg uppercase tracking-tight">{member.name}</h4>
              <p className="text-[#0C61BC] text-[10px] font-black uppercase tracking-widest mb-6">{member.position}</p>
              <div className="flex gap-2 mt-auto w-full">
                <button onClick={() => setEditing(member)} className="flex-1 py-2.5 bg-[#0C61BC]/10 text-[#0C61BC] rounded-xl hover:bg-[#0C61BC] hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">Edit</button>
                <button onClick={() => handleDelete(member.id)} className="flex-1 py-2.5 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CMSOrganizers;
