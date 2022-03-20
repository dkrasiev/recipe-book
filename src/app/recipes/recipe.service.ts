import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<void>();

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) {}

  fetchRecipes() {
    this.http
      .get<{ [id: string]: Recipe[] }>(
        'https://recipe-book-62867-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .subscribe((recipes) => {
        for (const key in recipes) {
          this.recipes = recipes[key];
        }

        this.recipesChanged.next();
      });
  }

  saveRecipes() {
    this.http
      .delete(
        'https://recipe-book-62867-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .subscribe();

    this.http
      .post<Recipe[]>(
        'https://recipe-book-62867-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        this.recipes
      )
      .subscribe((responseData) => {
        console.log(responseData);
        alert('Recipes was saved');
      });
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next();
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next();
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next();
  }
}
