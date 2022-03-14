import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model'
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test', 'This is simply a test', 'https://www.simplyrecipes.com/thmb/UsgS577pgARAYpmXDmLsQOoRjBU=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__03__shrimp-cakes-horiz-a-1600-81a70584616749b29062d884ea7a712f.jpg'),
    new Recipe('A test', 'This is simply a test', 'https://www.simplyrecipes.com/thmb/UsgS577pgARAYpmXDmLsQOoRjBU=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__03__shrimp-cakes-horiz-a-1600-81a70584616749b29062d884ea7a712f.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
