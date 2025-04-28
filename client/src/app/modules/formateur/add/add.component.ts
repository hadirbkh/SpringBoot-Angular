import { Component, OnInit } from '@angular/core';
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
export class AddComponent implements OnInit {
  formateurForm: FormGroup;
  employeurs: any[] = [];
  formations: any[] = [];
  types = ['INTERNE', 'EXTERNE'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.formateurForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      type: ['', Validators.required],
      employeur: ['', Validators.required],
      formations: [[]]
    });
  }

  ngOnInit(): void {
    this.loadEmployeurs();
    this.loadFormations();
  }

  loadEmployeurs() {
    this.http.get<any[]>(`${environment.apiUrl}/emp`).subscribe({
      next: (data) => {
        this.employeurs = data;
      },
      error: (error) => {
        console.error('Error loading employers:', error);
        this.snackBar.open('Erreur lors du chargement des employeurs', 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  loadFormations() {
    this.http.get<any[]>(`${environment.apiUrl}/api/formation`).subscribe({
      next: (data) => {
        this.formations = data;
      },
      error: (error) => {
        console.error('Error loading formations:', error);
        this.snackBar.open('Erreur lors du chargement des formations', 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  onSubmit() {
    if (this.formateurForm.valid) {
      this.http.post(`${environment.apiUrl}/formateur`, this.formateurForm.value).subscribe({
        next: () => {
          this.snackBar.open('Formateur ajouté avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/formateurs/view']);
        },
        error: (error) => {
          console.error('Error adding formateur:', error);
          this.snackBar.open('Erreur lors de l\'ajout du formateur', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/formateurs/view']);
  }
} 