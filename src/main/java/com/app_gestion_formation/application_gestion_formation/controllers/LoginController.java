package com.app_gestion_formation.application_gestion_formation.controllers;

import com.app_gestion_formation.application_gestion_formation.models.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping
    public String login(@RequestBody Utilisateur utilisateur) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(utilisateur.getLogin(), utilisateur.getPassword())
            );
            return "Login successful for user: " + authentication.getName();
        } catch (AuthenticationException e) {
            return "Login failed: " + e.getMessage();
        }
    }
}
