import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  itemId: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.itemId = id;
        // const editingItem = this.shoppingListService.getIngredient(this.itemId);
        this.store.select('shoppingList').subscribe((v) => {
          this.slForm.setValue({
            name: v.ingredients[id].name,
            amount: v.ingredients[id].amount,
          });
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.itemId, newIngredient);

      this.store.dispatch(
        new shoppingListActions.UpdateIngredient({
          id: this.itemId,
          ingredient: newIngredient,
        })
      );
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }

    this.onClear();
  }

  onDeleteItem() {
    // this.shoppingListService.deleteIngredient(this.itemId);
    this.store.dispatch(new shoppingListActions.DeleteIngredient(this.itemId));
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
}
