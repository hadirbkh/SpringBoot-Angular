package com.app_gestion_formation.application_gestion_formation.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app_gestion_formation.application_gestion_formation.repositories.UtilisateurRepo;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

    final UtilisateurRepo repository;

    public UserDetailsServiceImp(UtilisateurRepo repository){
        this.repository=repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return repository.findByLogin(username)
        .orElseThrow(()->new UsernameNotFoundException("L'utilisateur n'est pas trouvé"));
    }
    
}
