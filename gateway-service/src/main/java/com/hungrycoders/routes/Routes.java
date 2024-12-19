package com.hungrycoders.routes;

import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.*;

import java.net.URI;

@Configuration
public class Routes {
    @Bean
    public RouterFunction<ServerResponse> doctorServiceRoute() {
        return GatewayRouterFunctions
                .route("doctor_service")
                .route(RequestPredicates.path("/doctor/**"),
                        /** service names are needed when run as docker containers
                         * Can be changed back to http://localhost:8081 for local
                         * runs and debugging
                         */
                        HandlerFunctions.http("http://doctor-service:8081"))
                .build();


    }

    @Bean
    public RouterFunction<ServerResponse> appointmentServiceRoute() {
        return GatewayRouterFunctions
                .route("appointment_service")
                .route(RequestPredicates.path("/appointment/**"),
                        /** service names are needed when run as docker containers
                         * Can be changed back to http://localhost:8082 for local
                         * runs and debugging
                         */
                        HandlerFunctions.http("http://appointment-service:8082"))
                .build();
    }
}
