import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Recipe } from '../../classes/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {

  recipeSubscription: Subscription;

  recipes: Recipe[];
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', Validators.required],
      level:  ['', Validators.required],
      preparation_time : ['', Validators.required],
      baking_time: ['', Validators.required],
      steps: this.formBuilder.array([]),
      ingredients: this.formBuilder.array([]),
  
    })
  }

  getSteps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }
  onAddStep() {
    const newStepControl = this.formBuilder.control(null, Validators.required);
    this.getSteps().push(newStepControl);
  }
  getIngredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  onAddIngredient() {
    const newIngredientControl = this.formBuilder.control(null, Validators.required);
    this.getIngredients().push(newIngredientControl);
  }

  onSubmitForm() {
    const formValue = this.recipeForm.value;
    const newRecipe= new Recipe(
      formValue['title'],
      formValue['description'],
      formValue['image'],
      formValue['level'],
      formValue['preparation_time'],
      formValue['baking_time'],
      formValue['steps'] ,
      formValue['ingredients']
    );
    console.log(newRecipe)
    // this.recipeService.addRecipe(newRecipe);
    // this.recipeForm.reset();
    // this.router.navigate(['recipes']);
  }
}
