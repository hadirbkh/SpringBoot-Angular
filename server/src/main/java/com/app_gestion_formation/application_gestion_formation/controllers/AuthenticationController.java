package com.app_gestion_formation.application_gestion_formation.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.app_gestion_formation.application_gestion_formation.models.AuthenticationResponse;
import com.app_gestion_formation.application_gestion_formation.models.Utilisateur;
import com.app_gestion_formation.application_gestion_formation.services.AuthenticationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class AuthenticationController {
    
    private final AuthenticationService authService;

    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/api/register")
    public ResponseEntity<AuthenticationResponse> register(
        @RequestBody Utilisateur request) {        
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/api/login")
    public ResponseEntity<AuthenticationResponse> login(
        @RequestBody Utilisateur request) {        
        return ResponseEntity.ok(authService.authenticate(request));
    }

    
}
