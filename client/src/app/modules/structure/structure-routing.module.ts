import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureComponent } from './structure.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: StructureComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureRoutingModule { } 