package com.app_gestion_formation.application_gestion_formation.services;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.app_gestion_formation.application_gestion_formation.models.Utilisateur;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private final String SECRET_KEY= "63e56ef3e363197407916510dc9dc0cc5460501820da592d16caad690c14a4e6";

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }


    public <T> T extractClaim(String token,Function<Claims,T> resolver){
        Claims claims =extractAllClaims(token);
        return resolver.apply(claims);
    }

    public boolean isValid(String token , UserDetails user){
        String username = extractUsername(token);
        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }


    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSigninkey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public String generateToken(Utilisateur user){
        String token = Jwts
                        .builder()
                        .subject(user.getUsername())
                        .issuedAt(new Date(System.currentTimeMillis()))
                        .expiration(new Date(System.currentTimeMillis()+24*60*60*1000))
                        .signWith(getSigninkey(),Jwts.SIG.HS256)
                        .compact();
            return token;
        
    }

    private SecretKey getSigninkey() {
        byte[] keyBytes=Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
