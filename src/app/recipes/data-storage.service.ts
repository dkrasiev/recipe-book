import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  uid: string = null;
  get userStorageURL() {
    if (!this.uid) {
      return null;
    }

    return (
      environment.firebase.databaseURL + '/users/' + this.uid + '/recipes.json'
    );
  }

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {
    this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        if (user) {
          this.uid = user.id;
        } else {
          this.uid = null;
        }
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.userStorageURL).pipe(
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
      })
    );
  }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();

    return this.http.put<Recipe[]>(this.userStorageURL, recipes);
  }
}
