package com.hungrycoder.auth;

import com.hungrycoder.auth.models.Role;
import com.hungrycoder.auth.models.UserRole;
import com.hungrycoder.auth.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class RoleInitializer {

    @Bean
    public CommandLineRunner initializeRoles(RoleRepository roleRepository) {
        return args -> {
            // Check if roles already exist
            if (roleRepository.findByName(UserRole.ROLE_ADMIN).isEmpty()) {
                Role adminRole = new Role(UserRole.ROLE_ADMIN);
                roleRepository.save(adminRole);
                System.out.println("Created ROLE_ADMIN");
            }

            if (roleRepository.findByName(UserRole.ROLE_DOCTOR).isEmpty()) {
                Role doctorRole = new Role(UserRole.ROLE_DOCTOR);
                roleRepository.save(doctorRole);
                System.out.println("Created ROLE_DOCTOR");
            }

            if (roleRepository.findByName(UserRole.ROLE_PATIENT).isEmpty()) {
                Role patientRole = new Role(UserRole.ROLE_PATIENT);
                roleRepository.save(patientRole);
                System.out.println("Created ROLE_PATIENT");
            }
        };
    }
}
