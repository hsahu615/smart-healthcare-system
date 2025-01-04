package com.hungrycoders.service;

import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.model.Appointment;
import com.hungrycoders.model.AppointmentStatus;
import com.hungrycoders.model.Doctor;
import com.hungrycoders.model.Patient;
import com.hungrycoders.payload.request.AppointmentRequest;
import com.hungrycoders.repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * Service class to handle appointment-related business logic.
 * Manages booking, retrieval, and updating of appointments.
 */
@Service
public class AppointmentService {

    @Value("${app.environment}")
    private String environment;

    @Autowired
    private AppointmentRepo appointmentRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${doctor.service.url}")
    private String doctorServiceUrl;

    @Value("${patient.service.url}")
    private String patientServiceUrl;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Value("${spring.kafka.producer.topic}")
    private String topicName;

    /**
     * Books a new appointment by validating doctor and patient information.
     *
     * @param appointment the appointment request details.
     * @return the ID of the newly created appointment.
     */
    public String bookAppointment(AppointmentRequest appointment) {
        try {
            // Fetch and validate doctor details
            Doctor doctor = fetchDoctorDetails(appointment.getDoctorId().toString());
            if (doctor == null) {
                throw new ResourceNotFoundException("Doctor not found with ID: " + appointment.getDoctorId());
            }

            // Fetch and validate patient details
            Patient patient = fetchPatientDetails(appointment.getPatientId().toString());
            if (patient == null) {
                throw new ResourceNotFoundException("Patient not found with ID: " + appointment.getPatientId());
            }

            // Create and save the appointment
            Appointment newAppointment = new Appointment();
            newAppointment.setDoctor(doctor);
            newAppointment.setPatient(patient);
            newAppointment.setAppointmentTime(appointment.getAppointmentTime());
            newAppointment.setDoctorComments(appointment.getDoctorComments());
            newAppointment.setNotes(appointment.getNotes());
            newAppointment.setStatus(AppointmentStatus.PENDING);

            String appointmentId = appointmentRepository.save(newAppointment).getId();
            // send message to kafka
            kafkaTemplate.send(topicName, newAppointment.toString());
            return appointmentId;
        } catch (Exception e) {
            throw new ResourceNotFoundException("Error booking appointment: " + e.getMessage());
        }
    }

    /**
     * Retrieves appointments by doctor ID, sorted by appointment time.
     *
     * @param doctorId the ID of the doctor.
     * @return a list of appointments for the specified doctor.
     */
    public List<Appointment> getByDoctorId(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId, Sort.by(Sort.Direction.ASC, "appointmentTime"));
    }

    /**
     * Retrieves appointments by patient ID, sorted by appointment time.
     *
     * @param patientId the ID of the patient.
     * @return a list of appointments for the specified patient.
     */
    public List<Appointment> getByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId, Sort.by(Sort.Direction.ASC, "appointmentTime"));
    }

    /**
     * Retrieves all appointments, sorted by appointment time in ascending order.
     *
     * @return a list of all appointments.
     */
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAllByOrderByAppointmentTimeAsc();
    }

    /**
     * Updates an existing appointment.
     *
     * @param appointment the updated appointment details.
     * @return the ID of the updated appointment.
     * @throws ResourceNotFoundException if the appointment is not found.
     */
    public String updateAppointment(AppointmentRequest appointment) {
        try {
            // Find the existing appointment
            Appointment existingAppointment = appointmentRepository.findById(appointment.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + appointment.getId()));

            // Fetch and validate doctor details
            Doctor doctor = restTemplate.getForObject(doctorServiceUrl + "/" + appointment.getDoctorId(), Doctor.class);
            if (doctor == null) {
                throw new ResourceNotFoundException("Doctor not found with ID: " + appointment.getDoctorId());
            }

            // Fetch and validate patient details
            Patient patient = restTemplate.getForObject(patientServiceUrl + "/" + appointment.getPatientId(), Patient.class);
            if (patient == null) {
                throw new ResourceNotFoundException("Patient not found with ID: " + appointment.getPatientId());
            }

            // Update appointment details
            existingAppointment.setDoctor(doctor);
            existingAppointment.setPatient(patient);
            existingAppointment.setAppointmentTime(appointment.getAppointmentTime());
            existingAppointment.setNotes(appointment.getNotes());
            existingAppointment.setDoctorComments(appointment.getDoctorComments());
            existingAppointment.setStatus(AppointmentStatus.fromValue(appointment.getStatus()));

            return appointmentRepository.save(existingAppointment).getId();
        } catch (Exception e) {
            throw new ResourceNotFoundException("Error updating appointment: " + e.getMessage());
        }
    }

    private Doctor fetchDoctorDetails(String doctorId) {
        if (isDevelopmentEnvironment()) {
            // Return a mock Doctor object
            return new Doctor(
                    doctorId,
                    "John",
                    "Doe",
                    "john.doe@hospital.com",
                    "1234567890",
                    "Cardiology",
                    10,
                    "ACTIVE"
            );
        }

        // Actual call in non-development environments
        Doctor doctor = restTemplate.getForObject(doctorServiceUrl + "/" + doctorId, Doctor.class);
        if (doctor == null) {
            throw new ResourceNotFoundException("Doctor not found with ID: " + doctorId);
        }
        return doctor;
    }

    private Patient fetchPatientDetails(String patientId) {
        if (isDevelopmentEnvironment()) {
            // Return a mock Patient object
            return new Patient(
                    patientId,
                    "Jane",
                    "Smith",
                    "jane.smith@example.com",
                    "0987654321",
                    30
            );
        }

        // Actual call in non-development environments
        Patient patient = restTemplate.getForObject(patientServiceUrl + "/" + patientId, Patient.class);
        if (patient == null) {
            throw new ResourceNotFoundException("Patient not found with ID: " + patientId);
        }
        return patient;
    }

    private boolean isDevelopmentEnvironment() {
        return "dev".equalsIgnoreCase(environment);
    }
}
