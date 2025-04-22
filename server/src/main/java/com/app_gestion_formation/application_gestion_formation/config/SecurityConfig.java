package com.app_gestion_formation.application_gestion_formation.config;

<<<<<<< HEAD:src/main/java/com/app_gestion_formation/application_gestion_formation/config/SecurityConfig.java
import java.util.List;
=======
import java.util.Arrays;
>>>>>>> 18986bc9edfa02ab1da59d675a73f50055c65ad3:server/src/main/java/com/app_gestion_formation/application_gestion_formation/config/SecurityConfig.java

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:4200"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setExposedHeaders(List.of("X-Total-Count"));
    config.setAllowCredentials(true);
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource());

        http
            .cors() 
            .and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // Allow all requests
            /* .authorizeHttpRequests(auth -> auth
                .requestMatchers("/role/**").permitAll()
                .requestMatchers("/login/**", "/css/**", "/js/**").permitAll()
                .requestMatchers("/formation/**").permitAll()
                .requestMatchers("/utilisateur/**").permitAll()
                .requestMatchers("/domaine/**").permitAll()       
                .authenticated()
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

    @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Angular origin
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed HTTP methods
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // Allowed headers
    configuration.setAllowCredentials(true); // If you're using cookies or HTTP basic auth

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

}