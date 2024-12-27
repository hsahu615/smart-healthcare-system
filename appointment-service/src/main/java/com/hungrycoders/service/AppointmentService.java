package com.hungrycoders.service;

import com.hungrycoders.DTO.AppointmentDTO;
import com.hungrycoders.DTO.DoctorDTO;
import com.hungrycoders.DTO.PatientDTO;
import com.hungrycoders.FeignClient.DoctorFeignClient;
import com.hungrycoders.FeignClient.PatientFeignClient;
import com.hungrycoders.model.Appointment;
import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepo appointmentRepository;

    @Autowired
    private DoctorFeignClient doctorFeignClient;

    @Autowired
    private PatientFeignClient patientFeignClient;

    public String bookAppointment(AppointmentDTO appointment) {
        ResponseEntity<DoctorDTO> doctorDTOResponseEntity = doctorFeignClient.getDoctorById(appointment.getDoctorId());
        ResponseEntity<PatientDTO> patientDTOResponseEntity = patientFeignClient.getPatientById(appointment.getPatientId());
        if(doctorDTOResponseEntity.hasBody() && patientDTOResponseEntity.hasBody()){
            DoctorDTO doctorDTO = doctorDTOResponseEntity.getBody();
            PatientDTO patientDTO = patientDTOResponseEntity.getBody();
            Appointment appointment1 = this.toModel(appointment);
            appointment1.setDoctor(doctorDTO);
            appointment1.setPatient(patientDTO);
            return appointmentRepository.save(appointment1).getId();
        } else {
            throw new ResourceNotFoundException("Doctor/Patient is not available at this time");
        }
    }

    public List<Appointment> getByDoctorId(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public List<Appointment> getByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public String updateAppointment(Appointment appointment) {
        Appointment updatedAppointment = new Appointment(
                appointment.getId(),
                appointment.getAppointmentTime(),
                appointment.getStatus(),
                appointment.getDoctor(),
                appointment.getPatient(),
                appointment.getPatientComments(),
                appointment.getDoctorComments()
        );
        appointmentRepository.save(updatedAppointment);
        return "Successfully updated!";
    }

    public String deleteById(String id) {
        try {
            appointmentRepository.deleteById(id);
            return "Successfully deleted";
        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage());
        }

    }

    public AppointmentDTO toDTO(Appointment appointment) {
        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setId(appointment.getId());
        appointmentDTO.setAppointmentTime(appointment.getAppointmentTime());
        appointmentDTO.setStatus(appointment.getStatus());
        appointmentDTO.setDoctorComments(appointment.getDoctorComments());
        appointmentDTO.setPatientComments(appointment.getPatientComments());
        return appointmentDTO;
    }

    public Appointment toModel(AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setId(appointmentDTO.getId());
        appointment.setAppointmentTime(appointmentDTO.getAppointmentTime());
        appointment.setStatus(appointmentDTO.getStatus());
        appointment.setDoctorComments(appointmentDTO.getDoctorComments());
        appointment.setPatientComments(appointmentDTO.getPatientComments());
        return appointment;
    }
}
