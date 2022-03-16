import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient>();

  private shoppingList: Ingredient[] = [
    new Ingredient("Eggs", 10),
    new Ingredient("Apples", 5)
  ];
  
  constructor() { }
  
  getShoppingList() {
    return this.shoppingList.slice();
  }
}
