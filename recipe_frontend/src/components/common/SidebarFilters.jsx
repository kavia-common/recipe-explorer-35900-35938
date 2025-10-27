import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SidebarFilters allows filtering the recipe list.
 */
export default function SidebarFilters({ value, onChange }) {
  const [open, setOpen] = React.useState(true);
  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <aside className="card" style={{ padding: 12 }}>
      <button className="btn ghost" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="filters-content">
        {open ? 'Hide Filters' : 'Show Filters'}
      </button>
      {open && (
        <div id="filters-content" style={{ marginTop: 12, display: 'grid', gap: 10 }}>
          <label>
            <span className="visually-hidden">Search</span>
            <input
              className="input"
              placeholder="Search keywords"
              value={value.q || ''}
              onChange={(e) => update({ q: e.target.value })}
              aria-label="Search recipes"
            />
          </label>
          <label>
            Cuisine
            <select className="select" value={value.cuisine || ''} onChange={(e) => update({ cuisine: e.target.value })}>
              <option value="">Any</option>
              <option>American</option>
              <option>Italian</option>
              <option>Indian</option>
              <option>Mexican</option>
            </select>
          </label>
          <label>
            Diet
            <select className="select" value={value.diet || ''} onChange={(e) => update({ diet: e.target.value })}>
              <option value="">Any</option>
              <option>Regular</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
            </select>
          </label>
          <label>
            Max Time (minutes)
            <select className="select" value={value.time || ''} onChange={(e) => update({ time: e.target.value })}>
              <option value="">Any</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
          </label>
          <div>
            <div style={{ marginBottom: 6 }}>Tags</div>
            {['Healthy', 'Quick', 'Gluten Free', 'Vegan', 'Low Carb'].map(tag => {
              const selected = value.tags?.includes(tag);
              return (
                <button
                  key={tag}
                  className="badge"
                  style={{ marginRight: 6, marginBottom: 6, cursor: 'pointer', border: selected ? '1px solid var(--color-primary)' : '1px solid transparent' }}
                  onClick={() => {
                    const tags = new Set(value.tags || []);
                    if (tags.has(tag)) tags.delete(tag);
                    else tags.add(tag);
                    update({ tags: Array.from(tags) });
                  }}
                  aria-pressed={selected}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
