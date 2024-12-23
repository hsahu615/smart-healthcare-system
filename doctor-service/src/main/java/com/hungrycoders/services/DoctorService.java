package com.hungrycoders.services;

import com.hungrycoders.DTO.DoctorDTO;
import com.hungrycoders.FeignClient.AppointmentFeignClient;
import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.model.Doctor;
import com.hungrycoders.repository.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private AppointmentFeignClient appointmentFeignClient;

    public List<DoctorDTO> getAllDoctors() {
        List<Doctor> doctorList = doctorRepo.findAll();
        return doctorList.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public DoctorDTO addDoctor(DoctorDTO doctor) throws Exception {
        Optional<Doctor> optionalDoctor = doctorRepo.findByEmail(doctor.getEmail());
        if(optionalDoctor.isPresent()) {
            throw new Exception("Doctor already exists.");
        }
        Doctor savedDoctor = doctorRepo.save(this.toModel(doctor));
        return this.toDTO(savedDoctor);
    }

    public DoctorDTO getDoctorById(String id) throws ResourceNotFoundException {
        Optional<Doctor> doctor = doctorRepo.findById(id);
        if(doctor.isEmpty()) {
            throw new ResourceNotFoundException("Doctor not found!");
        }

        return toDTO(doctor.get());
    }

    public String deleteById(String id) throws Exception {
        Optional<Doctor> doctor = doctorRepo.findById(id);
        if(doctor.isEmpty()) {
            throw new ResourceNotFoundException("Doctor not found!");
        }
        try {
            doctorRepo.deleteById(id);
            appointmentFeignClient.deleteAllAppointmentsByDoctor(id);

        } catch (Exception e) {
            throw new Exception(e);
        }

        return "Successfully Deleted";
    }

    public DoctorDTO toDTO(Doctor doctor) {
        return new DoctorDTO(
                doctor.getId(),
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getEmail(),
                doctor.getPhone(),
                doctor.getSpecialty(),
                doctor.getYearsOfExperience(),
                doctor.getIsAvailable()
        );
    }

    public Doctor toModel(DoctorDTO doctorDTO) {
        return new Doctor(
                doctorDTO.getId(),
                doctorDTO.getFirstName(),
                doctorDTO.getLastName(),
                doctorDTO.getEmail(),
                doctorDTO.getPhone(),
                doctorDTO.getSpecialty(),
                doctorDTO.getYearsOfExperience(),
                doctorDTO.getIsAvailable()
        );
    }
}


