import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * RecipeCard displays a recipe summary.
 */
export default function RecipeCard({ recipe, onToggleFavorite, isFavorite }) {
  const navigate = useNavigate();
  return (
    <article className="card" style={{ overflow: 'hidden' }}>
      <button onClick={() => navigate(`/recipes/${recipe.id}`)} style={{ padding: 0, border: 'none', background: 'transparent', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
        <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
        <div style={{ padding: 12 }}>
          <h3 style={{ margin: '0 0 4px' }}>{recipe.title}</h3>
          <div style={{ display: 'flex', gap: 8, fontSize: 12, opacity: 0.85 }}>
            <span>⭐ {recipe.rating}</span>
            <span>• ⏱ {recipe.time}m</span>
          </div>
          <div style={{ marginTop: 8 }}>
            {recipe.tags.slice(0,3).map(t => <span key={t} className="badge" style={{ marginRight: 6 }}>#{t}</span>)}
          </div>
        </div>
      </button>
      <div style={{ padding: '0 12px 12px' }}>
        <button className="btn ghost" aria-pressed={isFavorite} onClick={() => onToggleFavorite(recipe.id)}>
          {isFavorite ? '★ Favorited' : '☆ Favorite'}
        </button>
      </div>
    </article>
  );
}
