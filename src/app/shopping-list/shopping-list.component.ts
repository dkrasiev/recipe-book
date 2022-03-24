import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientSubscription: Subscription;
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscription =
      this.shoppingListService.ingredientsChanged.subscribe(() =>
        this.onIngredientAdded()
      );
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  onIngredientAdded() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
