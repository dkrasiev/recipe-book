import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as recipesActions from 'src/app/recipes/store/recipe.actions';
import * as shoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.recipeId = id;

          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find(
            (value, index) => this.recipeId === index
          );
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
        if (!this.recipe) this.router.navigate(['/recipes']);
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      new shoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onDeleteRecipe() {
    if (confirm('Do you really want to delete this recipe?')) {
      this.store.dispatch(new recipesActions.DeleteRecipe(this.recipeId));
    }
  }
}
