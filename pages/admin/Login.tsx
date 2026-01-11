
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError('Login gagal: ' + error.message);
    } catch (err) {
      setError('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[#111] p-10 rounded-[3rem] border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
              ADMIN <span className="text-[#0C61BC]">LOGIN</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Pelarian Running Clan Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Admin</label>
              <input 
                type="email" 
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#0C61BC] transition-colors"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#0C61BC] transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-[#0C61BC] hover:bg-white hover:text-black text-white font-black py-5 rounded-2xl transition-all transform active:scale-95 text-lg uppercase tracking-tighter shadow-xl shadow-[#0C61BC]/20 ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'MEMVERIFIKASI...' : 'MASUK DASHBOARD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
