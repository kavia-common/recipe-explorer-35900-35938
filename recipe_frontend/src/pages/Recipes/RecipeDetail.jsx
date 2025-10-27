import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRecipes from '../../hooks/useRecipes';

/**
 * PUBLIC_INTERFACE
 * RecipeDetail displays full recipe information.
 */
export default function RecipeDetail() {
  const { id } = useParams();
  const { state, actions } = useRecipes();

  useEffect(() => {
    actions.fetchById(id);
    actions.refreshFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const r = state.selected;
  const favSet = new Set(state.favorites);
  const isFav = r ? favSet.has(String(r.id)) : false;

  if (state.loading && !r) return <div className="card" style={{ padding: 16 }}>Loading…</div>;
  if (state.error) return <div className="card" style={{ padding: 16, color: 'var(--color-error)' }}>{state.error}</div>;
  if (!r) return null;

  return (
    <article className="card" style={{ overflow: 'hidden' }}>
      <img src={r.image} alt={r.title} style={{ width: '100%', maxHeight: 360, objectFit: 'cover' }} />
      <div style={{ padding: 16 }}>
        <h1 style={{ marginTop: 0 }}>{r.title}</h1>
        <div style={{ display: 'flex', gap: 12, opacity: 0.85 }}>
          <span>⭐ {r.rating}</span>
          <span>⏱ {r.time} minutes</span>
          <span>By {r.author}</span>
        </div>
        <div style={{ marginTop: 12 }}>
          {r.tags.map(t => <span key={t} className="badge" style={{ marginRight: 6 }}>#{t}</span>)}
        </div>
        <div className="hr" />
        <section>
          <h2>Ingredients</h2>
          <ul>
            {r.ingredients.map((it, idx) => <li key={idx}>{it}</li>)}
          </ul>
        </section>
        <section>
          <h2>Steps</h2>
          <ol>
            {r.steps.map((it, idx) => <li key={idx}>{it}</li>)}
          </ol>
        </section>
        <section>
          <h2>Nutrition</h2>
          <div>Calories: {r.nutrition.calories}</div>
          <div>Protein: {r.nutrition.protein} g</div>
          <div>Fat: {r.nutrition.fat} g</div>
          <div>Carbs: {r.nutrition.carbs} g</div>
        </section>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="btn" onClick={() => actions.toggleFavorite(r.id)} aria-pressed={isFav}>
            {isFav ? '★ Unfavorite' : '☆ Favorite'}
          </button>
          <button className="btn ghost" onClick={() => window.print()}>🖨 Print</button>
          <button className="btn ghost" onClick={() => navigator.share?.({ title: r.title, url: window.location.href }).catch(() => {})}>🔗 Share</button>
        </div>
      </div>
    </article>
  );
}
