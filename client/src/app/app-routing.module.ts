import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'utilisateurs', loadChildren: () => import('./modules/utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule) },
  { path : "formations" , loadChildren: () => import('./modules/formation/formation.module').then(m => m.FormationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
