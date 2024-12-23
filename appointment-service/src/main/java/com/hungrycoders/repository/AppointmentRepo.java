package com.hungrycoders.repository;

import com.hungrycoders.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepo extends MongoRepository<Appointment, String> {
    List<Appointment> findByDoctorId(String doctorId);
    void deleteAllByDoctorId(String doctorId);
}
