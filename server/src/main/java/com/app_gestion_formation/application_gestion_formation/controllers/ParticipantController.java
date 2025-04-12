package com.app_gestion_formation.application_gestion_formation.controllers;

/*import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app_gestion_formation.application_gestion_formation.models.Participant;
import com.app_gestion_formation.application_gestion_formation.response.MessageResponse;
import com.app_gestion_formation.application_gestion_formation.services.ParticipantService;
 */
/* 
@RestController
@RequestMapping("/participants")
@CrossOrigin("*")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping
    public List<Participant> getAllParticipants() {
        return participantService.getAllParticipants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participant> getParticipantById(@PathVariable Long id) {
        Participant participant = participantService.getParticipantById(id);
        return participant != null ? ResponseEntity.ok(participant) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('UTILISATEUR') ")

    public MessageResponse addParticipant(@RequestBody Participant participant) {
        return participantService.addParticipant(participant);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('UTILISATEUR') ")

    public Participant updateParticipant(@PathVariable Long id, @RequestBody Participant participant) {
        return participantService.updateParticipant(id, participant);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('UTILISATEUR') ")

    public void deleteParticipant(@PathVariable Long id) {
        participantService.deleteParticipant(id);
    }

    @PostMapping("/{id}/inscription")
    public ResponseEntity<Participant> inscrireAuxFormations(@PathVariable int id,@RequestBody List<Integer> formationIds)
    {
        Participant updated = participantService.inscrireParticipantAuxFormations(id, formationIds);
        return ResponseEntity.ok(updated);
    }
}*/