package com.app_gestion_formation.application_gestion_formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app_gestion_formation.application_gestion_formation.models.Participant;

public interface ParticipantRepo extends JpaRepository<Participant, Long>  {
    public  Participant  findById(long id);
	boolean existsByEmail(String email);
}
