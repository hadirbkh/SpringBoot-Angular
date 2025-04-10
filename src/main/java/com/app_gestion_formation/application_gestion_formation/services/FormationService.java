package com.app_gestion_formation.application_gestion_formation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app_gestion_formation.application_gestion_formation.models.Formation;
import com.app_gestion_formation.application_gestion_formation.repositories.FormationRepo;
import com.app_gestion_formation.application_gestion_formation.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service

public class FormationService {
	
	
	@Autowired
	FormationRepo formationRepository;

    @Transactional
	public MessageResponse save(Formation formation) {
		boolean existe = formationRepository.existsById(formation.getId());
        if (existe){
        	return new MessageResponse(false,"Echec !","Cet formation existe déja !");   
        } else {
        	formationRepository.save(formation);
        return new MessageResponse(true,"Succès","Opération réalisée avec succès.");
        }
    }

    public Formation updateFormation(Formation formation) {
        return formationRepository.save(formation);
    }


    @Transactional
    public MessageResponse update(Integer id, Formation formation) {
    	Formation existe = findById(id);
        if (existe == null){
        	return new MessageResponse(false,"Echec !","Cet Formation n'existe pas !");   
        } else {
        //delete(id);
        	formation.setId(id);
        	formationRepository.save(formation);
        return new MessageResponse(true,"Succès","Opération réalisée avec succès.");
        }
    }

    @Transactional

	public MessageResponse delete(long id)  {
    	Formation formation = findById(id);
		if (formation == null){
        	return new MessageResponse(false,"Echec !","Cet formation n'existe pas !");   
        } else {
        	formationRepository.delete(formation);
        return new MessageResponse(true,"Succès","Opération réalisée avec succès.");
        }
    }
    
    
    
    public List<Formation> findAll() {

        return formationRepository.findAll();
    }



	public Formation findById(long id) {
		Formation formation = formationRepository.findById(id).orElse(null);
        return formation;
	}
}