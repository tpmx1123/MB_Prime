import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getBlogsAdmin, deleteBlog, getAdminToken, setAdminToken } from '../../services/api';
import { Home, Plus, Pencil, Trash2, RefreshCw } from 'lucide-react';

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/admin-login', { replace: true, state: { from: { pathname: '/admin/blogs' } } });
      return;
    }
    load();
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getBlogsAdmin();
      setList(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load blogs');
      if (err.message === 'Session expired' || err.message === 'Not authenticated') {
        navigate('/admin-login', { replace: true, state: { from: { pathname: '/admin/blogs' } } });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete blog "${title}"?`)) return;
    try {
      await deleteBlog(id);
      load();
    } catch (err) {
      setError(err.message || 'Failed to delete blog');
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    navigate('/admin-login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2">
            <span className="text-primary">Admin</span>
            <span className="text-slate-400">·</span>
            <span>Blogs</span>
          </h1>
          <div className="flex items-center gap-1">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
            >
              <Home size={18} /> Dashboard
            </Link>
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-70 text-sm font-medium"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-sans font-bold text-slate-800">Blog posts</h2>
          <Link
            to="/admin/blogs/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors w-fit font-medium shadow-sm"
          >
            <Plus size={18} /> Add blog
          </Link>
        </div>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 font-medium">{error}</p>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Loading blogs…</p>
          </div>
        ) : list.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 border-dashed shadow-sm p-12 text-center text-slate-500">
            <p className="font-medium">No blogs yet.</p>
            <p className="text-sm mt-1">Click “Add blog” to create your first post.</p>
            <Link
              to="/admin/blogs/new"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium"
            >
              <Plus size={18} /> Add blog
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <ul className="divide-y divide-slate-100">
              {list.map((blog) => (
                <li key={blog.id} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 truncate">{blog.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{blog.slug} · {blog.date}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      to={`/admin/blogs/edit/${blog.id}`}
                      className="p-2.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-xl transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog.id, blog.title)}
                      className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBlogs;
