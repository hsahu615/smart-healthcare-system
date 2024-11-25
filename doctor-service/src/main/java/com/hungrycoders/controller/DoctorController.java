package com.hungrycoders.controller;

import com.hungrycoders.DTO.DoctorDTO;
import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable String id) throws ResourceNotFoundException {
        return new ResponseEntity<>(doctorService.getDoctorById(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() throws Exception {
        return new ResponseEntity<>(doctorService.getAllDoctors(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<DoctorDTO> save(@RequestBody  DoctorDTO doctorDTO) throws Exception {
        return new ResponseEntity<>(doctorService.addDoctor(doctorDTO), HttpStatus.OK);
    }
}
