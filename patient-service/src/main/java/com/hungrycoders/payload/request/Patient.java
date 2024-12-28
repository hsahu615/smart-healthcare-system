package com.hungrycoders.payload.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Patient implements Serializable {

    @NotBlank
    @Size(max = 15, message = "must be 15 characters or less")
    private String firstName;

    @NotBlank
    @Size(max = 15, message = "must be 15 characters or less")
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private Integer age;
}
