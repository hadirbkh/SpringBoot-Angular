package com.app_gestion_formation.application_gestion_formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app_gestion_formation.application_gestion_formation.models.Employeur;
import com.app_gestion_formation.application_gestion_formation.services.EmployeurService;

@RestController
@RequestMapping("/emp")
public class EmployeurController {
    
    private final EmployeurService employeurService;

    @Autowired
    public EmployeurController(EmployeurService employeurService) {
        this.employeurService = employeurService;
    }

    @PostMapping
    public ResponseEntity<Employeur> addEmployee(@RequestBody Employeur employeur) {
        Employeur savedEmployeur = employeurService.createEmployeur(employeur);
        return ResponseEntity.ok(savedEmployeur);
    }

    @GetMapping
    public ResponseEntity<List<Employeur>> getEmployee() {
        List<Employeur> employeurs = employeurService.getAllEmployeurs();
        return ResponseEntity.ok(employeurs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employeur> getEmployeeById(@PathVariable Integer id) {
        Employeur employeur = employeurService.getEmployeurById(id);
        return ResponseEntity.ok(employeur);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employeur> updateEmployee(
            @PathVariable Integer id,
            @RequestBody Employeur updated) {
        Employeur employeur = employeurService.updateEmployeur(id, updated);
        return ResponseEntity.ok(employeur);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Integer id) {
        employeurService.deleteEmployeur(id);
        return ResponseEntity.ok("Employee record deleted successfully!");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Employeur> patchEmployee(
            @PathVariable Integer id,
            @RequestBody Employeur updated) {
        Employeur employeur = employeurService.updateEmployeur(id, updated);
        return ResponseEntity.ok(employeur);
    }
}
