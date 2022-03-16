import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private shoppingList: Ingredient[] = [
    new Ingredient("Eggs", 10),
    new Ingredient("Apples", 5)
  ];

  ingredientAdded = new EventEmitter<Ingredient>();
  
  constructor() { }

  getShoppingList() {
    return this.shoppingList.slice();
  }
}
