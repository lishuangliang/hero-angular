import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HeroesComponent} from './heroes/heroes.component';
import {UpdateHeroComponent} from './update-hero/update-hero.component';

const routes: Routes = [
  {
    path : 'heroes',
    component : HeroesComponent
  },
  {
    path : 'update-hero',
    component : UpdateHeroComponent
  },
  {
    path : 'update-hero/:id',
    component : UpdateHeroComponent
  },
  {
    path : '',
    redirectTo : '/heroes',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
