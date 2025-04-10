package com.app_gestion_formation.application_gestion_formation.services;

import com.app_gestion_formation.application_gestion_formation.models.*;
import com.app_gestion_formation.application_gestion_formation.repositories.DomaineRepository;
import com.app_gestion_formation.application_gestion_formation.repositories.FormationRepository;
import com.app_gestion_formation.application_gestion_formation.repositories.StructureRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FormationStatService {

    private final FormationRepository formationRepository;
    private final DomaineRepository domaineRepository;
    private final StructureRepository structureRepository;

    public FormationStatService(FormationRepository formationRepository,
                                DomaineRepository domaineRepository,
                                StructureRepository structureRepository) {
        this.formationRepository = formationRepository;
        this.domaineRepository = domaineRepository;
        this.structureRepository = structureRepository;
    }

    public Formation createFormationWithLinks(String titre, int domaineId, int annee, int duree, double budget) {
        Optional<Domaine> domaine = domaineRepository.findById(domaineId);

        if (domaine.isEmpty()) {
            throw new RuntimeException("Domaine introuvable !");
        }

        Formation formation = Formation.builder()
                .titre(titre)
                .annee(annee)
                .duree(duree)
                .budget(budget)
                .domaine(domaine.get())
                .participants(new ArrayList<>())
                .build();

        return formationRepository.save(formation);
    }

    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }

    public void deleteFormation(int id) {
        formationRepository.deleteById(id);
    }

    public Map<String, Long> getStatsByDomaine() {
        List<Formation> formations = formationRepository.findAll();
        return formations.stream()
                .collect(Collectors.groupingBy(f -> f.getDomaine().getLibelle(), Collectors.counting()));
    }

    public List<Map<String, Object>> getTauxParticipation() {
        return formationRepository.findAll().stream().map(f -> {
            Map<String, Object> map = new HashMap<>();
            map.put("formationId", f.getId());
            map.put("titre", f.getTitre());
            int inscrits = f.getParticipants() != null ? f.getParticipants().size() : 0;
            map.put("inscrits", inscrits);

            map.put("capacite", f.getCapaciteMax());
            double taux = f.getCapaciteMax()== 0 ? 0 : ((double) inscrits / f.getCapaciteMax()) * 100;
            map.put("tauxParticipation", taux);
            return map;
        }).collect(Collectors.toList());
    }

    public Map<String, Long> getDashboardParStructure() {
        List<Formation> formations = formationRepository.findAll();
        return formations.stream()
                .flatMap(f -> f.getParticipants().stream()
                        .map(p -> p.getStructure().getLibelle()))
                .collect(Collectors.groupingBy(s -> s, Collectors.counting()));
    }
}
