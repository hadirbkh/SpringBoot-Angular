import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeurComponent } from './employeur.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeurComponent,
    children: [
      { path: 'add', component: AddComponent },
      { path: 'view', component: ViewComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeurRoutingModule { } 