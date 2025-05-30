package com.app_gestion_formation.application_gestion_formation.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.app_gestion_formation.application_gestion_formation.models.Formation;
import com.app_gestion_formation.application_gestion_formation.models.Participant;
import com.app_gestion_formation.application_gestion_formation.repositories.FormationRepo;
import com.app_gestion_formation.application_gestion_formation.repositories.ParticipantRepo;
import com.app_gestion_formation.application_gestion_formation.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepo participantRepository;

    @Autowired
    private FormationRepo formationRepository;

    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    public Participant getParticipantById(Long id) {
        return participantRepository.findById(id).orElse(null);
    }

    @Transactional
public Participant addParticipant(Participant participant) {
    boolean exists = participantRepository.existsByEmail(participant.getEmail());
    if (exists) {
        throw new RuntimeException("Ce participant existe déjà avec cet email !");
    }
    return participantRepository.save(participant);
}

    public void deleteParticipant(Long id) {
        participantRepository.deleteById(id);
    }

    public Participant updateParticipant(Long id, Participant updatedParticipant) {
        Participant existing = participantRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setNom(updatedParticipant.getNom());
            existing.setPrenom(updatedParticipant.getPrenom());
            existing.setEmail(updatedParticipant.getEmail());
            existing.setTel(updatedParticipant.getTel());
            existing.setStructure(updatedParticipant.getStructure());
            existing.setProfil(updatedParticipant.getProfil());
            return participantRepository.save(existing);
        }
        return null;
    }

    @Transactional
public Participant inscrireParticipantAuxFormations(Long participantId, List<Integer> formationIds) {
    // Fetch the participant or throw an exception if not found
    Participant participant = participantRepository.findById(participantId)
            .orElseThrow(() -> new RuntimeException("Participant introuvable"));

    // Fetch the formations by IDs
    List<Formation> formations = formationRepository.findAllById(formationIds);

    // Validate that all formation IDs exist
    if (formations.size() != formationIds.size()) {
        throw new RuntimeException("Certaines formations n'existent pas");
    }

    // Add the participant to each formation and vice versa
    for (Formation formation : formations) {
        if (!formation.getParticipants().contains(participant)) {
            formation.getParticipants().add(participant); // Add participant to formation
        }
        if (!participant.getFormations().contains(formation)) {
            participant.getFormations().add(formation); // Add formation to participant
        }
    }

    // Save the updated formations
    formationRepository.saveAll(formations);

    // Save and return the updated participant
    return participantRepository.save(participant);
}

    public Participant desinscrireFormations(Long participantId, List<Integer> formationIds) {
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant introuvable"));
    
        List<Formation> formations = formationRepository.findAllById(formationIds);
        participant.getFormations().removeAll(formations);
        return participantRepository.save(participant);
    }


}
