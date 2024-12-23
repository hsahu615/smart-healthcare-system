package com.hungrycoders.FeignClient;

import com.hungrycoders.DTO.DoctorDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "appointment-service", url = "http://localhost:8080/appointment")
public interface AppointmentFeignClient {
    @DeleteMapping(value = "/all/{id}", consumes = "application/json")
    ResponseEntity<String> deleteAllAppointmentsByDoctor(@PathVariable("id") String id);
}
