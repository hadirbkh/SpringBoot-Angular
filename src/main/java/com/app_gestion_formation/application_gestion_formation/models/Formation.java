package com.app_gestion_formation.application_gestion_formation.models;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "formation") 
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // we want the id to be auto generate to use@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String titre;

    @Column(nullable = false)
    private Integer annee;

    @Column(nullable = false)
    private Integer duree;

    @Column(nullable = false)
    private Double budget;

    @ManyToOne
    @JoinColumn(name = "id_domaine", referencedColumnName = "id")
    private Domaine domaine; 

    @ManyToMany
    @JoinTable(
            name = "formation_participant",
            joinColumns = @JoinColumn(name = "formation_id"),
            inverseJoinColumns = @JoinColumn(name = "participant_id")
    )
    private List<Participant> participants;
    
    private int capaciteMax;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Integer getAnnee() {
        return annee;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Domaine getDomaine() {
        return domaine;
    }
    public void setDomaine(Domaine domaine) {
        this.domaine = domaine;
    }

    public Formation() {
    }

    public Formation(Integer id, String titre, Integer annee, Integer duree, Double budget, Domaine domaine) {
        this.id = id;
        this.titre = titre;
        this.annee = annee;
        this.duree = duree;
        this.budget = budget;
        this.domaine = domaine;
    }

    
    public Formation(Integer id, String titre, Integer annee, Integer duree, Double budget, Domaine domaine,
            List<Participant> participants, int capaciteMax) {
        this.id = id;
        this.titre = titre;
        this.annee = annee;
        this.duree = duree;
        this.budget = budget;
        this.domaine = domaine;
        this.participants = participants;
        this.capaciteMax = capaciteMax;
    }

    public List<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Participant> participants) {
        this.participants = participants;
    }

    public int getCapaciteMax() {
        return capaciteMax;
    }

    public void setCapaciteMax(int capaciteMax) {
        this.capaciteMax = capaciteMax;
    }

    


    
}
