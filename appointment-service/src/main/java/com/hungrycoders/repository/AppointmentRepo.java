package com.hungrycoders.repository;

import com.hungrycoders.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepo extends MongoRepository<Appointment, String> {
    @Query("{'doctor.id': ?0}")
    List<Appointment> findByDoctorId(String doctorId);

    @Query("{'patient.id': ?0}")
    List<Appointment> findByPatientId(String patientId);
}
