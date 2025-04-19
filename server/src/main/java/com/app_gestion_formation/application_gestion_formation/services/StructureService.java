package com.app_gestion_formation.application_gestion_formation.services;

import com.app_gestion_formation.application_gestion_formation.models.Structure;
import com.app_gestion_formation.application_gestion_formation.repositories.StructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StructureService {

    @Autowired
    private StructureRepository structureRepository;


    public Structure saveStructure(Structure structure) {
        return structureRepository.save(structure);
    }


    public Structure updateStructure(int id, Structure structure) {
        Structure existingStructure = structureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Structure not found with id: " + id));
        existingStructure.setLibelle(structure.getLibelle());
        return structureRepository.save(existingStructure);
    }


    public void deleteStructure(int id) {
        structureRepository.deleteById(id);
    }


    public Structure getStructureById(int id) {
        return structureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Structure not found with id: " + id));
    }


    public List<Structure> getAllStructures() {
        return structureRepository.findAll();
    }
}
