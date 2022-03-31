import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeId: number;
  recipe: Observable<Recipe>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.recipe = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes[this.recipeId]));
  }
}
