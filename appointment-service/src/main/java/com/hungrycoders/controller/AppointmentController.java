package com.hungrycoders.controller;

import com.hungrycoders.model.Appointment;
import com.hungrycoders.payload.request.AppointmentRequest;
import com.hungrycoders.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/v1/appointment")
public class AppointmentController {
        @Autowired
        private AppointmentService appointmentService;

        @PostMapping
        public String bookAppointment(@RequestBody AppointmentRequest appointmentRequest) {
            return appointmentService.bookAppointment(appointmentRequest);
        }

        @GetMapping("/doctor/{id}")
        public List<Appointment> getAppointmentsByDoctorId(@PathVariable String id) {
            return appointmentService.getByDoctorId(id);
        }

        @GetMapping("/patient/{id}")
        public List<Appointment> getAppointmentsByPatientId(@PathVariable String id) {
            return appointmentService.getByPatientId(id);
        }

        @GetMapping("/all")
        public List<Appointment> getAllAppointments() {
            return appointmentService.getAllAppointments();
        }

        @PutMapping("/")
        public String updateAppointment(@RequestBody Appointment appointment) throws Exception {
            return appointmentService.updateAppointment(appointment);
        }
}
