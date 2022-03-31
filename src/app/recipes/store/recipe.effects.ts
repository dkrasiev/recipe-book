import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, map, switchMap, take } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import * as recipesActions from '../store/recipe.actions';

@Injectable()
export class RecipeEffects {
  private get getRecipesRef() {
    let userId;

    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((authState) => {
        userId = authState.user.id;
      });

    return this.db.object<Recipe[]>('users/' + userId + '/recipes');
  }

  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(recipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.getRecipesRef.valueChanges();
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new recipesActions.SetRecipes(recipes);
      })
    );
  });

  saveRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(recipesActions.SAVE_RECIPES),
      switchMap(() => {
        return this.store
          .select('recipes')
          .pipe(map((recipesState) => recipesState.recipes));
      }),
      map((recipes) => {
        return from(this.getRecipesRef.set(recipes));
      }),
      map(() => {
        return new recipesActions.RecipesSaved();
      })
    );
  });

  autosave$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        recipesActions.UPDATE_RECIPE,
        recipesActions.DELETE_RECIPE,
        recipesActions.ADD_RECIPE
      ),
      switchMap(() => {
        return this.store.select('recipes');
      }),
      map((recipesState) => {
        return recipesState.autosave
          ? new recipesActions.SaveRecipes()
          : { type: 'DUMMY' };
      })
    );
  });

  constructor(
    private actions$: Actions,
    private db: AngularFireDatabase,
    private store: Store<fromApp.AppState>
  ) {}
}
