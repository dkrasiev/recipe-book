import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<fromShoppingList.State>;
  private ingredientSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientSubscription =
    //   this.shoppingListService.ingredientsChanged.subscribe(() =>
    //     this.onIngredientAdded()
    //   );
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  onIngredientAdded() {
    // this.ingredients = this.shoppingListService.getIngredients();
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
