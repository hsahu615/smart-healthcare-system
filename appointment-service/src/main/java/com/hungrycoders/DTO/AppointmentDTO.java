package com.hungrycoders.DTO;

import com.hungrycoders.model.Appointment;

import java.time.LocalDateTime;

public class AppointmentDTO {
    private String id;
    private LocalDateTime appointmentTime;
    private String patientId;
    private String doctorId;
    private String status; // e.g., "pending", "confirmed", "rejected"
    private String patientComments;
    private String doctorComments;

    public AppointmentDTO() {

    }

    public AppointmentDTO(String id, LocalDateTime appointmentTime, String status, String patientComments, String doctorComments, String doctorId, String patientId) {
        this.id = id;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.patientComments = patientComments;
        this.doctorComments = doctorComments;
        this.doctorId = doctorId;
        this.patientId = patientId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getPatientComments() {
        return patientComments;
    }

    public void setPatientComments(String patientComments) {
        this.patientComments = patientComments;
    }

    public String getDoctorComments() {
        return doctorComments;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patient) {
        this.patientId = patient;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorDTO) {
        this.doctorId = doctorDTO;
    }

    public void setDoctorComments(String doctorComments) {
        this.doctorComments = doctorComments;
    }
}
