package com.app_gestion_formation.application_gestion_formation.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "role") 
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // we want the id to be auto generate to use@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleName name; // Use an enum for roles

    public enum RoleName {
        ADMIN, RESPONSABLE, UTILISATEUR
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public RoleName getName() {
        return name;
    }
    public void setName(RoleName name) {
        this.name = name;
    }
    public Role() {
    }
    public Role(Integer id, RoleName name) {
        this.id = id;
        this.name = name;
    }

    


}
