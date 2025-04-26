package com.app_gestion_formation.application_gestion_formation.services;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app_gestion_formation.application_gestion_formation.models.AuthenticationResponse;
import com.app_gestion_formation.application_gestion_formation.models.Utilisateur;
import com.app_gestion_formation.application_gestion_formation.repositories.UtilisateurRepo;

@Service
public class AuthenticationService {
    private final UtilisateurRepo repository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    


    public AuthenticationService(UtilisateurRepo repository, BCryptPasswordEncoder passwordEncoder,
            JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(Utilisateur request){
        Utilisateur user=new Utilisateur();
        user.setLogin(request.getLogin());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user=repository.save(user);
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);

    }

    public AuthenticationResponse authenticate(Utilisateur request){
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getLogin(),
                request.getPassword()
            )
        );

        Utilisateur user=repository.findByLogin(request.getLogin()).orElseThrow();
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);

    }
    


}
