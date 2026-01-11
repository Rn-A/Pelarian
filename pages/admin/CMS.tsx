
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Database } from '../../types';

// CMS Sub-pages
import CMSHome from './cms/CMSHome';
import CMSAbout from './cms/CMSAbout';
import CMSEvents from './cms/CMSEvents';
import CMSMerchandise from './cms/CMSMerchandise';
import CMSOrganizers from './cms/CMSOrganizers';
import CMSArticles from './cms/CMSArticles';
import CMSGallery from './cms/CMSGallery';

interface CMSProps {
  db: Database;
  onUpdate: (db: Database) => void;
}

const AdminCMS: React.FC<CMSProps> = ({ db, onUpdate }) => {
  const location = useLocation();

  const sidebarLinks = [
    { path: '/admin/cms/home', label: 'Home Page' },
    { path: '/admin/cms/about', label: 'About Page' },
    { path: '/admin/cms/events', label: 'Events' },
    { path: '/admin/cms/merchandise', label: 'Merchandise' },
    { path: '/admin/cms/organizers', label: 'Organizer' },
    { path: '/admin/cms/articles', label: 'Articles' },
    { path: '/admin/cms/gallery', label: 'Gallery' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* CMS Sidebar */}
      <aside className="w-full md:w-64 bg-[#111] border-r border-white/5 p-6 flex flex-col gap-8">
        <div>
          <Link to="/admin/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 mb-8 group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-bold text-[10px] uppercase tracking-widest">Ke Dashboard</span>
          </Link>
          <h2 className="text-xl font-black uppercase tracking-tighter mb-8 italic">CMS <span className="text-[#0C61BC]">PANEL</span></h2>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  location.pathname === link.path ? 'bg-[#0C61BC] text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* CMS Content Area */}
      <main className="flex-grow p-4 md:p-10 overflow-y-auto bg-black">
        <Routes>
          <Route path="home" element={<CMSHome db={db} onUpdate={onUpdate} />} />
          <Route path="about" element={<CMSAbout db={db} onUpdate={onUpdate} />} />
          <Route path="events" element={<CMSEvents db={db} onUpdate={onUpdate} />} />
          <Route path="merchandise" element={<CMSMerchandise db={db} onUpdate={onUpdate} />} />
          <Route path="organizers" element={<CMSOrganizers db={db} onUpdate={onUpdate} />} />
          <Route path="articles" element={<CMSArticles db={db} onUpdate={onUpdate} />} />
          <Route path="gallery" element={<CMSGallery db={db} onUpdate={onUpdate} />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminCMS;
