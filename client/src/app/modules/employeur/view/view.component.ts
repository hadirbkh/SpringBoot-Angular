import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomemployeur', 'actions'];
  dataSource: MatTableDataSource<any>;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadEmployeurs();
  }

  loadEmployeurs() {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/emp`).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employers:', error);
        this.snackBar.open('Erreur lors du chargement des employeurs', 'Fermer', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployeur(id: number) {
    this.router.navigate(['/employeurs/edit', id]);
  }

  deleteEmployeur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employeur ?')) {
      this.http.delete(`${environment.apiUrl}/emp/${id}`).subscribe({
        next: () => {
          this.snackBar.open('Employeur supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          this.loadEmployeurs();
        },
        error: (error) => {
          console.error('Error deleting employer:', error);
          this.snackBar.open('Erreur lors de la suppression de l\'employeur', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }
} 