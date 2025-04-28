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
  formateurForm: FormGroup;
  employeurs: any[] = [];
  formations: any[] = [];
  types = ['INTERNE', 'EXTERNE'];
  id: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.id = 0;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployeurs();
    this.loadFormations();
    this.loadFormateur();
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

  loadFormateur() {
    this.http.get<any>(`${environment.apiUrl}/formateur/${this.id}`).subscribe({
      next: (data) => {
        this.formateurForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          tel: data.tel,
          type: data.type,
          employeur: data.employeur,
          formations: data.formations || []
        });
      },
      error: (error) => {
        console.error('Error loading formateur:', error);
        this.snackBar.open('Erreur lors du chargement du formateur', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/formateurs/view']);
      }
    });
  }

  onSubmit() {
    if (this.formateurForm.valid) {
      this.http.put(`${environment.apiUrl}/formateur/${this.id}`, this.formateurForm.value).subscribe({
        next: () => {
          this.snackBar.open('Formateur modifié avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/formateurs/view']);
        },
        error: (error) => {
          console.error('Error updating formateur:', error);
          this.snackBar.open('Erreur lors de la modification du formateur', 'Fermer', {
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