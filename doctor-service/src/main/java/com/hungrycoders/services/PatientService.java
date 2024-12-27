package com.hungrycoders.services;

import com.hungrycoders.DTO.PatientDTO;
import com.hungrycoders.FeignClient.AppointmentFeignClient;
import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.model.Doctor;
import com.hungrycoders.model.Patient;
import com.hungrycoders.repository.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private AppointmentFeignClient appointmentFeignClient;

    public List<PatientDTO> getAllPatients() {
        List<Patient> patientList = patientRepo.findAll();
        return patientList.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public PatientDTO addPatient(PatientDTO patient) throws Exception {
        Optional<Patient> optionalPatient = patientRepo.findByEmail(patient.getEmail());
        if(optionalPatient.isPresent()) {
            throw new Exception("Patient already exists.");
        }
        Patient savedPatient = patientRepo.save(this.toModel(patient));
        return this.toDTO(savedPatient);
    }

    public PatientDTO getPatientById(String id) throws ResourceNotFoundException {
        Optional<Patient> patient = patientRepo.findById(id);
        if(patient.isEmpty()) {
            throw new ResourceNotFoundException("Patient not found!");
        }

        return toDTO(patient.get());
    }

    public String deleteById(String id) throws Exception {
        Optional<Patient> patient = patientRepo.findById(id);
        if(patient.isEmpty()) {
            throw new ResourceNotFoundException("Patient not found!");
        }
        try {
            patientRepo.deleteById(id);

        } catch (Exception e) {
            throw new Exception(e);
        }

        return "Successfully Deleted";
    }

    public PatientDTO toDTO(Patient patient) {
        return new PatientDTO(
                patient.getId(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getEmail(),
                patient.getPhone(),
                patient.getAge()
        );
    }

    public Patient toModel(PatientDTO patientDTO) {
        return new Patient(
                patientDTO.getId(),
                patientDTO.getFirstName(),
                patientDTO.getLastName(),
                patientDTO.getEmail(),
                patientDTO.getPhone(),
                patientDTO.getAge()
        );
    }
}


