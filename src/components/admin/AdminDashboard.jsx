import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, RefreshCw, Download } from 'lucide-react';
import { getFormSubmissions, getAdminToken, setAdminToken } from '../../services/api';

const formTypeLabel = (type) => {
  if (type === 'brochure') return 'Brochure';
  if (type === 'contact_us') return 'Contact Us';
  return 'Enquiry';
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/admin-login', { replace: true, state: { from: { pathname: '/admin' } } });
      return;
    }
    load();
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getFormSubmissions();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load');
      if (err.message === 'Session expired' || err.message === 'Not authenticated') {
        navigate('/admin-login', { replace: true, state: { from: { pathname: '/admin' } } });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    navigate('/admin-login', { replace: true });
  };

  if (!getAdminToken()) return null;

  const brochureDownloads = submissions.filter((s) => s.formType === 'brochure');
  const brochureCount = brochureDownloads.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-primary">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-sans font-bold text-slate-800">Form Submissions</h2>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-70 transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">{error}</p>
        )}

        {/* Brochure downloads section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
              <Download size={24} />
            </div>
            <div>
              <h3 className="text-xl font-sans font-bold text-slate-800">Brochure Downloads</h3>
              <p className="text-slate-500 text-sm">
                {loading ? '...' : `${brochureCount} ${brochureCount === 1 ? 'person has' : 'people have'} downloaded the brochure`}
              </p>
            </div>
          </div>
          {brochureCount > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-amber-50/80 border-b border-amber-100">
                      <th className="px-4 py-3 text-xs font-semibold text-amber-800 uppercase tracking-wider">#</th>
                      <th className="px-4 py-3 text-xs font-semibold text-amber-800 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-xs font-semibold text-amber-800 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-xs font-semibold text-amber-800 uppercase tracking-wider">Phone</th>
                      <th className="px-4 py-3 text-xs font-semibold text-amber-800 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brochureDownloads.map((row, idx) => (
                      <tr key={row.id || idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-slate-600">{idx + 1}</td>
                        <td className="px-4 py-3 text-slate-800 font-medium">{row.name || '—'}</td>
                        <td className="px-4 py-3 text-slate-700">{row.email || '—'}</td>
                        <td className="px-4 py-3 text-slate-700">{row.phone || '—'}</td>
                        <td className="px-4 py-3 text-slate-500 text-sm">{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            !loading && (
              <div className="bg-white rounded-xl border border-slate-200 border-dashed p-8 text-center text-slate-500">
                No brochure downloads yet.
              </div>
            )
          )}
        </div>

        <h3 className="text-lg font-sans font-bold text-slate-800 mb-4">All Form Submissions</h3>

        {loading && submissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            Loading...
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            No submissions yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Form Type</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((row, idx) => (
                    <tr key={row.id || idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-600">{row.id}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          row.formType === 'brochure' ? 'bg-amber-100 text-amber-800' :
                          row.formType === 'contact_us' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {formTypeLabel(row.formType)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-800">{row.name || '—'}</td>
                      <td className="px-4 py-3 text-slate-700">{row.email || '—'}</td>
                      <td className="px-4 py-3 text-slate-700">{row.phone || '—'}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs truncate" title={row.message}>{row.message || '—'}</td>
                      <td className="px-4 py-3 text-slate-500 text-sm">{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
