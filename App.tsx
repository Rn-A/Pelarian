import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { INITIAL_DATA } from './constants';
import { Database, Event, Product, Organizer, Article, GalleryAlbum } from './types';
import { supabase } from './supabaseClient';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Merchandise from './pages/Merchandise';
import MerchandiseDetail from './pages/MerchandiseDetail';
import OrganizerPage from './pages/Organizer';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Settings (Home & About)
        const { data: settings } = await supabase.from('settings').select('*');
        const homeData = settings?.find(s => s.key === 'home')?.value || INITIAL_DATA.home;
        const aboutData = settings?.find(s => s.key === 'about')?.value || INITIAL_DATA.about;

        // Fetch other tables
        const { data: events } = await supabase.from('events').select('*');
        const { data: merchandise } = await supabase.from('merchandise').select('*');
        const { data: organizers } = await supabase.from('organizers').select('*');
        const { data: articles } = await supabase.from('articles').select('*');
        const { data: gallery } = await supabase.from('gallery').select('*');

        setDb({
          home: homeData,
          about: aboutData,
          events: events || [],
          merchandise: merchandise || [],
          organizers: organizers || [],
          articles: articles || [],
          gallery: gallery || []
        });

        // Check Auth session
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update favicon if logo changes
  useEffect(() => {
    if (db.home.logo) {
      const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;
      if (favicon) favicon.href = db.home.logo;
    }
  }, [db.home.logo]);

  const handleUpdateDb = async (newDb: Database) => {
    const prevDb = db;
    // Update local state first for immediate UI response
    setDb(newDb);

    try {
      // 1. Sync Home Settings
      if (JSON.stringify(newDb.home) !== JSON.stringify(prevDb.home)) {
        await supabase.from('settings').upsert({ key: 'home', value: newDb.home });
      }

      // 2. Sync About Settings
      if (JSON.stringify(newDb.about) !== JSON.stringify(prevDb.about)) {
        await supabase.from('settings').upsert({ key: 'about', value: newDb.about });
      }

      // 3. Sync Arrays (Upsert handles updates and additions)
      // Note: Deletions are handled directly in CMS components before onUpdate is called
      if (newDb.events !== prevDb.events) {
        if (newDb.events.length > 0) await supabase.from('events').upsert(newDb.events);
      }
      if (newDb.merchandise !== prevDb.merchandise) {
        if (newDb.merchandise.length > 0) await supabase.from('merchandise').upsert(newDb.merchandise);
      }
      if (newDb.organizers !== prevDb.organizers) {
        if (newDb.organizers.length > 0) await supabase.from('organizers').upsert(newDb.organizers);
      }
      if (newDb.articles !== prevDb.articles) {
        if (newDb.articles.length > 0) await supabase.from('articles').upsert(newDb.articles);
      }
      if (newDb.gallery !== prevDb.gallery) {
        if (newDb.gallery.length > 0) await supabase.from('gallery').upsert(newDb.gallery);
      }
    } catch (err) {
      console.error("Sync Error:", err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-[#0C61BC] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#0C61BC] font-black text-xs uppercase tracking-[0.3rem] animate-pulse">MEMUAT DATA PELARIAN...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black relative">
        <Navbar isAdmin={isLoggedIn} onLogout={handleLogout} db={db} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home db={db} />} />
            <Route path="/about" element={<About db={db} />} />
            <Route path="/events" element={<Events db={db} />} />
            <Route path="/event/:id" element={<EventDetail db={db} />} />
            <Route path="/merchandise" element={<Merchandise db={db} />} />
            <Route path="/merchandise/:id" element={<MerchandiseDetail db={db} />} />
            <Route path="/organizer" element={<OrganizerPage db={db} />} />
            <Route path="/articles" element={<Articles db={db} />} />
            <Route path="/article/:id" element={<ArticleDetail db={db} />} />
            <Route path="/gallery" element={<Gallery db={db} />} />
            <Route path="/admin/login" element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/admin/dashboard" element={isLoggedIn ? <AdminDashboard db={db} /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/cms/*" element={isLoggedIn ? <AdminCMS db={db} onUpdate={handleUpdateDb} /> : <Navigate to="/admin/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;