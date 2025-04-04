package com.app_gestion_formation.application_gestion_formation.repositories;

import com.app_gestion_formation.application_gestion_formation.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UtilisateurRepo extends JpaRepository<Utilisateur, Integer> {
    Optional<Utilisateur> findByLogin(String login); // Add this method
}