package com.hungrycoders.repository;

import com.hungrycoders.model.Doctor;
import com.hungrycoders.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepo extends MongoRepository<Patient, String> {
    // Custom query methods (optional)
    Optional<Patient> findByEmail(String email);
}