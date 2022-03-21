import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../recipes/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
  autosave: boolean = false;
  recipesSavedMessage: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe(() => {
      if (this.autosave) this.onSaveData();
    });

    this.dataStorageService.recipesSaved.subscribe(() => {
      this.showRecipesSavedMessage();
    });
  }

  toggleAutosave() {
    this.autosave = !this.autosave;
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  showRecipesSavedMessage() {
    this.recipesSavedMessage = true;
    setTimeout(() => {
      this.recipesSavedMessage = false;
    }, 2000);
  }
}
