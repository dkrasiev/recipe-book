import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  recipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.recipeId);

      if (!this.recipe) this.router.navigate(['/recipes']);
    });
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    if (confirm('Do you really want to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.recipeId);
      this.router.navigate(['/recipes']);
    }
  }
}
