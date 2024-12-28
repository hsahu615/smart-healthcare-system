package com.hungrycoders.payload.request;

import com.hungrycoders.DTO.DoctorDTO;
import com.hungrycoders.DTO.PatientDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DataRequest<T> {
        String message;
        T data;
}
