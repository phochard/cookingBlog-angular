import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { Category } from 'src/app/interfaces/category';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  recipes: any[];
  popularRecipeSubscription: Subscription;
  categories: Category[];
  categoriesRecipeSubscription: Subscription;
  users: User[];
  userSubscription: Subscription;

  userForm: FormGroup;
  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.popularRecipeSubscription = this.recipeService.popularRecipeSubject.subscribe(
      (recipes: any[]) => {
        console.log(recipes)
        this.recipes = recipes;
      }
    );

    this.recipeService.getPopularRecipes();

    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.getAllUsers();

    this.categoriesRecipeSubscription = this.recipeService.categoriesSubject.subscribe(
      (categories: []) =>{
        this.categories = categories;
      }
    )
    
    this.recipeService.getAllCategories();

    this.initializeForm();
  }



  initializeForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      hobbies: this.formBuilder.array([])
    });
  }

  getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby() {
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['email'],
      formValue['description'],
      formValue['hobbies'] ? formValue['hobbies'] : []
    );
    this.userService.addUser(newUser);
    this.userForm.reset()
  }

  counterRating(i: number) {
    return new Array(i);
  }
  restCounterRating(i: number) {
    return new Array(5 - i);
  }


  ngOnDestroy() {
    this.popularRecipeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}