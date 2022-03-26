import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as shoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<fromShoppingList.State>;
  private ingredientSubscription: Subscription;

  constructor(private store: Store<fromShoppingList.AppState>) {}

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
    this.store.dispatch(new shoppingListActions.StartEdit(id));
    // this.shoppingListService.startedEditing.next(id);
  }
}
