package com.app_gestion_formation.application_gestion_formation.models;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private Long id;

    private String nom;
    private String prenom;

    @ManyToOne
    @JoinColumn(name = "idStructure", nullable = false)
    private Structure structure;

    @ManyToOne
    @JoinColumn(name = "idProfil", nullable = true)
    private Profil profil;
    private String email;
    private int tel;

    @ManyToMany
    @JoinTable(
        name = "participant_formation",
        joinColumns = @JoinColumn(name = "participant_id"),
        inverseJoinColumns = @JoinColumn(name = "formation_id")
    )
    @JsonIgnore
    private List<Formation> formations = new ArrayList<>();

    public Participant orElse(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElse'");
    }

}
