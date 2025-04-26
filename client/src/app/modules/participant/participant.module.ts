import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ParticipantComponent } from './participant.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ParticipantRoutingModule } from './participant-routing.module';
import { ProfilService } from '../../services/profil.service';

const routes: Routes = [
  { path: '', component: ParticipantComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    ParticipantComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ParticipantRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [
    ProfilService
  ]
})
export class ParticipantModule { } 