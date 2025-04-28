import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  employeurForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.employeurForm = this.fb.group({
      nomemployeur: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.employeurForm.valid) {
      this.http.post(`${environment.apiUrl}/emp`, this.employeurForm.value).subscribe({
        next: () => {
          this.snackBar.open('Employeur ajouté avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/employeurs/view']);
        },
        error: (error) => {
          console.error('Error adding employer:', error);
          this.snackBar.open('Erreur lors de l\'ajout de l\'employeur', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/employeurs/view']);
  }
} 