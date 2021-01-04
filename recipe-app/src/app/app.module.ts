import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { TestComponent } from './page/test/test.component';
import { TestModule } from './page/test/test.module';
import { RecipeComponent } from './components/recipe/recipe.component';
import { HomeModule } from './page/home/home.module';
import { UserComponent } from './components/user/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateRecipeComponent } from './page/create-recipe/create-recipe.component';
import { CreateRecipeModule } from './page/create-recipe/create-recipe.module';
import { ListRecipeComponent } from './page/list-recipe/list-recipe.component';
import { ListRecipeModule } from './page/list-recipe/list-recipe.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewRecipeComponent } from './page/view-recipe/view-recipe.component';
import { ViewRecipeModule } from './page/view-recipe/view-recipe.module';
import { ContactComponent } from './page/contact/contact.component';
import { SearchComponent } from './page/search/search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    RecipeComponent,
    UserComponent,
    CreateRecipeComponent,
    ListRecipeComponent,
    PageNotFoundComponent,
    ViewRecipeComponent,
    ContactComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TestModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CreateRecipeModule,
    ListRecipeModule,
    ViewRecipeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }