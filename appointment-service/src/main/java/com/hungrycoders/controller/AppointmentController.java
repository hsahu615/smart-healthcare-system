package com.hungrycoders.controller;

import com.hungrycoders.DTO.AppointmentDTO;
import com.hungrycoders.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/appointment")
public class AppointmentController {
        @Autowired
        private AppointmentService appointmentService;

        @PostMapping
        public AppointmentDTO bookAppointment(@RequestBody AppointmentDTO appointmentDTO) {
            return appointmentService.bookAppointment(appointmentDTO);
        }

        @GetMapping("{id}")
        public List<AppointmentDTO> getAppointmentsByDoctor(@PathVariable String id) {
            return appointmentService.getByDoctorId(id);
        }

        @GetMapping("/all")
        public List<AppointmentDTO> getAllAppointments() {
            return appointmentService.getAllAppointments();
        }

        @PutMapping("/")
        public AppointmentDTO updateAppointment(@RequestBody AppointmentDTO appointmentDTO) {
            return appointmentService.updateAppointment(appointmentDTO);
        }

        @DeleteMapping("/all/{id}")
        public ResponseEntity<?> deleteAllAppointmentsByDoctor(@PathVariable String id) {
            return new ResponseEntity<>(appointmentService.deleteAllAppointmentsByDoctor(id), HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteById(@PathVariable String id) {
            return new ResponseEntity<>(appointmentService.deleteById(id), HttpStatus.OK);
        }
}
