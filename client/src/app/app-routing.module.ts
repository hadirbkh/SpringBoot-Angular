import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { WelcomeComponent } from './views/welcome-component/welcome.component';
import { RoleGuard } from './services/role.guard';


const routes: Routes = [
  { path: '', component : WelcomeComponent },
  { path: 'utilisateurs',  canActivate: [RoleGuard], data: { role: 'ADMIN' }, loadChildren: () => import('./modules/utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule) },
  { path : "formations" , loadChildren: () => import('./modules/formation/formation.module').then(m => m.FormationModule)},
  { path : "domaines" , loadChildren: () => import('./modules/domaine/domaine.module').then(m => m.DomaineModule)},
  { path : "structures" , loadChildren: () => import('./modules/structure/structure.module').then(m => m.StructureModule)},
  { path : "participants" , loadChildren: () => import('./modules/participant/participant.module').then(m => m.ParticipantModule)},
  { path: 'statistics', component: StatisticsComponent },
  {path : "profils" , loadChildren: () => import('./modules/profil/profil.module').then(m => m.ProfilModule)},
  { path: 'formateurs', loadChildren: () => import('./modules/formateur/formateur.module').then(m => m.FormateurModule) },
  { path: 'employeurs', loadChildren: () => import('./modules/employeur/employeur.module').then(m => m.EmployeurModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
