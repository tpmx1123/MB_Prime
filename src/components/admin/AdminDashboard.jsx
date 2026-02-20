import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, RefreshCw, Download, FileSpreadsheet, Search, Filter, X, KeyRound, Eye, EyeOff, Home, FileText } from 'lucide-react';
import { getFormSubmissions, getAdminToken, setAdminToken, changePassword } from '../../services/api';
import * as XLSX from 'xlsx';

const formTypeLabel = (type) => {
  if (type === 'brochure') return 'Brochure';
  if (type === 'contact_us') return 'Contact Us';
  return 'Enquiry';
};

const getMonthYearOptions = () => {
  const options = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    options.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    });
  }
  return options;
};

const parseSubmissionDate = (createdAt) => {
  if (!createdAt) return null;
  const d = new Date(createdAt);
  return isNaN(d.getTime()) ? null : d;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // 'all' | 'month' | 'date'
  const [filterMonth, setFilterMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePwPasswords, setShowChangePwPasswords] = useState(false);
  const [changePwError, setChangePwError] = useState('');
  const [changePwSuccess, setChangePwSuccess] = useState(false);
  const [changePwLoading, setChangePwLoading] = useState(false);

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

  const filteredSubmissions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return submissions.filter((row) => {
      if (q) {
        const name = (row.name || '').toLowerCase();
        const email = (row.email || '').toLowerCase();
        const phone = (row.phone || '').toLowerCase();
        const message = (row.message || '').toLowerCase();
        if (!name.includes(q) && !email.includes(q) && !phone.includes(q) && !message.includes(q)) return false;
      }
      const d = parseSubmissionDate(row.createdAt);
      if (!d) return false;
      if (filterBy === 'all') return true;
      if (filterBy === 'month') {
        const [y, m] = filterMonth.split('-').map(Number);
        return d.getFullYear() === y && d.getMonth() + 1 === m;
      }
      if (filterBy === 'date') {
        if (!dateFrom && !dateTo) return true;
        const from = dateFrom ? new Date(dateFrom) : null;
        const to = dateTo ? new Date(dateTo) : null;
        if (from && d < from) return false;
        if (to) {
          const toEnd = new Date(to);
          toEnd.setHours(23, 59, 59, 999);
          if (d > toEnd) return false;
        }
        return true;
      }
      return true;
    });
  }, [submissions, searchQuery, filterBy, filterMonth, dateFrom, dateTo]);

  const brochureDownloads = useMemo(
    () => filteredSubmissions.filter((s) => s.formType === 'brochure'),
    [filteredSubmissions]
  );
  const brochureCount = brochureDownloads.length;

  const downloadExcel = () => {
    const headers = ['#', 'Form Type', 'Name', 'Email', 'Phone', 'Message', 'Date'];
    const rows = filteredSubmissions.map((row, idx) => [
      row.id ?? idx + 1,
      formTypeLabel(row.formType),
      row.name || '',
      row.email || '',
      row.phone || '',
      row.message || '',
      row.createdAt ? new Date(row.createdAt).toLocaleString() : '',
    ]);
    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Form Submissions');
    const filename = `MBPrime_Submissions_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setChangePwError('');
    if (newPassword.length < 6) {
      setChangePwError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePwError('New passwords do not match.');
      return;
    }
    setChangePwLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      setChangePwSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setShowChangePassword(false);
        setChangePwSuccess(false);
      }, 2000);
    } catch (err) {
      setChangePwError(err.message || 'Failed to change password.');
    } finally {
      setChangePwLoading(false);
    }
  };

  const closeChangePassword = () => {
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setChangePwError('');
    setChangePwSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-primary">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Home size={18} /> Home
            </Link>
            <Link
              to="/admin/blogs"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FileText size={18} /> Blogs
            </Link>
            <button
              type="button"
              onClick={() => setShowChangePassword(true)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
            >
              <KeyRound size={18} /> Change password
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Change password modal */}
      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800">Reset password</h3>
              <button
                type="button"
                onClick={closeChangePassword}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleChangePasswordSubmit} className="p-6 space-y-4">
              {changePwSuccess && (
                <p className="text-emerald-600 text-sm text-center bg-emerald-50 py-2 rounded-lg">Password changed successfully.</p>
              )}
              {changePwError && (
                <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">{changePwError}</p>
              )}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Current password</label>
                <div className="relative">
                  <input
                    type={showChangePwPasswords ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowChangePwPasswords((p) => !p)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showChangePwPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">New password (min 6 characters)</label>
                <input
                  type={showChangePwPasswords ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Confirm new password</label>
                <input
                  type={showChangePwPasswords ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeChangePassword}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changePwLoading}
                  className="flex-1 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 disabled:opacity-70 transition-colors"
                >
                  {changePwLoading ? 'Updating...' : 'Update password'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-sans font-bold text-slate-800">Form Submissions</h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-70 transition-colors"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button
              onClick={downloadExcel}
              disabled={filteredSubmissions.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FileSpreadsheet size={18} /> Download Excel
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">{error}</p>
        )}

        {/* Filters for both sections */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-primary mb-1">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Name, email, phone, message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Filter by</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-primary outline-none text-primary"
              >
                <option value="all">All time</option>
                <option value="month">Month wise</option>
                <option value="date">Date range</option>
              </select>
            </div>
            {filterBy === 'month' && (
              <div>
                <label className="block text-xs font-medium text-primary mb-1">Select month</label>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-primary outline-none text-primary"
                >
                  {getMonthYearOptions().map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {filterBy === 'date' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-primary mb-1">From date</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-primary outline-none text-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">To date</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-primary outline-none text-primary"
                  />
                </div>
              </>
            )}
          </div>
          <p className="text-slate-500 text-xs mt-2">
            Showing {filteredSubmissions.length} of {submissions.length} submissions
          </p>
        </div>

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
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            {submissions.length === 0 ? 'No submissions yet.' : 'No submissions match the current filters.'}
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
                  {filteredSubmissions.map((row, idx) => (
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
