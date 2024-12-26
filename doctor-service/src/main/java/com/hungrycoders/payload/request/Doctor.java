package com.hungrycoders.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hungrycoders.model.DoctorStatus;
import com.hungrycoders.utils.ValidEnum;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Doctor {

    @NotBlank
    @Size(max = 15, message = "First name must be 15 characters or less")
    private String firstName;

    @NotBlank
    @Size(max = 15, message = "Last name must be 15 characters or less")
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    @Size(max = 200, message = "Speciality must be 500 chars or less")
    private String speciality;

    @Min(value = 0L, message = "Years of experience must be positive")
    private Integer yearsOfExperience;

    @JsonProperty(required = true)
    @NotNull(message = "Doctor status must be provided")
    @ValidEnum(enumClass = DoctorStatus.class, message = "Invalid doctor status")
    private DoctorStatus status;
}
