package com.app_gestion_formation.application_gestion_formation.models;

public class AuthenticationResponse {
    
    private String token;

    public AuthenticationResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
    
    
}
