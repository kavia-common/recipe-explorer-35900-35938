import React from 'react';
import { getStoredTheme, toggleTheme } from '../../utils/theme';

/**
 * PUBLIC_INTERFACE
 * Settings page includes theme switch.
 */
export default function Settings() {
  const [theme, setTheme] = React.useState(getStoredTheme());
  return (
    <section className="card" style={{ padding: 16 }}>
      <h1>Settings</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>Theme:</div>
        <button className="btn" onClick={() => setTheme(toggleTheme())}>
          {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </button>
      </div>
    </section>
  );
}
