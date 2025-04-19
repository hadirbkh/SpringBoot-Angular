package com.app_gestion_formation.application_gestion_formation.models;

import com.app_gestion_formation.application_gestion_formation.models.Role.RoleName;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "domaine") 
public class Domaine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // we want the id to be auto generate to use@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(nullable = false)
    private String libelle; 


    public Integer getId() {
        return id;
    }


    public void setId(Integer id) {
        this.id = id;
    }


    public String getLibelle() {
        return libelle;
    }


    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }


    public Domaine(Integer id, String libelle) {
        this.id = id;
        this.libelle = libelle;
    }


    public Domaine() {
    }

    
}
