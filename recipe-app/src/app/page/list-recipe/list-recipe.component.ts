import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService} from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.scss']
})
export class ListRecipeComponent implements OnInit, OnDestroy {

  currentCar: string;
  allowed: boolean = false;
  cars : string[] = [
    "opel",
    "mazda",
    "audi",
  ];
  recipeSubscription: Subscription;
  recipes: Recipe[] = [];

  constructor(
    private recipeService : RecipeService
  ) { }

  //similaire au componentDidMount de React
  ngOnInit(): void {
    this.currentCar = "Renault"

    setTimeout(() => {
      this.allowed = true; 
    },3000);

    this.recipeSubscription = this.recipeService.recipesSubject.subscribe(
      (recipes: any) => {
        this.recipes = recipes;
        console.log("subcription")
        console.log(this.recipes);
      },
      (error) => {
        console.log(error);
      }
    );
    
    this.recipeService.getAllRecipes();

    }

  activate(id: number){
    alert(id)
  }

  getRecipes(){
    this.recipeService.getAllRecipes();
  }



  ngOnDestroy(){

  }

}

