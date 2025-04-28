import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeur',
  templateUrl: './employeur.component.html',
  styleUrls: ['./employeur.component.css']
})
export class EmployeurComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToAdd() {
    this.router.navigate(['/employeurs/add']);
  }

  navigateToView() {
    this.router.navigate(['/employeurs/view']);
  }
} 