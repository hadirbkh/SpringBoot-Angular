package com.app_gestion_formation.application_gestion_formation.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.app_gestion_formation.application_gestion_formation.models.Profil;
import com.app_gestion_formation.application_gestion_formation.response.MessageResponse;
import com.app_gestion_formation.application_gestion_formation.services.ProfilService;

@RestController
@RequestMapping("/api/profils")
@CrossOrigin("*")
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    @GetMapping
    public List<Profil> getAllProfils() {
        return profilService.getAllProfils();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profil> getProfilById(@PathVariable int id) {
        Optional<Profil> profil = profilService.getProfilById(id);
        return profil.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('UTILISATEUR')")
    public MessageResponse addProfil(@RequestBody Profil profil) {
        return profilService.addProfil(profil);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<Profil> updateProfil(@PathVariable int id, @RequestBody Profil updatedProfil) {
        try {
            Profil profil = profilService.updateProfil(id, updatedProfil);
            return ResponseEntity.ok(profil);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('UTILISATEUR')")
    public ResponseEntity<String> deleteProfil(@PathVariable int id) {
        try {
            profilService.deleteProfil(id);
            return ResponseEntity.ok("Profil supprimé avec succès");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 