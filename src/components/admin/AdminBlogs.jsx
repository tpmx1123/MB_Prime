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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-primary">Admin – Blogs</h1>
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Home size={18} /> Dashboard
            </Link>
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-70"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
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
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-fit"
          >
            <Plus size={18} /> Add blog
          </Link>
        </div>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">{error}</p>
        )}

        {loading ? (
          <p className="text-slate-500">Loading blogs…</p>
        ) : list.length === 0 ? (
          <p className="text-slate-500">No blogs yet. Click “Add blog” to create one.</p>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <ul className="divide-y divide-slate-200">
              {list.map((blog) => (
                <li key={blog.id} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 truncate">{blog.title}</p>
                    <p className="text-xs text-slate-500">{blog.slug} · {blog.date}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/admin/blogs/edit/${blog.id}`}
                      className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog.id, blog.title)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
