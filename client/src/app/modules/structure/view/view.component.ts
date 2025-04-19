import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Structure } from '../../../models/structure';
import { StructureService } from '../../../services/structure.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  structure: Structure | null = null;

  constructor(
    private route: ActivatedRoute,
    private structureService: StructureService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.structureService.getStructureById(+id).subscribe({
        next: (structure) => {
          this.structure = structure;
        },
        error: (error) => {
          console.error('Erreur lors du chargement de la structure:', error);
        }
      });
    }
  }
} 