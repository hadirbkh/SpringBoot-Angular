package com.app_gestion_formation.application_gestion_formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app_gestion_formation.application_gestion_formation.models.Formateur;

public interface FormateurRepo extends JpaRepository<Formateur, Integer> {
    boolean existsByEmail(String libelle);
}
