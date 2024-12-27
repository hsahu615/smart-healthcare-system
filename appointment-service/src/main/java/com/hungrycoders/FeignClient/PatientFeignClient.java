package com.hungrycoders.FeignClient;

import com.hungrycoders.DTO.PatientDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "patient-service", url = "http://localhost:8081/patient")
public interface PatientFeignClient {
    @GetMapping("/{id}")
    ResponseEntity<PatientDTO> getPatientById(@PathVariable("id") String id);
}
