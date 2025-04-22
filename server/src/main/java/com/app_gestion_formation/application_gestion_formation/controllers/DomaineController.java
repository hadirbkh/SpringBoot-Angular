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

import com.app_gestion_formation.application_gestion_formation.models.Domaine;
import com.app_gestion_formation.application_gestion_formation.repositories.DomaineRepo;

@RestController
@RequestMapping("/api/domaine")
public class DomaineController{

    private final DomaineRepo domaineRepo;

    @Autowired
    public DomaineController(DomaineRepo domaineRepo) {
        this.domaineRepo = domaineRepo;
    }

    @PostMapping
    public Domaine addDomaine(@RequestBody Domaine domaine) {
        return domaineRepo.save(domaine);
    }

    @GetMapping
    public List<Domaine> getAllDomaines() {
        return domaineRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Domaine> getDomaineById(@PathVariable Integer id) {
        return domaineRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Domaine> updateDomaine(
            @PathVariable Integer id,
            @RequestBody Domaine updated) {
        
        return domaineRepo.findById(id)
                .map(domaine -> {
                    domaine.setLibelle(updated.getLibelle());
                    return ResponseEntity.ok(domaineRepo.save(domaine));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Domaine> partialUpdateDomaine(
            @PathVariable Integer id,
            @RequestBody Domaine updated) {
        return domaineRepo.findById(id)
                .map(domaine -> {
                    if (updated.getLibelle() != null) {
                        domaine.setLibelle(updated.getLibelle());
                    }
                    return ResponseEntity.ok(domaineRepo.save(domaine));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDomaine(@PathVariable Integer id) {
        return domaineRepo.findById(id)
                .map(domaine -> {
                    domaineRepo.delete(domaine);
                    return ResponseEntity.ok("Domaine deleted successfully!");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}