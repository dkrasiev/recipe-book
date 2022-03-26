import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editingIngredient: Ingredient;
  editingIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initializeState: State = {
  ingredients: [new Ingredient('Apple', 10), new Ingredient('Tomatoes', 5)],
  editingIngredient: null,
  editingIngredientIndex: -1,
};

export function ShoppingListReducer(
  state = initializeState,
  action: shoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case shoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case shoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.id] = action.payload.ingredient;

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case shoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((value, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}
