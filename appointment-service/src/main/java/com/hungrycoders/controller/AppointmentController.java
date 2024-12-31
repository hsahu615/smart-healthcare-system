package com.hungrycoders.controller;

import com.hungrycoders.model.Appointment;
import com.hungrycoders.payload.request.AppointmentRequest;
import com.hungrycoders.payload.response.GenericResponse;
import com.hungrycoders.service.AppointmentService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

        private static final Logger logger = LoggerFactory.getLogger(AppointmentController.class);

        @Autowired
        private AppointmentService appointmentService;

        @PostMapping("/create")
        public ResponseEntity<?> bookAppointment(@Valid @RequestBody AppointmentRequest appointmentRequest) {
            try {
                String res = appointmentService.bookAppointment(appointmentRequest);
                return ResponseEntity.status(200).body(new GenericResponse<>("Appointment added successfully", res));
            } catch(Exception e) {
                logger.error("Error adding appointment: {}", e.getMessage());
                return ResponseEntity.status(500).body(new GenericResponse<>("Error adding appointment"));
            }
        }

        @GetMapping("/doctor/{id}")
        public ResponseEntity<?> getAppointmentsByDoctorId(@PathVariable String id) {
            try {
                List<Appointment> appointments = appointmentService.getByDoctorId(id);
                return ResponseEntity.status(200).body(new GenericResponse<>("Fetched appointments successfully", appointments));
            } catch (Exception e) {
                logger.error("Error fetching appointments: " + e.getMessage());
                return ResponseEntity.status(500).body(new GenericResponse<>("Error fetching appointments"));
            }
        }

        @GetMapping("/patient/{id}")
        public ResponseEntity<?> getAppointmentsByPatientId(@PathVariable String id) {
            try {
                List<Appointment> appointments = appointmentService.getByPatientId(id);
                return ResponseEntity.status(200).body(new GenericResponse<>("Fetched appointments successfully", appointments));
            } catch (Exception e) {
                logger.error("Error fetching appointments: " + e.getMessage());
                return ResponseEntity.status(500).body(new GenericResponse<>("Error fetching appointments"));
            }
        }

        @GetMapping("/all")
        public ResponseEntity<?> getAllAppointments() {
            try {
                List<Appointment> appointments = appointmentService.getAllAppointments();
                return ResponseEntity.status(200).body(new GenericResponse<>("Fetched appointments successfully", appointments));
            } catch (Exception e) {
                logger.error("Error fetching appointments: " + e.getMessage());
                return ResponseEntity.status(500).body(new GenericResponse<>("Error fetching appointments"));
            }
        }

        @PutMapping("/")
        public ResponseEntity<?> updateAppointment(@Valid @RequestBody AppointmentRequest appointment) throws Exception {
            try {
                String res = appointmentService.updateAppointment(appointment);
                return ResponseEntity.status(200).body(new GenericResponse<>("Fetched appointments successfully", res));
            } catch (Exception e) {
                logger.error("Error fetching appointments: " + e.getMessage());
                return ResponseEntity.status(500).body(new GenericResponse<>("Error fetching appointments"));
            }
        }
}
