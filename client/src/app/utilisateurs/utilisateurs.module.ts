import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { UtilisateursComponent } from './utilisateurs.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddComponent } from './add/add.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,MatSnackBarModule
  ],
  exports: [
    // Add any components you want to make available to other modules
  ]
})
export class UtilisateursModule { }