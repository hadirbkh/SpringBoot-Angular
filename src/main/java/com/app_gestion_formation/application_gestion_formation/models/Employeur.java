package com.app_gestion_formation.application_gestion_formation.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employeur")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nomemployeur;
    @OneToMany(mappedBy = "employeur")
    @JsonIgnore
    private List<Formateur> formateurs;
}
