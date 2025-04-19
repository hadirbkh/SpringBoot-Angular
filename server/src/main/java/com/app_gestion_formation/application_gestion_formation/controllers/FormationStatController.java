package com.app_gestion_formation.application_gestion_formation.controllers;

import com.app_gestion_formation.application_gestion_formation.services.FormationStatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stats")
public class FormationStatController {

    private final FormationStatService formationStatService;

    @Autowired
    public FormationStatController(FormationStatService formationStatService) {
        this.formationStatService = formationStatService;
    }


    @GetMapping("/domaines")
    public Map<String, Long> getStatsByDomaine() {
        return formationStatService.getStatsByDomaine();
    }


    @GetMapping("/participation")
    public List<Map<String, Object>> getTauxParticipation() {
        return formationStatService.getTauxParticipation();
    }


    @GetMapping("/structures")
    public Map<String, Long> getDashboardParStructure() {
        return formationStatService.getDashboardParStructure();
    }

    @GetMapping("/average-participation")
    public double getAverageParticipationRate() {
        return formationStatService.getAverageParticipationRate();
    }

    @GetMapping("/near-capacity")
    public List<Map<String, Object>> getFormationsNearCapacity(@RequestParam double threshold) {
        return formationStatService.getFormationsNearCapacity(threshold).stream()
                .map(f -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("titre", f.getTitre());
                    map.put("inscrits", f.getParticipants() != null ? f.getParticipants().size() : 0);
                    map.put("capacite", f.getCapaciteMax());
                    double taux = f.getCapaciteMax() == 0 ? 0 : 
                        ((double) (f.getParticipants() != null ? f.getParticipants().size() : 0) / f.getCapaciteMax()) * 100;
                    map.put("tauxParticipation", Math.round(taux * 100.0) / 100.0);
                    return map;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/duration-stats")
    public Map<String, Object> getDurationStatistics() {
        return formationStatService.getDurationStatistics();
    }
}
