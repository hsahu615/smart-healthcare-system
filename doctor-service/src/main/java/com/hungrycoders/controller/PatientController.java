package com.hungrycoders.controller;

import com.hungrycoders.DTO.PatientDTO;
import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable String id) throws ResourceNotFoundException {
        return new ResponseEntity<>(patientService.getPatientById(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PatientDTO>> getAllPatients() throws Exception {
        return new ResponseEntity<>(patientService.getAllPatients(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<PatientDTO> save(@RequestBody  PatientDTO patientDTO) throws Exception {
        return new ResponseEntity<>(patientService.addPatient(patientDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id) throws Exception {
        return new ResponseEntity<>(patientService.deleteById(id), HttpStatus.OK);
    }
}