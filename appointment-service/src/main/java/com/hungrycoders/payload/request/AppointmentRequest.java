package com.hungrycoders.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppointmentRequest {
    private String id;
    private String doctorId;
    private String patientId;
    private LocalDateTime appointmentTime;
    private String status = "PENDING"; // e.g., "pending", "confirmed", "rejected"
    private String notes;
    private String doctorComments;
}
