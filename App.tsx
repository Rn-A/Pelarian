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

  // Update favicon if logo changes
  useEffect(() => {
    if (db.home.logo) {
      const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;
      if (favicon) favicon.href = db.home.logo;
    }
  }, [db.home.logo]);

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);

        // Fetch parallel dari semua tabel
        const [
          { data: settings },
          { data: events },
          { data: merch },
          { data: organizers },
          { data: articles },
          { data: gallery }
        ] = await Promise.all([
          supabase.from('settings').select('*'),
          supabase.from('events').select('*'),
          supabase.from('merchandise').select('*'),
          supabase.from('organizers').select('*'),
          supabase.from('articles').select('*'),
          supabase.from('gallery').select('*')
        ]);

        // Mapping settings (Home & About disimpan di tabel settings dengan key unik)
        const homeData = settings?.find(s => s.key === 'home')?.value || INITIAL_DATA.home;
        const aboutData = settings?.find(s => s.key === 'about')?.value || INITIAL_DATA.about;

        // Update state dengan data dari database
        // Jika data null dari database (error fetch), gunakan INITIAL_DATA sebagai aman
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
        console.error("Gagal sinkronisasi data dari Supabase:", error);
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

  // UPDATE DATA TO SUPABASE (PERMANENT SAVE)
  const handleUpdateDb = async (newDb: Database) => {
    setDb(newDb); // Update local state dulu agar UI responsif
    
    try {
      // 1. Simpan Settings (Home & About)
      // Gunakan upsert dengan key agar menimpa data yang lama
      const { error: settingsError } = await supabase.from('settings').upsert([
        { key: 'home', value: newDb.home },
        { key: 'about', value: newDb.about }
      ], { onConflict: 'key' });

      if (settingsError) throw settingsError;

      // 2. Simpan Koleksi (Events, Merchandise, dll)
      // Kita melakukan sinkronisasi satu per satu
      const collections = [
        { name: 'events', data: newDb.events },
        { name: 'merchandise', data: newDb.merchandise },
        { name: 'organizers', data: newDb.organizers },
        { name: 'articles', data: newDb.articles },
        { name: 'gallery', data: newDb.gallery }
      ];

      for (const col of collections) {
        if (col.data && col.data.length > 0) {
          const { error } = await supabase.from(col.name).upsert(col.data, { onConflict: 'id' });
          if (error) throw error;
        }
      }
      
      alert("✅ Data Berhasil Disimpan Permanen ke Cloud!");
    } catch (err: any) {
      console.error("Cloud Save Error:", err);
      alert("❌ Gagal Simpan: " + (err.message || "Pastikan struktur tabel Supabase sesuai."));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-[#0C61BC] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#0C61BC] font-black text-xs uppercase tracking-[0.3rem] animate-pulse">Menghubungkan ke Database...</p>
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