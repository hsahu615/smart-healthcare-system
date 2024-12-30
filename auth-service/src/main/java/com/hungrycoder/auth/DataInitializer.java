package com.hungrycoder.auth;

import com.hungrycoder.auth.models.Role;
import com.hungrycoder.auth.models.UserRole;
import com.hungrycoder.auth.repository.RoleRepository;
import org.bson.Document;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer {

    @Bean
    public CommandLineRunner initializeData(RoleRepository roleRepository,
                                            MongoTemplate mongoTemplate) {
        return args -> {

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

            // Insert into User collection
            Document adminUser = new Document()
                    .append("username", "admin")
                    .append("email", "noreplyhungrycoders@gmail.com")
                    .append("roles", List.of("ROLE_ADMIN"))
                    .append("password", "admin123");

            Document doctorUser = new Document()
                    .append("username", "doctor")
                    .append("email", "doctorhungrycoders@gmail.com")
                    .append("roles", List.of("ROLE_DOCTOR"))
                    .append("password", "doctor123");

            Document patientUser = new Document()
                    .append("username", "patient")
                    .append("email", "patienthungrycoders@gmail.com")
                    .append("roles", List.of("ROLE_PATIENT"))
                    .append("password", "patient123");

            // Insert into Doctors collection
            Document doctor = new Document()
                    .append("firstName", "Sample")
                    .append("lastName", "Doctor")
                    .append("email", "doctorhungrycoders@gmail.com")
                    .append("phone", "123456789")
                    .append("speciality", "Gynic, General Medicine")
                    .append("yearsOfExperience", 4)
                    .append("status", "Available");

            // Insert into Patients collection
            Document patient = new Document()
                    .append("firstName", "Sample")
                    .append("lastName", "Patient")
                    .append("email", "patienthungrycoders@gmail.com")
                    .append("phone", "123456789");

            // Insert documents into collections
            mongoTemplate.insert(adminUser, "users");
            mongoTemplate.insert(doctorUser, "users");
            mongoTemplate.insert(patientUser, "users");

            mongoTemplate.insert(doctor, "doctors");
            mongoTemplate.insert(patient, "patients");

            System.out.println("Data initialization complete!");
        };
    }
}
