import { PAGE_SIZE } from '../utils/constants';

const useMock = (process.env.REACT_APP_USE_MOCK ?? 'true') !== 'false';

let favorites = new Set();

const MOCK_RECIPES = Array.from({ length: 24 }).map((_, i) => ({
  id: String(i + 1),
  title: ['Citrus Salmon Bowl', 'Mediterranean Quinoa', 'Herbed Chicken', 'Vegan Buddha Bowl'][i % 4] + ` ${i + 1}`,
  rating: (Math.round((3.5 + (i % 15) * 0.1) * 10) / 10).toFixed(1),
  time: 15 + (i % 6) * 5,
  tags: ['Healthy', 'Quick', 'Gluten Free', 'Vegan', 'Low Carb'].slice(0, (i % 5) + 1),
  cuisine: ['American', 'Italian', 'Indian', 'Mexican'][i % 4],
  diet: ['Regular', 'Vegetarian', 'Vegan'][i % 3],
  image: `/assets/figmaimages/figma_image_30_750.png`,
  author: 'Chef Ava',
  ingredients: ['1 cup rice', '200g salmon', '1 lemon', 'Salt', 'Pepper'],
  steps: ['Prep ingredients', 'Cook base', 'Sear protein', 'Assemble bowl', 'Garnish and serve'],
  nutrition: { calories: 520, protein: 30, fat: 20, carbs: 45 },
}));

function filterList(items, { q = '', filters = {} }) {
  let res = items;
  if (q) {
    const qq = q.toLowerCase();
    res = res.filter(r => r.title.toLowerCase().includes(qq));
  }
  if (filters.cuisine) res = res.filter(r => r.cuisine === filters.cuisine);
  if (filters.diet) res = res.filter(r => r.diet === filters.diet);
  if (filters.tags?.length) res = res.filter(r => filters.tags.every(t => r.tags.includes(t)));
  if (filters.time) {
    const t = Number(filters.time);
    res = res.filter(r => r.time <= t);
  }
  return res;
}

// PUBLIC_INTERFACE
export async function getRecipes({ q = '', filters = {}, page = 1 } = {}) {
  if (useMock) {
    await new Promise(r => setTimeout(r, 150));
    const filtered = filterList(MOCK_RECIPES, { q, filters });
    const start = (page - 1) * PAGE_SIZE;
    const items = filtered.slice(start, start + PAGE_SIZE);
    return { items, page, total: filtered.length };
  }
  throw new Error('Real API not implemented. Enable mock with REACT_APP_USE_MOCK=true');
}

// PUBLIC_INTERFACE
export async function getRecipeById(id) {
  if (useMock) {
    await new Promise(r => setTimeout(r, 120));
    const rcp = MOCK_RECIPES.find(r => r.id === String(id));
    if (!rcp) throw new Error('Recipe not found');
    return rcp;
  }
  throw new Error('Real API not implemented. Enable mock with REACT_APP_USE_MOCK=true');
}

// PUBLIC_INTERFACE
export async function toggleFavorite(id) {
  if (useMock) {
    if (favorites.has(String(id))) favorites.delete(String(id));
    else favorites.add(String(id));
    return true;
  }
  throw new Error('Real API not implemented. Enable mock with REACT_APP_USE_MOCK=true');
}

// PUBLIC_INTERFACE
export async function getFavorites() {
  if (useMock) {
    await new Promise(r => setTimeout(r, 100));
    return Array.from(favorites);
  }
  throw new Error('Real API not implemented. Enable mock with REACT_APP_USE_MOCK=true');
}
