package com.app_gestion_formation.application_gestion_formation.repositories;

import com.app_gestion_formation.application_gestion_formation.models.Formation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationRepository extends JpaRepository<Formation, Integer> {}
