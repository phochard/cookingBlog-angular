import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './page/test/test.component';
import { HomeComponent } from './page/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactComponent } from './page/contact/contact.component';
import { SearchComponent } from './page/search/search.component';
import { ViewRecipeComponent } from './page/view-recipe/view-recipe.component';

const routes: Routes = [
  // {
  //   path: 'test',
  //   loadChildren: () => import('./page/test/test.module')
  //     .then(mod => mod.TestModule)
  // },
  { path: '', component: HomeComponent },
  { path: 'test', canActivate: [AuthGuard], component: TestComponent, pathMatch: 'full', },
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/list-recipe/list-recipe.module')
      .then(mod => mod.ListRecipeModule)
  },
  // {
  //   path: 'recipes/:id',
  //   canActivate: [AuthGuard],
  //    component: ViewRecipeComponent,
  // },
  // { path: 'appareils/:id', component: SingleAppareilComponent },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent, pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent, pathMatch: 'full', },
  // { path: '**', redirectTo: 'not-found' }

  // 

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }