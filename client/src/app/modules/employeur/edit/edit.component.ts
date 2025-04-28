import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  employeurForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.employeurForm = this.fb.group({
      nomemployeur: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.id = 0;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployeur();
  }

  loadEmployeur() {
    this.http.get<any>(`${environment.apiUrl}/emp/${this.id}`).subscribe({
      next: (data) => {
        this.employeurForm.patchValue({
          nomemployeur: data.nomemployeur
        });
      },
      error: (error) => {
        console.error('Error loading employer:', error);
        this.snackBar.open('Erreur lors du chargement de l\'employeur', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/employeurs/view']);
      }
    });
  }

  onSubmit() {
    if (this.employeurForm.valid) {
      this.http.put(`${environment.apiUrl}/emp/${this.id}`, this.employeurForm.value).subscribe({
        next: () => {
          this.snackBar.open('Employeur modifié avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/employeurs/view']);
        },
        error: (error) => {
          console.error('Error updating employer:', error);
          this.snackBar.open('Erreur lors de la modification de l\'employeur', 'Fermer', {
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