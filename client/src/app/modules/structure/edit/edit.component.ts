import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Structure } from '../../../models/structure';
import { StructureService } from '../../../services/structure.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  structureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private structureService: StructureService,
    private dialogRef: MatDialogRef<EditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Structure
  ) {
    this.structureForm = this.fb.group({
      libelle: [data.libelle, Validators.required]
    });
  }

  onSubmit() {
    if (this.structureForm.valid) {
      const updatedStructure = {
        ...this.data,
        ...this.structureForm.value
      };

      this.structureService.updateStructure(this.data.id!, updatedStructure).subscribe({
        next: () => {
          this.showSuccess('Structure modifiée avec succès');
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Erreur lors de la modification:', error);
          this.showError('Erreur lors de la modification de la structure');
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