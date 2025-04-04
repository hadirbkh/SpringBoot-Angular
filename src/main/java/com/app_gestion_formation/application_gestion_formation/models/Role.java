package com.app_gestion_formation.application_gestion_formation.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "role")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private RoleName nom;
    public enum RoleName {
        ADMIN, RESPONSABLE, UTILISATEUR
    }
}





