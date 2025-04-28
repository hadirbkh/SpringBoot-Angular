import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToAdd() {
    this.router.navigate(['/formateurs/add']);
  }

  navigateToView() {
    this.router.navigate(['/formateurs/view']);
  }
} 