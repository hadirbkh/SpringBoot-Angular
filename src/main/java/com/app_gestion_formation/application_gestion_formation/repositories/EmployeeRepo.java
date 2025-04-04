package com.app_gestion_formation.application_gestion_formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app_gestion_formation.application_gestion_formation.models.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
    // No need to implement basic CRUD methods - they come automatically
}
