const PREFIX = 'recipe_app_';

function key(k) { return `${PREFIX}${k}`; }

// PUBLIC_INTERFACE
export function getItem(k) {
  try { return window.localStorage.getItem(key(k)); } catch { return null; }
}

// PUBLIC_INTERFACE
export function setItem(k, v) {
  try { window.localStorage.setItem(key(k), v); } catch {}
}

// PUBLIC_INTERFACE
export function removeItem(k) {
  try { window.localStorage.removeItem(key(k)); } catch {}
}
