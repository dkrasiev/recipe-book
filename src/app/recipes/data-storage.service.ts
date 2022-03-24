import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        environment.firebase.databaseURL + '/recipes.json'
      )
      .pipe(
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

    return this.http.put<Recipe[]>(
      environment.firebase.databaseURL + '/recipes.json',
      recipes
    );
  }
}
