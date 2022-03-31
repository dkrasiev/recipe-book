import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription, switchMap } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import * as recipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeId: number;
  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;
  storeSub: Subscription;

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

        if (this.recipe) {
          this.editMode = true;
        } else {
          this.editMode = false;
          this.router.navigate(['/recipes/new']);
        }

        this.initForm();
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  initForm() {
    let recipeName: string = null;
    let recipeImagePath: string = null;
    let recipeDescription: string = null;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map((recipesState) =>
            recipesState.recipes.find((value, index) => this.recipeId === index)
          )
        )
        .subscribe((recipe) => {
          if (!recipe) return;

          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.min(1),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(1, [Validators.required, Validators.min(1)]),
      })
    );
  }

  onDeleteIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new recipesActions.UpdateRecipe({
          index: this.recipeId,
          recipe: this.recipeForm.value,
        })
      );
    } else {
      this.store.dispatch(new recipesActions.AddRecipe(this.recipeForm.value));
    }

    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.recipeForm.reset();
    this.router.navigate(['/recipes', this.recipeId]);
  }
}
