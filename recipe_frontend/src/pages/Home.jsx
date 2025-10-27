import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Home page with hero and quick search.
 */
export default function Home() {
  const [q, setQ] = React.useState('');
  const navigate = useNavigate();
  const go = (qq) => navigate(`/recipes?q=${encodeURIComponent(qq || q)}`);

  const trending = ['Healthy', 'Quick', 'Vegan', 'Gluten Free'];

  return (
    <section className="card" style={{ padding: 24, background: 'linear-gradient(180deg, rgba(37,99,235,0.10), #f9fafb 40%)' }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>Discover delicious recipes</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>Search by keywords or explore trending tags.</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <input
          className="input"
          placeholder="Search e.g. salmon, pasta..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search recipes"
        />
        <button className="btn" onClick={() => go()}>Search</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {trending.map(t => (
          <button key={t} className="badge" style={{ marginRight: 8, cursor: 'pointer' }} onClick={() => go(t)} aria-label={`Search ${t}`}>
            #{t}
          </button>
        ))}
      </div>
    </section>
  );
}
