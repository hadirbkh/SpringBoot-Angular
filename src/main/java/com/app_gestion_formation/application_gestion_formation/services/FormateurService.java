package com.app_gestion_formation.application_gestion_formation.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app_gestion_formation.application_gestion_formation.models.Formateur;
import com.app_gestion_formation.application_gestion_formation.repositories.FormateurRepo;
import com.app_gestion_formation.application_gestion_formation.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service
public class FormateurService {

    @Autowired
    private FormateurRepo formateurRepo;

    // Récupérer un formateur par son ID
    public Optional<Formateur> getFormateurById(int id) {
        return formateurRepo.findById(id);
    }

    public List<Formateur> findAll() {

        return formateurRepo.findAll();
    }

    // Ajouter un formateur
    @Transactional
	public MessageResponse addFormateur(Formateur formateur) {
		boolean existe = formateurRepo.existsByEmail(formateur.getEmail());
        if (existe){
        	return new MessageResponse(false,"Echec !","Ce formateur existe déja !");   
        } else {
        formateurRepo.save(formateur);
        return new MessageResponse(true,"Succès","Opération réalisée avec succès.");
        }
    }

    // Mettre à jour un formateur
    public Formateur updateFormateur(int id, Formateur updatedFormateur) {
        return formateurRepo.findById(id)
                .map(formateur -> {
                    formateur.setNom(updatedFormateur.getNom());
                    formateur.setPrenom(updatedFormateur.getPrenom());
                    formateur.setEmail(updatedFormateur.getEmail());
                    formateur.setTel(updatedFormateur.getTel());
                    formateur.setType(updatedFormateur.getType());
                    formateur.setEmployeur(updatedFormateur.getEmployeur());
                    return formateurRepo.save(formateur);
                })
                .orElseThrow(() -> new RuntimeException("Formateur not found"));
    }

    // Supprimer un formateur
    public void deleteFormateur(int id) {
        formateurRepo.findById(id)
                .ifPresent(formateur -> formateurRepo.delete(formateur));
    }
}
