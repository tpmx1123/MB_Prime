import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { getBlogById, createBlog, updateBlog, getAdminToken, setAdminToken } from '../../services/api';
import { Home, ArrowLeft } from 'lucide-react';

const TINYMCE_API_KEY = 'bhvqdinw22m8eaypoig4hij7r3eqh3h4wrjcv8leedw0xnzq';

const slugify = (s) => {
  if (!s || !s.trim()) return '';
  return s.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-|-$/g, '');
};

const AdminBlogEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    author: 'ASBL',
    excerpt: '',
    body: '',
    image: '',
    carouselImage: '',
  });

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/admin-login', { replace: true, state: { from: { pathname: '/admin/blogs' } } });
      return;
    }
    if (isNew) {
      setForm({
        title: '',
        slug: '',
        category: '',
        author: 'ASBL',
        excerpt: '',
        body: '',
        image: '',
        carouselImage: '',
      });
      setLoading(false);
      return;
    }
    let cancelled = false;
    getBlogById(id)
      .then((blog) => {
        if (cancelled || !blog) return;
        setForm({
          title: blog.title || '',
          slug: blog.slug || '',
          category: blog.category || '',
          author: blog.author || 'ASBL',
          excerpt: blog.excerpt || '',
          body: blog.body || '',
          image: blog.image || '',
          carouselImage: blog.carouselImage || blog.image || '',
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load blog');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, isNew, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title?.trim()) {
      setError('Title is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: form.title.trim(),
        slug: (form.slug || slugify(form.title)).trim() || slugify(form.title),
        category: (form.category || '').trim(),
        author: (form.author || '').trim() || 'ASBL',
        excerpt: (form.excerpt || '').trim(),
        body: form.body || '',
        image: (form.image || '').trim(),
        carouselImage: (form.carouselImage || '').trim() || (form.image || '').trim(),
      };
      if (isNew) {
        await createBlog(payload);
      } else {
        await updateBlog(id, payload);
      }
      navigate('/admin/blogs');
    } catch (err) {
      setError(err.message || 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    navigate('/admin-login', { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading blog…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-primary">
            {isNew ? 'Add blog' : 'Edit blog'}
          </h1>
          <div className="flex items-center gap-2">
            <Link
              to="/admin/blogs"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} /> Back to list
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Home size={18} /> Dashboard
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }))}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
                placeholder="Blog title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
                placeholder="url-slug"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
                placeholder="e.g. Real Estate"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
                placeholder="ASBL"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Excerpt (short summary)</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
              placeholder="Brief summary for cards and SEO"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Body (rich content)</label>
            <Editor
              apiKey={TINYMCE_API_KEY}
              value={form.body}
              onEditorChange={(body) => setForm((f) => ({ ...f, body }))}
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                height: 360,
                content_style: 'body { font-family: sans-serif; font-size: 14px; }',
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Image URL * (used for card and carousel if carousel image is empty)</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Carousel image URL (optional; leave empty to use main image)</label>
            <input
              type="url"
              value={form.carouselImage}
              onChange={(e) => setForm((f) => ({ ...f, carouselImage: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-800 focus:border-primary outline-none"
              placeholder="Leave empty to use main image"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Link
              to="/admin/blogs"
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 disabled:opacity-70 transition-colors"
            >
              {saving ? 'Saving…' : isNew ? 'Create blog' : 'Update blog'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminBlogEdit;
