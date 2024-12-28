package com.hungrycoders.DTO;

import com.hungrycoders.model.Appointment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppointmentDTO {
    private String id;
    private PatientDTO patient;
    private DoctorDTO doctor;
    private LocalDateTime appointmentTime;
    private String status; // e.g., "pending", "confirmed", "rejected"
    private String notes;
    private String doctorComments;
}
