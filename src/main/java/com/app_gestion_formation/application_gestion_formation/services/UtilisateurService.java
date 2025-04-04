package com.app_gestion_formation.application_gestion_formation.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.app_gestion_formation.application_gestion_formation.models.Utilisateur;
import com.app_gestion_formation.application_gestion_formation.repositories.UtilisateurRepo;

import org.springframework.security.core.userdetails.User; // Correct import

@Service
public class UtilisateurService implements UserDetailsService {

    @Autowired
    private UtilisateurRepo repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Utilisateur> user = repository.findByLogin(username); // Changed to findByLogin
        if(user.isPresent()){
            var userObj = user.get();
            return User.withUsername(userObj.getLogin())
                    .password(userObj.getPassword())
                    .roles(userObj.getRole().getName().name())
                    .build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }
}