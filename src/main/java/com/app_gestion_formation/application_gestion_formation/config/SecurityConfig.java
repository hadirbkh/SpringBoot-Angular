package com.app_gestion_formation.application_gestion_formation.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider; // Add this import
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.app_gestion_formation.application_gestion_formation.services.UtilisateurService;

@Configuration
public class SecurityConfig {

    private final UtilisateurService utilisateurService;

    @Autowired // Add Autowired for dependency injection
    public SecurityConfig(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return utilisateurService;
    }
    
    @Bean 
    public AuthenticationProvider authenticationProvider() { // Changed method name to lowercase
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(utilisateurService);
        provider.setPasswordEncoder(passwordEncoder()); 
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationProvider provider) {
        return new ProviderManager(provider);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/role/**").permitAll()
                .requestMatchers("/login/**", "/css/**", "/js/**").permitAll()
                .requestMatchers("/utilisateur/**").permitAll()
                /* .authenticated()
                .anyRequest().authenticated()*/
                
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Ensure stateless authentication (for REST APIs)
            )
            .authenticationProvider(authenticationProvider())
            .httpBasic() // Enable basic authentication
            .and()
            .formLogin().disable() // Disable form login to avoid redirects
            .logout().disable(); // Disable default logout redirect

        return http.build();
    }

}