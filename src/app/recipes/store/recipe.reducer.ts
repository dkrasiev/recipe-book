import { Recipe } from '../recipe.model';
import * as recipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
  autosave: boolean;
  message: string;
}

const initialState: State = {
  recipes: [],
  autosave: false,
  message: null,
};

export function RecipeReducer(
  state = initialState,
  action: recipeActions.RecipeActions
) {
  switch (action.type) {
    case recipeActions.SET_RECIPES:
      return { ...state, recipes: action.payload };
    case recipeActions.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case recipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        imagePath: '',
        ...state.recipes[action.payload.index],
        ...action.payload.recipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return { ...state, recipes: updatedRecipes };
    case recipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter((value, index) => {
            return index !== action.payload;
          }),
        ],
      };
    case recipeActions.TOGGLE_AUTOSAVE:
      return { ...state, autosave: !state.autosave };
    default:
      return state;
  }
}
