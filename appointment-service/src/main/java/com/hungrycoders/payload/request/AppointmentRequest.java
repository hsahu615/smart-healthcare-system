package com.hungrycoders.payload.request;

import com.hungrycoders.model.AppointmentStatus;
import com.hungrycoders.utils.ValidEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppointmentRequest implements Serializable {

    private String id;

    @NotNull
    private UUID doctorId;

    @NotNull
    private UUID patientId;

    @NotNull
    private LocalDateTime appointmentTime;

    @NotNull(message = "must be provided")
    @ValidEnum(message = "must be valid", enumClass = AppointmentStatus.class)
    private String status; // e.g., "pending", "confirmed", "rejected"

    @NotBlank
    @Size(max = 200, message = "must be 200 chars or less")
    private String notes;

    @Size(max = 200, message = "must be 200 chars or less")
    private String doctorComments;
}
