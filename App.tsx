import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { INITIAL_DATA } from './constants';
import { Database } from './types';

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
  // Local state persistence logic
  const [db, setDb] = useState<Database>(() => {
    const saved = localStorage.getItem('pelarian_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('pelarian_admin_auth') === 'true';
  });

  // Update favicon if logo changes
  useEffect(() => {
    if (db.home.logo) {
      const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;
      if (favicon) favicon.href = db.home.logo;
    }
  }, [db.home.logo]);

  const handleUpdateDb = (newDb: Database) => {
    setDb(newDb);
    localStorage.setItem('pelarian_db', JSON.stringify(newDb));
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
      localStorage.setItem('pelarian_admin_auth', 'true');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('pelarian_admin_auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-[#0C61BC] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#0C61BC] font-black text-xs uppercase tracking-[0.3rem]">LOADING PELARIAN RC...</p>
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
            <Route path="/organizer" element={<Organizer db={db} />} />
            <Route path="/articles" element={<Articles db={db} />} />
            <Route path="/article/:id" element={<ArticleDetail db={db} />} />
            <Route path="/gallery" element={<Gallery db={db} />} />
            <Route path="/admin/login" element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => handleLogin(true)} />} />
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