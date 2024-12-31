package model;

import java.time.LocalDateTime;

public class Appointment {
    private String id;
    private Patient patient;
    private Doctor doctor;
    private LocalDateTime appointmentTime;
    private AppointmentStatus status; // e.g., "pending", "confirmed", "rejected"
    private String notes;
    private String doctorComments;
}

