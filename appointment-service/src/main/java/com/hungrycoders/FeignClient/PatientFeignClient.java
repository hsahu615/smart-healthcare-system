package com.hungrycoders.FeignClient;

import com.hungrycoders.DTO.DoctorDTO;
import com.hungrycoders.DTO.PatientDTO;
import com.hungrycoders.payload.request.DataRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "patient-service", url = "http://localhost:8082/api/v1/patient")
public interface PatientFeignClient {
    @GetMapping("/{id}")
    ResponseEntity<DataRequest<PatientDTO>> getPatientById(@PathVariable("id") String id);
}
