import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import { FromationsRoutingModule } from './formation-routing.module';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddComponent } from './add/add.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FormationComponent } from './formation.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    FormationComponent,
    AddComponent,
    ViewComponent,
    EditComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FromationsRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,MatFormFieldModule,
    MatInputModule,FormsModule,MatSelectModule

  ],
  exports: [
    // Add any components you want to make available to other modules
  ]
})
export class FormationModule { }
