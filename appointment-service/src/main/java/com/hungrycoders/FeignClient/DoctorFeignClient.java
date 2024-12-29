package com.hungrycoders.FeignClient;

import com.hungrycoders.model.Doctor;
import com.hungrycoders.payload.request.DataRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "doctor-service", url = "http://localhost:8081/api/v1/doctor")
public interface DoctorFeignClient {

    @GetMapping("/{id}")
    ResponseEntity<DataRequest<Doctor>> getDoctorById(@PathVariable("id") String id);
}
