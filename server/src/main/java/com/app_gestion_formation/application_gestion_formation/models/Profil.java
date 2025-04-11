package com.app_gestion_formation.application_gestion_formation.models;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "profil")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Libellé du profil (e.g., "informaticien (bac + 5)", "gestionnaire", etc.)
    private String libelle;
    
    
}

