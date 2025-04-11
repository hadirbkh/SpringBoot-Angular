package com.app_gestion_formation.application_gestion_formation.services;

import com.app_gestion_formation.application_gestion_formation.models.Domaine;
import com.app_gestion_formation.application_gestion_formation.repositories.DomaineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DomaineService {
    private final DomaineRepository repository;

    public DomaineService(DomaineRepository repository) {
        this.repository = repository;
    }

    public List<Domaine> getAllDomaines() {
        return repository.findAll();
    }


    public Domaine saveDomaine(Domaine d) {
        return repository.save(d);
    }
}
