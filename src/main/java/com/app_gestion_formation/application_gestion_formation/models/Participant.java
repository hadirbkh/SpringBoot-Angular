package com.app_gestion_formation.application_gestion_formation.models;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "participant")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String prenom;

    @ManyToOne
    @JoinColumn(name = "idStructure", nullable = false)
    private Structure structure;

    @ManyToOne
    @JoinColumn(name = "idProfil", nullable = false)
    private Profil profil;

    private String email;
    private int tel;
}
