import { Component } from '@angular/core';

@Component({
  selector: 'app-select-forma',
  templateUrl: './select-forma.component.html',
  styleUrls: ['./select-forma.component.css']
})
export class SelectFormaComponent {
  formations = [
    {
      title: 'Formation Angular',
      description: 'Apprenez Angular de A à Z.',
      image: 'assets/images/angular.jpg',
      active: true
    },
    {
      title: 'Formation React',
      description: 'Devenez expert React.',
      image: 'assets/images/react.jpg',
      active: false
    },
    {
      title: 'Formation Node.js',
      description: 'Maîtrisez le backend Node.',
      image: 'assets/images/node.jpg',
      active: false
    }
  ];

  activateFormation(index: number) {
    this.formations.forEach((forma, i) => {
      forma.active = (i === index);
    });
  }

  customOptions = {
    loop: true,
    margin: 20,
    dots: true,
    nav: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  }
}
