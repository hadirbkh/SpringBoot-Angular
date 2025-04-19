package com.app_gestion_formation.application_gestion_formation.services;

import com.app_gestion_formation.application_gestion_formation.models.Employeur;
import com.app_gestion_formation.application_gestion_formation.repositories.EmployeurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeurService {

    @Autowired
    private EmployeurRepo employeurRepo;

    public Employeur createEmployeur(Employeur employeur) {
        return employeurRepo.save(employeur);
    }

    public List<Employeur> getAllEmployeurs() {
        return employeurRepo.findAll();
    }

    public Employeur getEmployeurById(int id) {
        return employeurRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employeur not found with id: " + id));
    }

    public Employeur updateEmployeur(int id, Employeur employeur) {
        Optional<Employeur> existingEmployeur = employeurRepo.findById(id);
        if (existingEmployeur.isPresent()) {
            Employeur updatedEmployeur = existingEmployeur.get();
            updatedEmployeur.setNomemployeur(employeur.getNomemployeur());
            return employeurRepo.save(updatedEmployeur);
        } else {
            throw new RuntimeException("Employeur not found with id: " + id);
        }
    }

    public void deleteEmployeur(int id) {
        Optional<Employeur> employeur = employeurRepo.findById(id);
        if (employeur.isPresent()) {
            employeurRepo.delete(employeur.get());
        } else {
            throw new RuntimeException("Employeur not found with id: " + id);
        }
    }
} 