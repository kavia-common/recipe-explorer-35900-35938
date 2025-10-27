import React, { createContext, useContext, useReducer } from 'react';
import * as recipeService from '../services/recipeService';

const RecipesContext = createContext(null);

const initialState = {
  list: [],
  filters: { q: '', cuisine: '', diet: '', time: '', tags: [] },
  page: 1,
  selected: null,
  favorites: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.value, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
    case 'SET_LIST':
      return { ...state, list: action.list, page: action.page ?? 1, loading: false };
    case 'APPEND_LIST':
      return { ...state, list: [...state.list, ...action.list], page: state.page + 1, loading: false };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.filters }, page: 1 };
    case 'SET_SELECTED':
      return { ...state, selected: action.recipe, loading: false };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.favorites };
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * RecipesProvider wraps app and exposes recipes state/actions.
 */
export function RecipesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchList = async (append = false) => {
    dispatch({ type: 'SET_LOADING', value: true });
    try {
      const res = await recipeService.getRecipes({ q: state.filters.q, filters: state.filters, page: state.page });
      dispatch({ type: append ? 'APPEND_LIST' : 'SET_LIST', list: res.items, page: res.page });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: e.message || 'Failed to fetch recipes' });
    }
  };

  const fetchById = async (id) => {
    dispatch({ type: 'SET_LOADING', value: true });
    try {
      const recipe = await recipeService.getRecipeById(id);
      dispatch({ type: 'SET_SELECTED', recipe });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: e.message || 'Failed to load recipe' });
    }
  };

  const setFilters = (filters) => dispatch({ type: 'SET_FILTERS', filters });

  const refreshFavorites = async () => {
    const favs = await recipeService.getFavorites();
    dispatch({ type: 'SET_FAVORITES', favorites: favs });
  };

  const toggleFavorite = async (id) => {
    await recipeService.toggleFavorite(id);
    await refreshFavorites();
  };

  const value = {
    state,
    actions: {
      fetchList,
      fetchById,
      setFilters,
      refreshFavorites,
      toggleFavorite,
    },
  };

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useRecipes hook to access recipes context.
 */
export function useRecipesContext() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipesContext must be used within RecipesProvider');
  return ctx;
}
