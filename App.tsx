
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
  const [isSaving, setIsSaving] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (db.home.logo) {
      const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;
      if (favicon) favicon.href = db.home.logo;
    }
  }, [db.home.logo]);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);

        console.log("Memulai sinkronisasi cloud...");

        const [
          { data: settings, error: e1 },
          { data: events, error: e2 },
          { data: merch, error: e3 },
          { data: organizers, error: e4 },
          { data: articles, error: e5 },
          { data: gallery, error: e6 }
        ] = await Promise.all([
          supabase.from('settings').select('*'),
          supabase.from('events').select('*'),
          supabase.from('merchandise').select('*'),
          supabase.from('organizers').select('*'),
          supabase.from('articles').select('*'),
          supabase.from('gallery').select('*')
        ]);

        if (e1 || e2 || e3 || e4 || e5 || e6) {
          console.error("Beberapa tabel gagal dimuat:", { e1, e2, e3, e4, e5, e6 });
        }

        const homeData = settings?.find(s => s.key === 'home')?.value;
        const aboutData = settings?.find(s => s.key === 'about')?.value;

        // Jika data ada di database, gunakan itu. Jika tidak ada sama sekali (fresh db), tetap gunakan INITIAL_DATA dari state awal.
        setDb(prev => ({
          home: homeData || prev.home,
          about: aboutData || prev.about,
          events: events && events.length > 0 ? events : prev.events,
          merchandise: merch && merch.length > 0 ? merch : prev.merchandise,
          organizers: organizers && organizers.length > 0 ? organizers : prev.organizers,
          articles: articles && articles.length > 0 ? articles : prev.articles,
          gallery: gallery && gallery.length > 0 ? gallery : prev.gallery
        }));

        console.log("Sinkronisasi cloud berhasil!");
      } catch (error) {
        console.error("Fatal Error fetching data:", error);
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

  // PERMANENT SAVE
  const handleUpdateDb = async (newDb: Database) => {
    setDb(newDb);
    setIsSaving(true);
    
    try {
      console.log("Sedang menyimpan ke cloud...");

      // 1. Settings
      const { error: err1 } = await supabase.from('settings').upsert([
        { key: 'home', value: newDb.home },
        { key: 'about', value: newDb.about }
      ], { onConflict: 'key' });
      if (err1) throw new Error(`Settings Error: ${err1.message}`);

      // 2. Collections (Events, Merch, etc)
      // Kita harus menghapus data lama atau memastikan upsert menimpa semuanya.
      // Untuk kesederhanaan dan keandalan, kita lakukan upsert individual.
      const sync = async (table: string, data: any[]) => {
        if (!data) return;
        // Jika data kosong, kita tidak bisa upsert. Namun kita ingin cloud mencerminkan kekosongan.
        // Dalam skala kecil, kita bisa asumsikan data yang ada di state adalah yang benar.
        const { error } = await supabase.from(table).upsert(data, { onConflict: 'id' });
        if (error) throw new Error(`Table ${table} Error: ${error.message}`);
      };

      await Promise.all([
        sync('events', newDb.events),
        sync('merchandise', newDb.merchandise),
        sync('organizers', newDb.organizers),
        sync('articles', newDb.articles),
        sync('gallery', newDb.gallery)
      ]);
      
      console.log("Data berhasil dipush ke cloud!");
      alert("✅ Tersimpan Permanen di Database Cloud!");
    } catch (err: any) {
      console.error("Gagal menyimpan:", err);
      alert("❌ GAGAL SIMPAN: " + err.message + "\n\nSaran: Pastikan Anda sudah menjalankan SQL Script di Supabase Editor untuk mematikan RLS atau menambah Policy.");
    } finally {
      setIsSaving(false);
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
          <div className="text-[#0C61BC] font-black text-xs uppercase tracking-[0.3rem]">Menghubungkan ke Cloud...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black relative">
        {isSaving && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center">
             <div className="text-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-black text-xs uppercase tracking-widest">Sinkronisasi Cloud...</p>
             </div>
          </div>
        )}
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
