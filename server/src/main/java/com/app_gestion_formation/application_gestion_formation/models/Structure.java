package com.app_gestion_formation.application_gestion_formation.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "structure")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Structure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String libelle;
}

