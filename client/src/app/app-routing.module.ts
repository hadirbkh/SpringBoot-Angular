import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';


const routes: Routes = [
  { path: 'utilisateurs', loadChildren: () => import('./modules/utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule) },
  { path : "formations" , loadChildren: () => import('./modules/formation/formation.module').then(m => m.FormationModule)},
  { path : "domaines" , loadChildren: () => import('./modules/domaine/domaine.module').then(m => m.DomaineModule)},
  { path : "structures" , loadChildren: () => import('./modules/structure/structure.module').then(m => m.StructureModule)},
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
