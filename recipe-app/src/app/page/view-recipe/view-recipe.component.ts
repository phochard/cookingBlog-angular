import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../classes/recipe';


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {

  recipe: Recipe;
  currentRecipeSubscription: Subscription;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
  ) { 
/*     this.activatedRoute.params.subscribe((params: Params)=>{
      if (params.id){
        console.log(params)
        //this.id = params.id;
    }
  }); */
this.id= this.activatedRoute.snapshot.params['id'];
}

  ngOnInit(): void {
  
    this.currentRecipeSubscription = this.recipeService.currentRecipeSubject.subscribe(
    (recipe: any) => {
      this.recipe = recipe;
    },
    (error) => {
      console.log(error);
    }
  );

    this.recipeService.getRecipeById(this.id);
};


}
