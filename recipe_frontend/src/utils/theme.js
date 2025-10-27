import { getItem, setItem } from './storage';

const THEME_KEY = 'theme';

// PUBLIC_INTERFACE
export function getStoredTheme() {
  return getItem(THEME_KEY) || 'light';
}

// PUBLIC_INTERFACE
export function setStoredTheme(theme) {
  setItem(THEME_KEY, theme);
}

// PUBLIC_INTERFACE
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// PUBLIC_INTERFACE
export function toggleTheme() {
  const next = getStoredTheme() === 'light' ? 'dark' : 'light';
  setStoredTheme(next);
  applyTheme(next);
  return next;
}
