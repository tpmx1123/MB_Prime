import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { forgotPassword } from '../../services/api';

const AdminForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await forgotPassword(username);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 [color-scheme:light]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-8 md:p-10 text-center"
        >
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary w-full" />
          <div className="mt-6">
            <p className="text-slate-700 font-medium">
              If an account exists with that username, a password reset link has been sent to the admin email. Please check your inbox (and spam folder).
            </p>
            <p className="text-slate-500 text-sm mt-4">The link is valid for 1 hour.</p>
            <Link
              to="/admin-login"
              className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline"
            >
              <ArrowLeft size={18} /> Back to login
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-serif font-bold text-slate-800">Forgot password?</h1>
            <p className="text-slate-500 text-sm mt-1">Enter your username to receive a reset link at the admin email.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
            )}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Mail size={18} />
              </div>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                autoComplete="username"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-[#0a0a0a] outline-none transition-colors text-slate-800 placeholder:text-slate-400"
                aria-label="Username"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </motion.button>
            <div className="text-center">
              <Link to="/admin-login" className="text-sm text-slate-500 hover:text-primary transition-colors inline-flex items-center gap-1">
                <ArrowLeft size={14} /> Back to login
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminForgotPassword;
