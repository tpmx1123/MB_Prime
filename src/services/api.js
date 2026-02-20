const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const ADMIN_TOKEN_KEY = 'mbprime_admin_token';

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token) {
  if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token);
  else localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function submitFormSubmission({ formType = 'enquiry', name, email, phone, message = '' }) {
  const res = await fetch(`${API_BASE}/api/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formType: formType === 'brochure' ? 'brochure' : formType === 'contact_us' ? 'contact_us' : 'enquiry',
      name: (name || '').trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      message: (message || '').trim(),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: (username || '').trim(), password: password || '' }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  if (data.token) setAdminToken(data.token);
  return data;
}

export async function getFormSubmissions() {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(`${API_BASE}/api/admin/submissions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error('Failed to load submissions');
  return res.json();
}

export async function forgotPassword(username) {
  const res = await fetch(`${API_BASE}/api/admin/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: (username || '').trim() }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export async function resetPassword(token, newPassword) {
  const res = await fetch(`${API_BASE}/api/admin/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: (token || '').trim(), newPassword: newPassword || '' }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Reset failed');
  return data;
}

export async function changePassword(currentPassword, newPassword) {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(`${API_BASE}/api/admin/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ currentPassword: currentPassword || '', newPassword: newPassword || '' }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error(data.message || 'Change password failed');
  return data;
}

// ——— Public blog API (no auth) ———
export async function getBlogs() {
  const res = await fetch(`${API_BASE}/api/blogs`);
  if (!res.ok) throw new Error('Failed to load blogs');
  return res.json();
}

export async function getBlogBySlug(slug) {
  const res = await fetch(`${API_BASE}/api/blogs/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load blog');
  return res.json();
}

// ——— Admin blog CRUD (auth required) ———
function adminBlogHeaders() {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export async function getBlogsAdmin() {
  const res = await fetch(`${API_BASE}/api/admin/blogs`, { headers: adminBlogHeaders() });
  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error('Failed to load blogs');
  return res.json();
}

export async function getBlogById(id) {
  const res = await fetch(`${API_BASE}/api/admin/blogs/${id}`, { headers: adminBlogHeaders() });
  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('Session expired');
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load blog');
  return res.json();
}

export async function createBlog(data) {
  const res = await fetch(`${API_BASE}/api/admin/blogs`, {
    method: 'POST',
    headers: adminBlogHeaders(),
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error(body.message || 'Failed to create blog');
  return body;
}

export async function updateBlog(id, data) {
  const res = await fetch(`${API_BASE}/api/admin/blogs/${id}`, {
    method: 'PUT',
    headers: adminBlogHeaders(),
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error(body.message || 'Failed to update blog');
  return body;
}

export async function deleteBlog(id) {
  const res = await fetch(`${API_BASE}/api/admin/blogs/${id}`, {
    method: 'DELETE',
    headers: adminBlogHeaders(),
  });
  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('Session expired');
  }
  if (res.status === 404) return;
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Failed to delete blog');
  }
}
