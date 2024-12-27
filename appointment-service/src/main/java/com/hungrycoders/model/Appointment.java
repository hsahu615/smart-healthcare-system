package com.hungrycoders.model;

import com.hungrycoders.DTO.DoctorDTO;
import com.hungrycoders.DTO.PatientDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "appointment")
public class Appointment {
    @Id
    private String id;
    private DoctorDTO doctor;
    private PatientDTO patient;
    private LocalDateTime appointmentTime;
    private String status; // e.g., "Scheduled", "Completed", "Cancelled"
    private String patientComments;
    private String doctorComments;

    public Appointment() { }

    public Appointment(String id, LocalDateTime appointmentTime, String status, DoctorDTO doctor, PatientDTO patient, String patientComments, String doctorComments) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.patientComments = patientComments;
        this.doctorComments = doctorComments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public PatientDTO getPatient() {
        return patient;
    }

    public void setPatient(PatientDTO patient) {
        this.patient = patient;
    }
    public DoctorDTO getDoctor() {
        return doctor;
    }

    public void setDoctor(DoctorDTO doctor) {
        this.doctor = doctor;
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

    public void setDoctorComments(String doctorComments) {
        this.doctorComments = doctorComments;
    }
}
