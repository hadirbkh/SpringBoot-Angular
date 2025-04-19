package com.app_gestion_formation.application_gestion_formation.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app_gestion_formation.application_gestion_formation.models.Profil;
import com.app_gestion_formation.application_gestion_formation.repositories.ProfilRepo;
import com.app_gestion_formation.application_gestion_formation.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service
public class ProfilService {

    @Autowired
    private ProfilRepo profilRepo;

    public List<Profil> getAllProfils() {
        return profilRepo.findAll();
    }

    public Optional<Profil> getProfilById(int id) {
        return profilRepo.findById(id);
    }

    @Transactional
    public MessageResponse addProfil(Profil profil) {
        boolean existe = profilRepo.existsByLibelle(profil.getLibelle());
        if (existe) {
            return new MessageResponse(false, "Echec !", "Ce profil existe déjà !");
        } else {
            profilRepo.save(profil);
            return new MessageResponse(true, "Succès", "Opération réalisée avec succès.");
        }
    }

    public Profil updateProfil(int id, Profil updatedProfil) {
        return profilRepo.findById(id)
                .map(profil -> {
                    profil.setLibelle(updatedProfil.getLibelle());
                    return profilRepo.save(profil);
                })
                .orElseThrow(() -> new RuntimeException("Profil not found"));
    }

    public void deleteProfil(int id) {
        profilRepo.findById(id)
                .ifPresent(profil -> profilRepo.delete(profil));
    }
} 