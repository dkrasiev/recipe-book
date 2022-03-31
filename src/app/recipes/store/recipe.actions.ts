import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipe] Set Recipes';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';
export const SAVE_RECIPES = '[Recipe] Save Recipes';
export const RECIPES_SAVED = '[Recipe] Recipes Saved';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const SELECT_RECIPE = '[Recipe] Select Recipe';
export const TOGGLE_AUTOSAVE = '[Recipe] Toggle Autosave';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { index: number; recipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class SelectRecipe implements Action {
  readonly type = SELECT_RECIPE;
  constructor(public payload: number) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
  constructor() {}
}
export class SaveRecipes implements Action {
  readonly type = SAVE_RECIPES;
  constructor() {}
}
export class RecipesSaved implements Action {
  readonly type = RECIPES_SAVED;
  constructor() {}
}
export class ToggleAutosave implements Action {
  readonly type = TOGGLE_AUTOSAVE;
  constructor() {}
}

export type RecipeActions =
  | SetRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | SelectRecipe
  | ToggleAutosave;
