
import React from 'react';
import { Database } from '../../types';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard: React.FC<{ db: Database }> = ({ db }) => {
  const stats = [
    { name: 'Events', count: db.events.length, color: '#0C61BC', path: '/admin/cms/events' },
    { name: 'Products', count: db.merchandise.length, color: '#1e40af', path: '/admin/cms/merchandise' },
    { name: 'Articles', count: db.articles.length, color: '#2563eb', path: '/admin/cms/articles' },
    { name: 'Organizer', count: db.organizers.length, color: '#60a5fa', path: '/admin/cms/organizers' },
  ];

  return (
    <div className="bg-black min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">CMS <span className="text-[#0C61BC]">OVERVIEW</span></h1>
            <p className="text-gray-400 text-sm">Selamat datang kembali, Admin Pelarian RC.</p>
          </div>
          <Link to="/admin/cms/home" className="w-full md:w-auto text-center bg-[#0C61BC] hover:bg-white hover:text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#0C61BC]/20 uppercase text-xs tracking-widest">
            Edit Home Page
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(stat => (
            <Link key={stat.name} to={stat.path} className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5 hover:border-[#0C61BC]/50 transition-all group shadow-xl">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2rem] mb-2">{stat.name}</p>
              <h3 className="text-4xl md:text-5xl font-black text-white group-hover:text-[#0C61BC] transition-colors">{stat.count}</h3>
            </Link>
          ))}
        </div>

        <div className="bg-[#1a1a1a] rounded-[2rem] p-6 md:p-8 border border-white/5 min-h-[400px] shadow-2xl">
          <h3 className="text-lg font-black mb-6 uppercase tracking-tighter">Distribusi <span className="text-[#0C61BC]">Konten</span></h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={10} tick={{fontWeight: 'bold', fill: '#666'}} />
                <YAxis stroke="#444" fontSize={10} tick={{fontWeight: 'bold', fill: '#666'}} />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderRadius: '12px', border: '1px solid #333', color: '#fff' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
