import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editingIngredient: Ingredient;
  editingIngredientIndex: number;
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
      updatedIngredients[state.editingIngredientIndex] = action.payload;

      return {
        ...state,
        ingredients: updatedIngredients,
        editingIngredient: null,
        editingIngredientIndex: -1,
      };
    case shoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((value, index) => {
          return index !== state.editingIngredientIndex;
        }),
        editingIngredient: null,
        editingIngredientIndex: -1,
      };
    case shoppingListActions.START_EDIT:
      return {
        ...state,
        editingIngredient: { ...state.ingredients[action.payload] },
        editingIngredientIndex: action.payload,
      };
    case shoppingListActions.STOP_EDIT:
      return {
        ...state,
        editingIngredient: null,
        editingIngredientIndex: -1,
      };
    default:
      return state;
  }
}
