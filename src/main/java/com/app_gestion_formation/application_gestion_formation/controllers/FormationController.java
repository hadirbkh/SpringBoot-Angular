package com.app_gestion_formation.application_gestion_formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app_gestion_formation.application_gestion_formation.models.Formation;
import com.app_gestion_formation.application_gestion_formation.repositories.DomaineRepo;
import com.app_gestion_formation.application_gestion_formation.repositories.FormationRepo;

@RestController
@RequestMapping("/api/formation")
public class FormationController {

    private final FormationRepo formationRepo;
    private final DomaineRepo domaineRepo;

    @Autowired
    public FormationController(FormationRepo formationRepo, DomaineRepo domaineRepo) {
        this.formationRepo = formationRepo;
        this.domaineRepo = domaineRepo;
    }

    @PostMapping
    public Formation addFormation(@RequestBody Formation formation) {
        return formationRepo.save(formation);
    }

    @GetMapping
    public List<Formation> getAllFormations() {
        return formationRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable Integer id) {
        return formationRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
public ResponseEntity<Formation> updateFormation(
        @PathVariable Integer id,
        @RequestBody Formation updated) {
    
    return formationRepo.findById(id)
            .map(formation -> {
                formation.setTitre(updated.getTitre());
                formation.setAnnee(updated.getAnnee());
                formation.setDuree(updated.getDuree());
                formation.setBudget(updated.getBudget());
                
                // Handle domaine update
                if (updated.getDomaine() != null) {
                    formation.setDomaine(updated.getDomaine());
                }
                
                return ResponseEntity.ok(formationRepo.save(formation));
            })
            .orElse(ResponseEntity.notFound().build());
}

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFormation(@PathVariable Integer id) {
        return formationRepo.findById(id)
                .map(formation -> {
                    formationRepo.delete(formation);
                    return ResponseEntity.ok("Formation deleted successfully!");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}