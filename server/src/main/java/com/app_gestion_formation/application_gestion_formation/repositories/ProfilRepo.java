package com.app_gestion_formation.application_gestion_formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app_gestion_formation.application_gestion_formation.models.Profil;

@Repository
public interface ProfilRepo extends JpaRepository<Profil, Integer> {
    boolean existsByLibelle(String libelle);
} 