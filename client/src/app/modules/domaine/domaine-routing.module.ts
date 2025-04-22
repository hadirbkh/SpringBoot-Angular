import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewComponent } from './view/view.component';
import { DomaineComponent } from './domaine.component';

const routes: Routes = [{ path: '', component: DomaineComponent },
                        { path: 'view/:id', component: ViewComponent },
                        { path: 'edit/:id', component: EditComponent },
                        { path: 'add', component: AddComponent },
                        { path: '**', component:PageNotFoundComponent }
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomaineRoutingModule { }
