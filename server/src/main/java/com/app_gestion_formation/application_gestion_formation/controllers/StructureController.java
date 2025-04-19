package com.app_gestion_formation.application_gestion_formation.controllers;

import com.app_gestion_formation.application_gestion_formation.models.Structure;
import com.app_gestion_formation.application_gestion_formation.services.StructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/structures")
public class StructureController {

    @Autowired
    private StructureService structureService;

    @PostMapping
    public Structure createStructure(@RequestBody Structure structure) {
        return structureService.saveStructure(structure);
    }

    @PutMapping("/{id}")
    public Structure updateStructure(@PathVariable int id, @RequestBody Structure structure) {
        return structureService.updateStructure(id, structure);
    }

    @DeleteMapping("/{id}")
    public void deleteStructure(@PathVariable int id) {
        structureService.deleteStructure(id);
    }

    @GetMapping("/{id}")
    public Structure getStructureById(@PathVariable int id) {
        return structureService.getStructureById(id);
    }

    @GetMapping
    public List<Structure> getAllStructures() {
        return structureService.getAllStructures();
    }
}
