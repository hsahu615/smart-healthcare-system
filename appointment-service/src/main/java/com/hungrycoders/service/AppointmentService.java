package com.hungrycoders.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hungrycoders.model.Doctor;
import com.hungrycoders.model.Patient;
import com.hungrycoders.FeignClient.DoctorFeignClient;
import com.hungrycoders.FeignClient.PatientFeignClient;
import com.hungrycoders.model.Appointment;
import com.hungrycoders.exception.ResourceNotFoundException;
import com.hungrycoders.model.AppointmentStatus;
import com.hungrycoders.notifications.NotificationProducer;
import com.hungrycoders.payload.request.AppointmentRequest;
import com.hungrycoders.payload.request.DataRequest;
import com.hungrycoders.repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AppointmentService {

    @Autowired
    private NotificationProducer notificationProducer;

    @Autowired
    private AppointmentRepo appointmentRepository;

    @Autowired
    private DoctorFeignClient doctorFeignClient;

    @Autowired
    private PatientFeignClient patientFeignClient;


    public String bookAppointment(AppointmentRequest appointmentRequest) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            DataRequest<Doctor> dataRequestDoctor = doctorFeignClient.getDoctorById(appointmentRequest.getDoctorId().toString()).getBody();
            DataRequest<Patient> dataRequestPatient = patientFeignClient.getPatientById(appointmentRequest.getPatientId().toString()).getBody();
            Appointment appointment = new Appointment();
            appointment.setDoctor(dataRequestDoctor.getData());
            appointment.setPatient(dataRequestPatient.getData());
            appointment.setAppointmentTime(appointmentRequest.getAppointmentTime());
            appointment.setDoctorComments(appointmentRequest.getDoctorComments());
            appointment.setNotes(appointmentRequest.getNotes());
            appointment.setStatus(AppointmentStatus.PENDING);
            String appointmentId = appointmentRepository.save(appointment).getId();
            // send an event to kafka topic here
            notificationProducer.sendAppointmentEvent(appointment);
            return appointmentId;
        } catch (Exception e){
            throw new ResourceNotFoundException("Error: " + e.getMessage());
        }
    }

    public List<Appointment> getByDoctorId(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId, Sort.by(Sort.Direction.ASC, "appointmentTime"));
    }

    public List<Appointment> getByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId, Sort.by(Sort.Direction.ASC, "appointmentTime"));
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAllByOrderByAppointmentTimeAsc();
    }

    public String updateAppointment(AppointmentRequest appointment) throws Exception {
        try {
            Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointment.getId());
            if(optionalAppointment.isEmpty()) {
                throw new ResourceNotFoundException("Appointment not available");
            } else {
                DataRequest<Doctor> dataRequestDoctor = doctorFeignClient.getDoctorById(appointment.getDoctorId().toString()).getBody();
                DataRequest<Patient> dataRequestPatient = patientFeignClient.getPatientById(appointment.getPatientId().toString()).getBody();
                Appointment updatedAppointment = optionalAppointment.get();
                updatedAppointment.setDoctor(dataRequestDoctor.getData());
                updatedAppointment.setPatient(dataRequestPatient.getData());
                updatedAppointment.setAppointmentTime(appointment.getAppointmentTime());
                updatedAppointment.setNotes(appointment.getNotes());
                updatedAppointment.setDoctorComments(appointment.getDoctorComments());
                updatedAppointment.setStatus(AppointmentStatus.fromValue(appointment.getStatus()));
                return appointmentRepository.save(updatedAppointment).getId();
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}