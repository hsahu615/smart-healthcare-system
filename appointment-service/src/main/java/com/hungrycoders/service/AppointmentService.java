package com.hungrycoders.service;

import com.hungrycoders.DTO.AppointmentDTO;
import com.hungrycoders.DTO.DoctorDTO;
import com.hungrycoders.FeignClient.DoctorFeignClient;
import com.hungrycoders.model.Appointment;
import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepo appointmentRepository;

    @Autowired
    private DoctorFeignClient doctorFeignClient;

    public boolean isDoctorAvailable(String doctorId) {
        ResponseEntity<DoctorDTO> doctorDTOResponseEntity = doctorFeignClient.getDoctorById(doctorId);
        if(!doctorDTOResponseEntity.hasBody()) {
            throw new ResourceNotFoundException("Doctor id is invalid!");
        }
        return Objects.requireNonNull(doctorDTOResponseEntity.getBody()).getIsAvailable();
    }

    public AppointmentDTO bookAppointment(AppointmentDTO appointment) {
        if (isDoctorAvailable(appointment.getDoctorId())) {
            return this.toDTO(appointmentRepository.save(this.toModel(appointment)));
        } else {
            throw new ResourceNotFoundException("Doctor is not available at this time");
        }
    }

    public List<AppointmentDTO> getByDoctorId(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream()
                .map((this::toDTO)).collect(Collectors.toList());
    }

    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map((this::toDTO)).collect(Collectors.toList());
    }

    public AppointmentDTO updateAppointment(AppointmentDTO appointmentDTO) {
        return this.toDTO(appointmentRepository.save(this.toModel(appointmentDTO)));
    }

    public AppointmentDTO toDTO(Appointment appointment) {
        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setId(appointment.getId());
        appointmentDTO.setPatientName(appointment.getPatientName());
        appointmentDTO.setAppointmentTime(appointment.getAppointmentTime());
        appointmentDTO.setDoctorId(appointment.getDoctorId());
        appointmentDTO.setStatus(appointment.getStatus());
        return appointmentDTO;
    }

    public Appointment toModel(AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setId(appointmentDTO.getId());
        appointment.setPatientName(appointmentDTO.getPatientName());
        appointment.setAppointmentTime(appointmentDTO.getAppointmentTime());
        appointment.setDoctorId(appointmentDTO.getDoctorId());
        appointment.setStatus(appointmentDTO.getStatus());
        return appointment;
    }
}
