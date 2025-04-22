import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateursComponent } from './utilisateurs.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ path: '', component: UtilisateursComponent },
                        { path: 'view/:id', component: ViewComponent },
                        { path: 'edit/:id', component: EditComponent },
                        { path: 'add', component: AddComponent },
                        { path: '**', component:PageNotFoundComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateursRoutingModule { }
