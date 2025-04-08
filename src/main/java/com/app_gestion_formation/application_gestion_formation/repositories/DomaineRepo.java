package com.app_gestion_formation.application_gestion_formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app_gestion_formation.application_gestion_formation.models.Domaine;
public interface DomaineRepo extends JpaRepository<Domaine, Integer>{
    
}
