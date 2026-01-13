import React, { useState } from 'react';
import { Database, Event } from '../../../types';
import ReactQuill from 'react-quill-new';
import { supabase } from '../../../supabaseClient';

interface CMSEventsProps { db: Database; onUpdate: (db: Database) => void; }

const CMSEvents: React.FC<CMSEventsProps> = ({ db, onUpdate }) => {
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const readers = Array.from(files).map(f => new Promise<string>((res) => {
        const r = new FileReader(); 
        r.onloadend = () => res(r.result as string); 
        r.readAsDataURL(f as Blob);
      }));
      Promise.all(readers).then(imgs => setEditingEvent(p => ({ ...p, images: [...(p?.images || []), ...imgs] })));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!editingEvent) return;
    setIsSaving(true);
    
    try {
      const newEvent = { 
        ...editingEvent, 
        id: editingEvent.id || Date.now().toString() 
      } as Event;

      let updatedEvents: Event[];
      if (editingEvent.id) {
        updatedEvents = db.events.map(ev => ev.id === editingEvent.id ? newEvent : ev);
      } else {
        updatedEvents = [...db.events, newEvent];
      }

      await onUpdate({ ...db, events: updatedEvents }); 
      setEditingEvent(null);
    } catch (err) {
      alert("Gagal menyimpan data ke Supabase.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus event ini secara permanen dari database?')) {
      try {
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) throw error;
        onUpdate({ ...db, events: db.events.filter(e => e.id !== id) });
      } catch (err) {
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Manage <span className="text-[#0C61BC]">Events</span></h2>
        {!editingEvent && (
          <button 
            onClick={() => setEditingEvent({ title: '', category: 'General', images: [], date: '', time: '', location: '', description: '', status: 'ongoing', gformLink: '', slots: '' })} 
            className="bg-[#0C61BC] hover:bg-white hover:text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all"
          >
            + Tambah Event
          </button>
        )}
      </div>
      {editingEvent ? (
        <form onSubmit={handleSave} className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-2xl">
          <div className="col-span-full">
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Judul Event</label>
            <input type="text" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" value={editingEvent.title || ''} onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Tanggal</label>
            <input type="date" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" value={editingEvent.date || ''} onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Kategori</label>
            <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" value={editingEvent.category || ''} onChange={(e) => setEditingEvent({...editingEvent, category: e.target.value})} />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Waktu</label>
            <input type="time" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" value={editingEvent.time || ''} onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})} />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Kuota Slots</label>
            <input type="text" placeholder="e.g. 100 Peserta" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0C61BC] outline-none" value={editingEvent.slots || ''} onChange={(e) => setEditingEvent({...editingEvent, slots: e.target.value})} />
          </div>
          <div className="col-span-full">
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Upload Poster</label>
            <input type="file" multiple accept="image/*" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white file:bg-[#0C61BC] file:border-0 file:rounded-full file:text-white file:text-[10px] file:px-4" onChange={handleFileChange} />
          </div>
          <div className="col-span-full">
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Deskripsi Event</label>
            <div className="bg-black rounded-xl overflow-hidden min-h-[250px]"><ReactQuill theme="snow" value={editingEvent.description || ''} onChange={(c: string) => setEditingEvent({...editingEvent, description: c})} /></div>
          </div>
          <div className="col-span-full flex gap-4 pt-4">
            <button type="submit" disabled={isSaving} className="flex-1 bg-[#0C61BC] py-4 rounded-xl font-black uppercase text-white shadow-xl shadow-[#0C61BC]/20 disabled:opacity-50 transition-all">
              {isSaving ? 'SEDANG MENGUPLOAD...' : 'SIMPAN KE DATABASE'}
            </button>
            <button type="button" onClick={() => setEditingEvent(null)} className="flex-1 bg-gray-800 py-4 rounded-xl font-black uppercase text-white hover:bg-gray-700">BATAL</button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {db.events.map(event => (
            <div key={event.id} className="bg-[#1a1a1a] p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:border-[#0C61BC]/30 transition-all shadow-lg">
              <div className="flex items-center gap-4">
                <img src={event.images[0] || 'https://via.placeholder.com/150'} className="w-12 h-12 rounded-lg object-cover" alt="" />
                <div>
                   <h4 className="font-bold uppercase tracking-tight text-white">{event.title}</h4>
                   <p className="text-[10px] font-black text-gray-500 uppercase">{event.date} • {event.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingEvent(event)} className="p-3 bg-[#0C61BC]/10 text-[#0C61BC] rounded-lg text-[10px] font-black uppercase hover:bg-[#0C61BC] hover:text-white transition-all">Edit</button>
                <button onClick={() => handleDelete(event.id)} className="p-3 bg-red-600/10 text-red-500 rounded-lg text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">Hapus</button>
              </div>
            </div>
          ))}
          {db.events.length === 0 && <p className="text-center text-gray-600 py-10 uppercase font-bold text-xs">Belum ada data event di database.</p>}
        </div>
      )}
    </div>
  );
};

export default CMSEvents;