package com.hungrycoders.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(value = "doctor")
public class Doctor {


    @Id
    private UUID id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String speciality;

    private Integer yearsOfExperience;

    private DoctorStatus status;

}
