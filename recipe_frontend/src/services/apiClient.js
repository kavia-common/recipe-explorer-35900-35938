const baseURL = process.env.REACT_APP_API_BASE_URL || '';

let onUnauthorized = null;

/**
 * PUBLIC_INTERFACE
 * setUnauthorizedHandler registers a callback to execute on 401.
 */
export function setUnauthorizedHandler(cb) {
  onUnauthorized = cb;
}

/**
 * PUBLIC_INTERFACE
 * apiFetch wraps fetch with baseURL, auth header, and JSON handling.
 */
export async function apiFetch(path, { method = 'GET', headers = {}, body, token } = {}) {
  const url = `${baseURL}${path}`;
  const init = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(url, init);
  if (res.status === 401 && onUnauthorized) onUnauthorized();
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = (data && data.message) || `Request failed with status ${res.status}`;
    throw new Error(msg);
  }
  return data;
}
