package com.app_gestion_formation.application_gestion_formation.repositories;

import com.app_gestion_formation.application_gestion_formation.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UtilisateurRepo extends JpaRepository<Utilisateur, Integer> {
    @Query("SELECT u FROM Utilisateur u JOIN FETCH u.role WHERE u.login = :login")
    Optional<Utilisateur> findByLogin(@Param("login") String login);
}