import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StructureService } from '../../../services/structure.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  structureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private structureService: StructureService,
    private dialogRef: MatDialogRef<AddComponent>,
    private snackBar: MatSnackBar
  ) {
    this.structureForm = this.fb.group({
      libelle: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.structureForm.valid) {
      this.structureService.createStructure(this.structureForm.value).subscribe({
        next: () => {
          this.showSuccess('Structure ajoutée avec succès');
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout:', error);
          this.showError('Erreur lors de l\'ajout de la structure');
        }
      });
    }
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
} 