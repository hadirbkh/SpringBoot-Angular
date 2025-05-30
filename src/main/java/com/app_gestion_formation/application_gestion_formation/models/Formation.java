package com.app_gestion_formation.application_gestion_formation.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "formation")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titre;
    private int annee;

    // Durée en nombre de jours
    private int duree;

    @ManyToOne
    @JoinColumn(name = "idDomaine", nullable = false)
    private Domaine domaine;

    private double budget;

    @ManyToMany(mappedBy = "formations")
    @JsonIgnore

    private List<Participant> participants;
}

