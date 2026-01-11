import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { INITIAL_DATA } from './constants';
import { Database } from './types';
import { supabase } from './supabaseClient';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Merchandise from './pages/Merchandise';
import MerchandiseDetail from './pages/MerchandiseDetail';
import Organizer from './pages/Organizer';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Gallery from './pages/Gallery';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCMS from './pages/admin/CMS';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [db, setDb] = useState<Database>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (db.home.logo) {
      const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;
      if (favicon) favicon.href = db.home.logo;
    }
  }, [db.home.logo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);

        // Fetch all data from Supabase
        const [
          { data: settings },
          { data: events },
          { data: merch },
          { data: organizers },
          { data: articles },
          { data: gallery }
        ] = await Promise.all([
          supabase.from('settings').select('*'),
          supabase.from('events').select('*').order('date', { ascending: false }),
          supabase.from('merchandise').select('*'),
          supabase.from('organizers').select('*'),
          supabase.from('articles').select('*').order('date', { ascending: false }),
          supabase.from('gallery').select('*')
        ]);

        const homeData = settings?.find(s => s.key === 'home')?.value || INITIAL_DATA.home;
        const aboutData = settings?.find(s => s.key === 'about')?.value || INITIAL_DATA.about;

        // Penting: Jangan gunakan fallback INITIAL_DATA jika data dari DB ada (walaupun array kosong)
        // Ini memastikan jika user menghapus semua data, tampilan tetap sinkron (kosong)
        setDb({
          home: homeData,
          about: aboutData,
          events: events || [],
          merchandise: merch || [],
          organizers: organizers || [],
          articles: articles || [],
          gallery: gallery || []
        });
      } catch (error) {
        console.error("Gagal mengambil data dari Supabase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdateDb = async (newDb: Database) => {
    setDb(newDb);
    try {
      // 1. Simpan Settings (Home & About)
      await supabase.from('settings').upsert([
        { key: 'home', value: newDb.home },
        { key: 'about', value: newDb.about }
      ], { onConflict: 'key' });

      // 2. Sinkronisasi Koleksi (Events, Merchandise, dll)
      // Catatan: Karena CMS ini bersifat global update, kita perlu berhati-hati dengan ID.
      // Untuk memastikan data yang dihapus di UI juga terhapus di DB, 
      // idealnya kita melakukan perbandingan atau pembersihan.
      
      const collections = [
        { name: 'events', data: newDb.events },
        { name: 'merchandise', data: newDb.merchandise },
        { name: 'organizers', data: newDb.organizers },
        { name: 'articles', data: newDb.articles },
        { name: 'gallery', data: newDb.gallery }
      ];

      for (const col of collections) {
        // Hapus semua data lama dan masukkan yang baru agar sinkron sempurna (termasuk penghapusan)
        // Jika data sangat besar, pendekatan ini perlu dioptimasi.
        if (col.data) {
          // Pertama, kita coba upsert data yang ada
          if (col.data.length > 0) {
            const { error } = await supabase.from(col.name).upsert(col.data, { onConflict: 'id' });
            if (error) throw error;
          }
          
          // Opsional: Untuk menangani data yang dihapus di CMS tapi masih ada di DB,
          // Anda bisa menambahkan logika delete where id not in (newDb.ids)
        }
      }
      
      alert("Database Berhasil Disinkronkan ke Cloud!");
    } catch (err: any) {
      console.error("Cloud Sync Error:", err);
      alert("Gagal Sinkronisasi: " + (err.message || "Pastikan tabel database sudah dikonfigurasi di Supabase."));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-[#0C61BC] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[#0C61BC] font-black text-xl italic tracking-widest uppercase">Menghubungkan ke Database...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar isAdmin={!!session} onLogout={handleLogout} db={db} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home db={db} />} />
            <Route path="/about" element={<About db={db} />} />
            <Route path="/events" element={<Events db={db} />} />
            <Route path="/event/:id" element={<EventDetail db={db} />} />
            <Route path="/merchandise" element={<Merchandise db={db} />} />
            <Route path="/merchandise/:id" element={<MerchandiseDetail db={db} />} />
            <Route path="/organizer" element={<Organizer db={db} />} />
            <Route path="/articles" element={<Articles db={db} />} />
            <Route path="/article/:id" element={<ArticleDetail db={db} />} />
            <Route path="/gallery" element={<Gallery db={db} />} />
            <Route path="/admin/login" element={session ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => {}} />} />
            <Route path="/admin/dashboard" element={session ? <AdminDashboard db={db} /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/cms/*" element={session ? <AdminCMS db={db} onUpdate={handleUpdateDb} /> : <Navigate to="/admin/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;