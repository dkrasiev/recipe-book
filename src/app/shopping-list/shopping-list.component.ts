import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as shoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private ingredientSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

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
