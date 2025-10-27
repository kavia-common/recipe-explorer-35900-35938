import React, { useEffect } from 'react';
import useRecipes from '../../hooks/useRecipes';

/**
 * PUBLIC_INTERFACE
 * Favorites page shows favorited items.
 */
export default function Favorites() {
  const { state, actions } = useRecipes();

  useEffect(() => {
    actions.refreshFavorites();
    actions.fetchList(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favSet = new Set(state.favorites);
  const favItems = state.list.filter(r => favSet.has(String(r.id)));

  return (
    <section>
      <h1>Favorites</h1>
      {favItems.length === 0 && <div className="card" style={{ padding: 16 }}>No favorites yet.</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
        {favItems.map(r => (
          <React.Suspense key={r.id} fallback={null}>
            <RecipeCardLazy recipe={r} onToggleFavorite={actions.toggleFavorite} isFavorite />
          </React.Suspense>
        ))}
      </div>
    </section>
  );
}

const RecipeCardLazy = React.lazy(() => import('../Recipes/RecipeCard'));
