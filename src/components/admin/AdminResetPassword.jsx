import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { resetPassword } from '../../services/api';

const AdminResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token.trim()) {
      setError('Invalid reset link. Please request a new one.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Reset failed. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 [color-scheme:light]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-8 md:p-10 text-center"
        >
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary w-full" />
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle size={40} />
            </div>
            <p className="text-slate-700 font-medium">Your password has been reset. You can now log in with your new password.</p>
            <button
              type="button"
              onClick={() => navigate('/admin-login')}
              className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Go to login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!token.trim()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 [color-scheme:light]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-8 md:p-10 text-center"
        >
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary w-full" />
          <p className="text-slate-700 mt-6">Invalid or missing reset link. Please use the link from your email or <Link to="/admin-forgot-password" className="text-primary font-medium hover:underline">request a new one</Link>.</p>
          <Link to="/admin-login" className="inline-block mt-4 text-sm text-slate-500 hover:text-primary">Back to login</Link>
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
            <h1 className="text-2xl font-serif font-bold text-slate-800">Set new password</h1>
            <p className="text-slate-500 text-sm mt-1">Enter your new password below.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
            )}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 6 characters)"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full pl-11 pr-11 py-3 bg-white border border-slate-300 rounded-xl focus:border-[#0a0a0a] outline-none text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-[#0a0a0a] outline-none text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-xl disabled:opacity-70"
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </motion.button>
            <div className="text-center">
              <Link to="/admin-login" className="text-sm text-slate-500 hover:text-primary transition-colors">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminResetPassword;
