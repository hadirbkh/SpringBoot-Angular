package com.app_gestion_formation.application_gestion_formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app_gestion_formation.application_gestion_formation.models.Employeur;

public interface EmployeurRepo extends JpaRepository<Employeur, Integer> {
    // No need to implement basic CRUD methods - they come automatically
}
