import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, LogIn } from 'lucide-react';
import { adminLogin } from '../../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 [color-scheme:light]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-slate-800">Admin Login</h1>
            <p className="text-slate-500 text-sm mt-1">MB Prime</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
            )}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <User size={18} />
              </div>
              <input
                type="text"
                name="username"
                id="admin-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                autoComplete="username"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-[#0a0a0a] outline-none transition-colors text-slate-800 placeholder:text-slate-400 [&::placeholder]:opacity-100"
                style={{ color: '#1e293b' }}
                aria-label="Username"
              />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoComplete="current-password"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-[#0a0a0a] outline-none transition-colors text-slate-800 placeholder:text-slate-400 [&::placeholder]:opacity-100"
                style={{ color: '#1e293b' }}
                aria-label="Password"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign in'}
              <LogIn size={18} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
