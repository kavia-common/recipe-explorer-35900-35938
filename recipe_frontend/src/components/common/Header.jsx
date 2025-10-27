import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toggleTheme, getStoredTheme } from '../../utils/theme';

function ThemeToggle() {
  const [mode, setMode] = React.useState(getStoredTheme());
  const onToggle = () => setMode(toggleTheme());
  return (
    <button className="btn ghost" aria-label="Toggle theme" onClick={onToggle}>
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Header renders the top navigation bar.
 */
export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-brand" role="img" aria-label="Recipe Explorer">Recipe Explorer</div>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
          <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <NavLink className="nav-link" to="/profile" aria-label="Profile">👤 {user?.name?.split(' ')[0] || 'You'}</NavLink>
              <NavLink className="nav-link" to="/settings">Settings</NavLink>
              <button className="btn ghost" onClick={() => { logout(); navigate('/signin'); }}>
                Sign out
              </button>
            </>
          ) : (
            <button className="btn" onClick={() => navigate('/signin')}>Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}
