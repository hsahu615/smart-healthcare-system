package com.hungrycoders.DTO;

import com.hungrycoders.model.Appointment;

import java.time.LocalDateTime;

public class AppointmentDTO {
    private String id;
    private String patientName;
    private String doctorId;
    private LocalDateTime appointmentTime;
    private String status; // e.g., "Scheduled", "Completed", "Cancelled"

    public AppointmentDTO() {

    }

    public AppointmentDTO(String id, String patientName, String doctorId, LocalDateTime appointmentTime, String status) {
        this.id = id;
        this.doctorId = doctorId;
        this.patientName = patientName;
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
