import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../classes/recipe';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesSubject = new Subject<Recipe[]>();
  currentRecipeSubject = new Subject<Recipe>();
  popularRecipeSubject = new Subject<Recipe[]>();
  categoriesSubject = new Subject<Recipe[]>();
  private recipes : Recipe[] = [];
  private currentRecipe: Recipe;
  private popularRecipes: Recipe[] = [];

  private categories: any[] = [];


  constructor(
    private httpClient: HttpClient
  ) { }

  emitRecipeSubject() {
    this.recipesSubject.next(this.recipes.slice());
  }

  emitCurrentRecipeSubject() {
    this.currentRecipeSubject.next(this.currentRecipe);
  }

  emitPopularRecipeSubject() {
    this.popularRecipeSubject.next(this.popularRecipes);
  }

  emitCategoriesSubject() {
    this.categoriesSubject.next(this.categories);
  }

  switchOnAll() {
    for (let recipe of this.recipes) {
      recipe.description = 'allumé';
    }
    this.emitRecipeSubject();
  }

  switchOffAll() {
    for (let recipe of this.recipes) {
      recipe.description = 'éteint';
      this.emitRecipeSubject();
    }
  }

  switchOnOne(i: number) {
    this.recipes[i].description = 'allumé';
    this.emitRecipeSubject();
  }

  switchOffOne(i: number) {
    this.recipes[i].description = 'éteint';
    this.emitRecipeSubject();
  }

  getAllRecipes(){
    this.httpClient
      .get(environment.apiUrl+"recipes")
      .subscribe(
        (recipes: any[]) => {
          this.recipes = recipes;
          this.emitRecipeSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getPopularRecipes(){
    this.httpClient
      .get(environment.apiUrl+"recipes/popular")
      .subscribe(
        (recipes: any[]) => {
          this.popularRecipes = recipes;
          this.emitPopularRecipeSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getAllCategories(){
    this.httpClient
      .get(environment.apiUrl+"categories")
      .subscribe(
        (categories: Category[]) => {
          this.categories = categories;
          this.emitCategoriesSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getRecipeById(id){
    // const params = new HttpParams().set('email', this.authService.);
    this.httpClient
      .get(environment.apiUrl+"recipes/"+id)
      .subscribe(
        (recipe: Recipe) => {
          this.currentRecipe = recipe;
          this.emitCurrentRecipeSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.emitRecipeSubject(); 
  }
}