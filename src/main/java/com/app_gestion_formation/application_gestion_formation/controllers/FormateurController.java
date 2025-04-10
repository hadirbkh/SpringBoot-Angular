package com.app_gestion_formation.application_gestion_formation.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.app_gestion_formation.application_gestion_formation.models.Formateur;
import com.app_gestion_formation.application_gestion_formation.repositories.EmployeurRepo;
import com.app_gestion_formation.application_gestion_formation.repositories.FormateurRepo;
import com.app_gestion_formation.application_gestion_formation.models.Employeur;


@RestController
@RequestMapping("/formateur")
public class FormateurController {
    
    private final FormateurRepo formateurRepository;
    private final EmployeurRepo employeurRepository;

    @Autowired
    public FormateurController(FormateurRepo formateurRepository, EmployeurRepo employeurRepository) {
        this.formateurRepository = formateurRepository;
        this.employeurRepository = employeurRepository;
    }

    @PostMapping
    @PreAuthorize("hasRole('UTILISATEUR') ")

    public ResponseEntity<Formateur> addFormateur(@RequestBody Formateur formateur) {
        if (formateur.getEmployeur() != null) {
            Optional<Employeur> employeur = employeurRepository.findById(formateur.getEmployeur().getId());
            employeur.ifPresent(formateur::setEmployeur);
        }
        Formateur savedFormateur = formateurRepository.save(formateur);
        return ResponseEntity.ok(savedFormateur);
    }

    @GetMapping
    @PreAuthorize("hasRole('UTILISATEUR') ")

    public List<Formateur> getFormateurs() {
        return formateurRepository.findAll();
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('UTILISATEUR') ")

    public ResponseEntity<Formateur> updateFormateur(@PathVariable Integer id, @RequestBody Formateur updatedFormateur) {
        return formateurRepository.findById(id)
                .map(formateur -> {
                    if (updatedFormateur.getNom() != null) {
                        formateur.setNom(updatedFormateur.getNom());
                    }
                    if (updatedFormateur.getPrenom() != null) {
                        formateur.setPrenom(updatedFormateur.getPrenom());
                    }
                    if (updatedFormateur.getEmail() != null) {
                        formateur.setEmail(updatedFormateur.getEmail());
                    }
                    if (updatedFormateur.getTel() != 0) {
                        formateur.setTel(updatedFormateur.getTel());
                    }
                    if (updatedFormateur.getType() != null) {
                        formateur.setType(updatedFormateur.getType());
                    }
                    if (updatedFormateur.getEmployeur() != null) {
                        Employeur employeur = employeurRepository.findById(updatedFormateur.getEmployeur().getId())
                                .orElseThrow(() -> new RuntimeException("Employeur not found"));
                        formateur.setEmployeur(employeur);
                    }
                    Formateur savedFormateur = formateurRepository.save(formateur);
                    return ResponseEntity.ok(savedFormateur);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('UTILISATEUR') ")

    public ResponseEntity<String> deleteFormateur(@PathVariable Integer id) {
        return formateurRepository.findById(id)
                .map(formateur -> {
                    formateurRepository.delete(formateur);
                    return ResponseEntity.ok("Formateur record deleted successfully!");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
