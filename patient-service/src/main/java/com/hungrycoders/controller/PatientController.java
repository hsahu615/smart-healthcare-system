package com.hungrycoders.controller;

import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.payload.request.Patient;
import com.hungrycoders.payload.response.GenericResponse;
import com.hungrycoders.services.PatientService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/v1/patient")
public class PatientController {

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    @Autowired
    private PatientService patientService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable String id) throws ResourceNotFoundException {
        try {
            com.hungrycoders.model.Patient patient = patientService.getPatientById(id);
            return ResponseEntity.status(200).body(new GenericResponse<>("Doctor fetched successfully", patientService.getPatientById(id)));
        } catch (Exception e) {
            logger.error("Error fetching doctor with id: {} {}", id, e.getMessage());
            String errorMessage = "Error fetching doctor's details";
            if (e.getMessage() != null && !e.getMessage().isBlank()) {
                errorMessage += ": " + e.getMessage();
            }
            return ResponseEntity.status(500).body(new GenericResponse<>(errorMessage));
        }

    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllDoctors() throws Exception {
        try {
            List<com.hungrycoders.model.Patient> doctors = patientService.getAllPatients();
            return ResponseEntity.status(200).body(new GenericResponse<>("Fetched doctors successfully", doctors));
        } catch (Exception e) {
            logger.error("Error fetching doctors: " + e.getMessage());
            String errorMessage = "Error fetching doctors";
            if (e.getMessage() != null && !e.getMessage().isBlank()) {
                errorMessage += ": " + e.getMessage();
            }
            return ResponseEntity.status(500).body(new GenericResponse<>(errorMessage));
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> saveDoctor(@Valid @RequestBody com.hungrycoders.payload.request.Patient doctor) throws Exception {
        try {
            com.hungrycoders.model.Patient savedDoctor = patientService.addPatient(doctor);
            return ResponseEntity.status(200).body(new GenericResponse<>("Doctor saved successfully", savedDoctor));
        } catch(Exception e) {
            logger.error("Error saving doctor: " + e.getMessage());
            return ResponseEntity.status(500).body(new GenericResponse<>("Error saving doctor"));
        }

    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateDoctor(@Valid @RequestBody Patient doctor, @PathVariable String id) throws Exception {
        try {
            com.hungrycoders.model.Patient updatedDoctor = patientService.updatePatientById(id, doctor);
            return ResponseEntity.status(200).body(new GenericResponse<>("Doctor updated successfully", updatedDoctor));
        } catch(Exception e) {
            logger.error("Error updating doctor: " + e.getMessage());
            return ResponseEntity.status(500).body(new GenericResponse<>("Error updating doctor"));
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable String id) throws Exception {
        try {
            patientService.deleteDoctorById(id);
            return ResponseEntity.status(200).body(new GenericResponse<>("Doctor deleted successfully"));
        } catch(Exception e) {
            logger.error("Error deleting doctor: " + e.getMessage());
            return ResponseEntity.status(500).body(new GenericResponse<>("Error deleting doctor"));
        }

    }
}
