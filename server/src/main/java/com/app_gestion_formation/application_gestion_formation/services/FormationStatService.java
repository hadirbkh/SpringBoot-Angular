package com.app_gestion_formation.application_gestion_formation.services;

import com.app_gestion_formation.application_gestion_formation.models.Formation;
import com.app_gestion_formation.application_gestion_formation.repositories.DomaineRepository;
import com.app_gestion_formation.application_gestion_formation.repositories.FormationRepository;
import com.app_gestion_formation.application_gestion_formation.repositories.StructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.IntSummaryStatistics;

@Service
@Transactional(readOnly = true)
public class FormationStatService {

    private final FormationRepository formationRepository;
    private final DomaineRepository domaineRepository;
    private final StructureRepository structureRepository;

    @Autowired
    public FormationStatService(FormationRepository formationRepository,
                              DomaineRepository domaineRepository,
                              StructureRepository structureRepository) {
        this.formationRepository = formationRepository;
        this.domaineRepository = domaineRepository;
        this.structureRepository = structureRepository;
    }

    /**
     * Retrieves the number of formations per domain
     * @return Map containing domain names as keys and formation counts as values
     * @throws RuntimeException if there's an error accessing the database
     */
    @Cacheable("statsByDomaine")
    public Map<String, Long> getStatsByDomaine() {
        try {
            return formationRepository.findAll().stream()
                    .filter(f -> f.getDomaine() != null)
                    .collect(Collectors.groupingBy(
                            f -> f.getDomaine().getLibelle(),
                            Collectors.counting()
                    ));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving formation statistics by domain", e);
        }
    }

    /**
     * Calculates participation rate for each formation
     * @return List of maps containing formation details and participation rates
     * @throws RuntimeException if there's an error accessing the database
     */
    @Cacheable("tauxParticipation")
    public List<Map<String, Object>> getTauxParticipation() {
        try {
            return formationRepository.findAll().stream()
                    .filter(f -> f.getCapaciteMax() > 0)
                    .map(f -> {
                        Map<String, Object> map = new HashMap<>();
                        map.put("formationId", f.getId());
                        map.put("titre", f.getTitre());
                        int inscrits = f.getParticipants() != null ? f.getParticipants().size() : 0;
                        map.put("inscrits", inscrits);
                        map.put("capacite", f.getCapaciteMax());
                        double taux = ((double) inscrits / f.getCapaciteMax()) * 100;
                        map.put("tauxParticipation", Math.round(taux * 100.0) / 100.0);
                        return map;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error calculating participation rates", e);
        }
    }

    /**
     * Retrieves the number of participants per structure
     * @return Map containing structure names as keys and participant counts as values
     * @throws RuntimeException if there's an error accessing the database
     */
    @Cacheable("dashboardParStructure")
    public Map<String, Long> getDashboardParStructure() {
        try {
            return formationRepository.findAll().stream()
                    .flatMap(f -> f.getParticipants().stream()
                            .filter(p -> p.getStructure() != null)
                            .map(p -> p.getStructure().getLibelle()))
                    .collect(Collectors.groupingBy(
                            s -> s,
                            Collectors.counting()
                    ));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving structure dashboard statistics", e);
        }
    }

    /**
     * Calculates the average participation rate across all formations
     * @return Average participation rate as a percentage
     */
    @Cacheable("averageParticipationRate")
    public double getAverageParticipationRate() {
        try {
            return formationRepository.findAll().stream()
                    .filter(f -> f.getCapaciteMax() > 0)
                    .mapToDouble(f -> {
                        int inscrits = f.getParticipants() != null ? f.getParticipants().size() : 0;
                        return ((double) inscrits / f.getCapaciteMax()) * 100;
                    })
                    .average()
                    .orElse(0.0);
        } catch (Exception e) {
            throw new RuntimeException("Error calculating average participation rate", e);
        }
    }

    /**
     * Retrieves formations that are close to capacity
     * @param threshold The minimum participation rate to consider (0-100)
     * @return List of formations with participation rates above the threshold
     */
    public List<Formation> getFormationsNearCapacity(double threshold) {
        if (threshold < 0 || threshold > 100) {
            throw new IllegalArgumentException("Threshold must be between 0 and 100");
        }
        try {
            return formationRepository.findAll().stream()
                    .filter(f -> {
                        int inscrits = f.getParticipants() != null ? f.getParticipants().size() : 0;
                        double taux = f.getCapaciteMax() == 0 ? 0 : ((double) inscrits / f.getCapaciteMax()) * 100;
                        return taux >= threshold;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving formations near capacity", e);
        }
    }

    /**
     * Retrieves statistics about formation durations
     * @return Map containing duration statistics
     */
    @Cacheable("durationStats")
    public Map<String, Object> getDurationStatistics() {
        try {
            List<Formation> formations = formationRepository.findAll();
            IntSummaryStatistics stats = formations.stream()
                    .mapToInt(Formation::getDuree)
                    .summaryStatistics();

            Map<String, Object> result = new HashMap<>();
            result.put("averageDuration", stats.getAverage());
            result.put("minDuration", stats.getMin());
            result.put("maxDuration", stats.getMax());
            result.put("totalFormations", stats.getCount());
            return result;
        } catch (Exception e) {
            throw new RuntimeException("Error calculating duration statistics", e);
        }
    }
}
