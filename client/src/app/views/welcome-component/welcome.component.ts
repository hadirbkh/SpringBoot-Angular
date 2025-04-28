import { AuthService } from './../../services/auth.service';
import { ParticipantService } from './../../services/participant.service';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { FormationService } from 'src/app/services/formation.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'welcome-component',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  usersCounter: number = 0;
  formationCounter: number = 0;
  participantCounter: number = 0;

  user! : Utilisateur

  constructor(
    private authService : AuthService,
    private utilisateurService: UtilisateursService,
    private formationService: FormationService ,
    private participantService:ParticipantService) {}

  ngOnInit(): void {

    this.user = this.authService.currentUser as Utilisateur

    this.utilisateurService.utilisateurs$.subscribe(users => {
      const targetUsers = users.length;
      this.animateCounter('usersCounter', targetUsers);
    });

    this.formationService.formations$.subscribe(formations => {
      const targetFormations = formations.length;
      this.animateCounter('formationCounter', targetFormations);
    });

    this.participantService.participants$.subscribe(participants => {
      const targetParticipants = participants.length;
      this.animateCounter('participantCounter', targetParticipants);
    });
  }

  animateCounter(counterName: 'usersCounter' | 'formationCounter' | 'participantCounter', target: number) {
    let current = 0;
    const stepTime = 1000 / target; // on ajuste la vitesse automatiquement si tu veux

    const interval = setInterval(() => {
      if (current < target) {
        current++;
        this[counterName] = current;
      } else {
        clearInterval(interval);
      }
    }, stepTime > 10 ? stepTime : 10); // minimum 10ms pour éviter que ça aille trop vite
  }
}
