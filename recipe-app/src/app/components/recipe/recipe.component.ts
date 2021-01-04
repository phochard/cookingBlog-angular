import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() recipeId: number;
  @Input() recipeTitle: string;
  @Input() recipeDescription: string;
  @Input() recipeRating: number;
  @Input() recipeImage: string;

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  goToRecipe(recipId: number){
    this.router.navigate(['recipes',recipId])
  }

  counter(i: number){
    return new Array(i);
  }

  restCounter(i: number){
    return new Array(5-i);
  }

}
