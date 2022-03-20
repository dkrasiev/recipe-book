import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<void>();

  private recipes: Recipe[] = [
    new Recipe(
      'First test',
      'This is simply a test',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tasteofhome.com%2Fwp-content%2Fuploads%2F2019%2F06%2FEasy-Slow-Cooker-Tamale-Dinner_EXPS_THEDSC19_59521_B03_01_3b_rms-1.jpg&f=1&nofb=1',
      [new Ingredient('Meat', 1), new Ingredient('Bread', 1)]
    ),
    new Recipe(
      'Second test',
      'This is simply a test',
      'https://www.simplyrecipes.com/thmb/UsgS577pgARAYpmXDmLsQOoRjBU=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__03__shrimp-cakes-horiz-a-1600-81a70584616749b29062d884ea7a712f.jpg',
      []
    ),
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next();
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next();
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next();
  }
}
