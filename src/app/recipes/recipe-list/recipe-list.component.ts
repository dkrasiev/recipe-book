import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  storeSub: Subscription;

  recipes: Observable<Recipe[]>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.recipes = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes));
  }

  ngOnDestroy() {
    if (this.storeSub) this.storeSub.unsubscribe();
  }
}
