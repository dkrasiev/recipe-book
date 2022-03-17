import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new Subject<void>();

  private ingredients: Ingredient[] = [
    new Ingredient("Eggs", 10),
    new Ingredient("Apples", 5)
  ];
  
  constructor() { }
  
  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next();
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.ingredients.push(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next();
  }
}
