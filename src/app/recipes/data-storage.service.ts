import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  recipesSaved = new Subject<void>();

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-62867-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
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

    this.http
      .put<Recipe[]>(
        'https://recipe-book-62867-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe(() => {
        this.recipesSaved.next();
      });
  }
}
