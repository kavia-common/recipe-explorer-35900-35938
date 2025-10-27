import { useRecipesContext } from '../state/recipesContext';

// PUBLIC_INTERFACE
export default function useRecipes() {
  return useRecipesContext();
}
