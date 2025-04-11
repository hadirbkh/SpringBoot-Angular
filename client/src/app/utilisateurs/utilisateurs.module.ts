import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { UtilisateursComponent } from './utilisateurs.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddComponent } from './add/add.component';
import {MatCardModule} from '@angular/material/card';
import {MatPaginator,MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    UtilisateursComponent,
    AddComponent,
    ViewComponent,
    EditComponent,
    DeleteComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    UtilisateursRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
  ]
})
export class UtilisateursModule { }
