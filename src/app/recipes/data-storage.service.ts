import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private uid = null;
  private get getRecipesRef() {
    if (this.uid) {
      return this.db.object<Recipe[]>('users/' + this.uid + '/recipes');
    }
    return null;
  }

  constructor(
    private recipeService: RecipeService,
    private db: AngularFireDatabase,
    private store: Store<fromApp.AppState>
  ) {
    this.store.select('auth').subscribe((authData) => {
      if (authData.user) {
        this.uid = authData.user.id;
      } else {
        this.uid = null;
      }
    });
  }

  fetchRecipes() {
    return this.getRecipesRef.valueChanges().pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
        console.log(recipes);
      })
    );

    // return this.http.get<Recipe[]>(environment.firebase.databaseURL + '/recipes.json').pipe(
    //   map((recipes) => {
    //     return recipes.map((recipe) => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : [],
    //       };
    //     });
    //   }),
    //   tap((recipes) => {
    //     this.recipeService.setRecipes(recipes);
    //   })
    // );
  }

  saveRecipes() {
    return this.getRecipesRef.set(this.recipeService.getRecipes());

    // const recipes = this.recipeService.getRecipes();

    // return this.http.put<Recipe[]>(this.userStorageURL, recipes);
  }
}
