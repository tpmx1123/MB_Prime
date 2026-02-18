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
