package com.app_gestion_formation.application_gestion_formation.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app_gestion_formation.application_gestion_formation.models.Formation;
public interface FormationRepo extends JpaRepository<Formation, Integer>{
    
}
