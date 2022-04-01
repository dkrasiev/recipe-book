import {
  animate,
  style,
  transition,
  trigger,
  group,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as shoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('in', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
          color: 'green',
        }),
        group([
          style({ color: 'green' }),
          animate(
            500,
            style({
              transform: 'translateX(0)',
              opacity: 1,
            })
          ),
        ]),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
            color: 'red',
            transform: 'translateX(100px)',
          })
        ),
      ]),
    ]),
  ],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(id: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(id));
  }
}
