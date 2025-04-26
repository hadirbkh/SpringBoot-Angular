import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipantService } from '../../../services/participant.service';
import { Participant } from '../../../models/participant';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  participant: Participant | null = null;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private participantService: ParticipantService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadParticipant();
  }

  loadParticipant() {
    this.participantService.getParticipantById(this.id).subscribe(
      participant => {
        this.participant = participant;
      }
    );
  }
} 