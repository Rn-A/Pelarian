
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database } from '../types';

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
  db: Database;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, onLogout, db }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/events', label: 'Event' },
    { path: '/merchandise', label: 'Merchandise' },
    { path: '/organizer', label: 'Organizer' },
    { path: '/articles', label: 'Artikel' },
    { path: '/gallery', label: 'Galeri' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              {db.home.logo ? (
                <img src={db.home.logo} alt="Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div className="text-xl md:text-2xl font-black tracking-tighter">
                  <span className="text-white">PELARIAN</span>
                  <span className="text-[#0C61BC]">RC</span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${
                    isActive(link.path) ? 'text-[#0C61BC] border-b-2 border-[#0C61BC] rounded-none' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin/dashboard" className="bg-[#0C61BC] hover:bg-white hover:text-black px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all shadow-lg shadow-[#0C61BC]/20">
                  CMS
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-4 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest ${
                isActive(link.path) ? 'bg-[#0C61BC] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link 
              to="/admin/dashboard" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 bg-[#0C61BC]/10 text-[#0C61BC] rounded-xl text-sm font-black uppercase tracking-widest border border-[#0C61BC]/20"
            >
              ADMIN CMS
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
