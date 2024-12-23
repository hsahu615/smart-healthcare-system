package com.hungrycoders.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "appointment")
public class Appointment {
    @Id
    private String id;
    private String patientName;
    private String doctorId;
    private LocalDateTime appointmentTime;
    private String status; // e.g., "Scheduled", "Completed", "Cancelled"

    public Appointment() {

    }

    public Appointment(String id, String patientName, String doctorId, LocalDateTime appointmentTime, String status) {
        this.id = id;
        this.patientName = patientName;
        this.doctorId = doctorId;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
