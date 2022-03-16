import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new EventEmitter<void>();

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
    this.ingredientAdded.emit();
  }
}
