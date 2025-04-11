package com.app_gestion_formation.application_gestion_formation.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "formateur")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Formateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String prenom;
    private String email;
    private int tel;

    // e.g., 1 for "interne" or 2 for "externe" (or other numeric representation)
    private TypeFormateur type;

    @ManyToOne
    @JoinColumn(name = "idEmployeur", nullable = false)
    private Employeur employeur;

    public enum TypeFormateur {
        INTERNE, EXTERNE
    }
}

