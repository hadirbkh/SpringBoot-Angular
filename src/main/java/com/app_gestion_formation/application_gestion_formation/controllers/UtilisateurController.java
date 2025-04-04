package com.app_gestion_formation.application_gestion_formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.app_gestion_formation.application_gestion_formation.models.Role;
import com.app_gestion_formation.application_gestion_formation.models.Utilisateur;
import com.app_gestion_formation.application_gestion_formation.repositories.RoleRepo;
import com.app_gestion_formation.application_gestion_formation.repositories.UtilisateurRepo;

@RestController
@RequestMapping("/utilisateur")
public class UtilisateurController {
    
    private final UtilisateurRepo utilisateurRepo;
    private final RoleRepo roleRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UtilisateurController(UtilisateurRepo utilisateurRepo, RoleRepo roleRepo, BCryptPasswordEncoder passwordEncoder) {
        this.utilisateurRepo = utilisateurRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity<Utilisateur> addUtilisateur(@RequestBody Utilisateur utilisateur) {
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword())); // Hash password
        Utilisateur savedUtilisateur = utilisateurRepo.save(utilisateur);
        return ResponseEntity.ok(savedUtilisateur);
    }

    @GetMapping
    public List<Utilisateur> getUtilisateurs() {
        return utilisateurRepo.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(
            @PathVariable Integer id,
            @RequestBody Utilisateur updated) {

        return utilisateurRepo.findById(id)
                .map(utilisateur -> {
                    if (updated.getLogin() != null) {
                        utilisateur.setLogin(updated.getLogin());
                    }
                    if (updated.getPassword() != null) {
                        utilisateur.setPassword(passwordEncoder.encode(updated.getPassword()));
                    }
                    if (updated.getRole() != null ) {
                        Role role = roleRepo.findById(updated.getRole().getId())
                                .orElseThrow(() -> new RuntimeException("Role not found"));
                        utilisateur.setRole(role);
                    }
                    Utilisateur savedUtilisateur = utilisateurRepo.save(utilisateur);
                    return ResponseEntity.ok(savedUtilisateur);
                })
                .orElse(ResponseEntity.notFound().build());
    }
        //deleeeeeete 
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteUtilisateur(@PathVariable Integer id) {  // Changed to Long
            return utilisateurRepo.findById(id)
                    .map(utilisateur -> {
                        utilisateurRepo.delete(utilisateur);
                        return ResponseEntity.ok("Utilisateur record deleted successfully!");
                    })
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }

}

