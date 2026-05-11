const BASE_URL = 'https://dummyjson.com';

/**
 * @param {string} username DummyJSON kullanıcı adı (ör. emilys)
 * @param {string} password
 * @returns {Promise<object>} accessToken + kullanıcı alanları
 */
export async function loginRequest(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.trim(), password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      typeof data.message === 'string'
        ? data.message
        : 'Giriş başarısız. Bilgileri kontrol edin.';
    throw new Error(msg);
  }
  return data;
}

export async function fetchMe(token) {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Oturum doğrulanamadı');
  }
  return res.json();
}
