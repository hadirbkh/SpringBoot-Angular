package com.app_gestion_formation.application_gestion_formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app_gestion_formation.application_gestion_formation.models.Role;

public interface RoleRepo extends JpaRepository<Role, Integer>{
    
}
