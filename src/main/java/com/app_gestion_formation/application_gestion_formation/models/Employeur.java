package com.app_gestion_formation.application_gestion_formation.models;

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
}
