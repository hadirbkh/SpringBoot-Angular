import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone:true,
  imports:[MatCardModule,MatIconModule,MatButtonModule,    CommonModule  ],
  templateUrl: './formation-carousel.component.html',
  styleUrls: ['./formation-carousel.component.css']
})
export class FormationCarouselComponent {
  formations = [
    { titre: 'Angular Débutant', description: 'Bases et composants.', image: 'assets/angular1.png' },
    { titre: 'Angular Avancé', description: 'Services, RxJS et Routing.', image: 'assets/angular2.png' },
    { titre: 'Angular Material', description: 'UI stylée et responsive.', image: 'assets/angular3.png' },
    { titre: 'TypeScript', description: 'Langage moderne pour Angular.', image: 'assets/ts.png' },
    { titre: 'RxJS', description: 'Programmation réactive.', image: 'assets/rxjs.png' },
    { titre: 'NgRx', description: 'Gestion d’état avancée.', image: 'assets/ngrx.png' },
  ];

  currentIndex = 0;
  visibleCount = 3;

  next() {
    if (this.currentIndex + this.visibleCount < this.formations.length) {
      this.currentIndex += this.visibleCount;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.visibleCount;
    }
  }

  get visibleFormations() {
    console.log(this.formations.slice(this.currentIndex, this.currentIndex + this.visibleCount));

    return this.formations.slice(this.currentIndex, this.currentIndex + this.visibleCount);
  }

  
}
