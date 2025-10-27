import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarFilters from '../../components/common/SidebarFilters';
import useRecipes from '../../hooks/useRecipes';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * PUBLIC_INTERFACE
 * RecipeList page renders filters and recipe grid.
 */
export default function RecipeList() {
  const { state, actions } = useRecipes();
  const query = useQuery();
  const qParam = query.get('q') || '';

  useEffect(() => {
    if (qParam && state.filters.q !== qParam) {
      actions.setFilters({ q: qParam });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qParam]);

  useEffect(() => {
    actions.fetchList(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filters.q, state.filters.cuisine, state.filters.diet, state.filters.time, JSON.stringify(state.filters.tags)]);

  const favSet = new Set(state.favorites);

  return (
    <div className="grid">
      <div className="grid-sidebar">
        <SidebarFilters value={state.filters} onChange={actions.setFilters} />
      </div>
      <div className="grid-main" aria-live="polite">
        {state.loading && <div className="card" style={{ padding: 16 }}>Loading recipes…</div>}
        {!state.loading && state.list.length === 0 && (
          <div className="card" style={{ padding: 16 }}>No recipes found. Try adjusting your filters.</div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {state.list.map(r => (
            <React.Suspense fallback={null} key={r.id}>
              <RecipeCardLazy recipe={r} onToggleFavorite={actions.toggleFavorite} isFavorite={favSet.has(String(r.id))} />
            </React.Suspense>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          <button className="btn" onClick={() => actions.fetchList(true)}>Load more</button>
        </div>
      </div>
    </div>
  );
}

const RecipeCardLazy = React.lazy(() => import('./RecipeCard'));
