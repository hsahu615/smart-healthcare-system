package com.hungrycoders.repository;

import com.hungrycoders.model.Appointment;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepo extends MongoRepository<Appointment, String> {
    @Query("{'doctor.id': ?0}")
    List<Appointment> findByDoctorId(String doctorId, Sort sort);
    @Query("{'patient.id': ?0}")
    List<Appointment> findByPatientId(String patientId, Sort sort);
    List<Appointment> findAllByOrderByAppointmentTimeAsc();
}
