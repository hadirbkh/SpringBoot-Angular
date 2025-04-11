package com.app_gestion_formation.application_gestion_formation.services;

import com.app_gestion_formation.application_gestion_formation.models.Structure;
import com.app_gestion_formation.application_gestion_formation.repositories.StructureRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StructureService {
    private final StructureRepository repository;

    public StructureService(StructureRepository repository) {
        this.repository = repository;
    }

    public List<Structure> getAllStructures() {
        return repository.findAll();
    }

    public Structure saveStructure(Structure s) {
        return repository.save(s);
    }
}
