package com.app_gestion_formation.application_gestion_formation.services;

import java.util.List;

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
	public MessageResponse addParticipant(Participant participant) {
		boolean existe = participantRepository.existsByEmail(participant.getEmail());
        if (existe){
        	return new MessageResponse(false,"Echec !","Cet organisme existe déja !");   
        } else {
        	participantRepository.save(participant);
        return new MessageResponse(true,"Succès","Opération réalisée avec succès.");
        }
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

     public Participant inscrireParticipantAuxFormations(Long participantId, List<Long> formationIds) {
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant introuvable"));

        List<Formation> formations = formationRepository.findAllById(formationIds);

        participant.getFormations().addAll(formations);

        return participantRepository.save(participant);
    }
    public Participant desinscrireFormations(Long participantId, List<Long> formationIds) 
    {
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant introuvable"));
    
        List<Formation> formations = formationRepository.findAllById(formationIds);
        participant.getFormations().removeAll(formations);
    
        return participantRepository.save(participant);
    }


}
