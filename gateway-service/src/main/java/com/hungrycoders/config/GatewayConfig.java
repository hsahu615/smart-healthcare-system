package com.hungrycoders.config;

import com.hungrycoders.filter.AuthenticationFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration // Marks this class as a configuration class for Spring
 // Generates a constructor for final fields (AuthenticationFilter)
public class GatewayConfig {

    // Injects the custom authentication filter for validating requests
    private final AuthenticationFilter filter;

    // Explicit constructor for dependency injection
    public GatewayConfig(AuthenticationFilter filter) {
        this.filter = filter;
    }


    /**
     * Configures routes for the API Gateway.
     * Defines how incoming requests should be routed to specific microservices.
     *
     * @param builder RouteLocatorBuilder to define routes and attach filters.
     * @return a RouteLocator with defined routes.
     */
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                // Route configuration for doctor-service
                .route("doctor-service", r -> r.path("/doctors")
                        .filters(f -> f.filter(filter)
                                .circuitBreaker(config -> config
                                        .setName("doctorCircuitBreaker")
                                        .setFallbackUri("forward:/fallback/doctor")))
                        .uri("http://doctor-service:8080/doctors")) // Load-balanced URI

                // Route configuration for patient-service
                .route("patient-service", r -> r.path("/patients")
                        .filters(f -> f.filter(filter)
                                .circuitBreaker(config -> config
                                        .setName("patientCircuitBreaker")
                                        .setFallbackUri("forward:/fallback/patient")))
                        .uri("http://doctor-service:8080/patients")) // Load-balanced URI

                // Route configuration for appointment-service
                .route("appointment-service", r -> r.path("/appointment")
                        .filters(f -> f.filter(filter)
                                .circuitBreaker(config -> config
                                        .setName("appointmentServiceCircuitBreaker")
                                        .setFallbackUri("forward:/fallback/appointment")))
                        .uri("http://appointment-service:8080/appointment"))

                // Route configuration for auth-service
                .route("auth-service", r -> r.path("/auth")
                        .filters(f -> f.filter(filter)
                                .circuitBreaker(config -> config
                                        .setName("authServiceCircuitBreaker")
                                        .setFallbackUri("forward:/fallback/auth")))
                        .uri("http://appointment-service:8080/auth"))// Load-balanced URI
                .build();
    }
}
