import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'First test', 
      'This is simply a test', 
      'https://www.simplyrecipes.com/thmb/UsgS577pgARAYpmXDmLsQOoRjBU=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__03__shrimp-cakes-horiz-a-1600-81a70584616749b29062d884ea7a712f.jpg', 
      [
        new Ingredient('Meat', 1),
        new Ingredient('Bread', 1)
      ]),
    new Recipe('Second test', 'This is simply a test', 'https://www.simplyrecipes.com/thmb/UsgS577pgARAYpmXDmLsQOoRjBU=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__03__shrimp-cakes-horiz-a-1600-81a70584616749b29062d884ea7a712f.jpg', [])
  ];

  constructor() {

  }
  
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
