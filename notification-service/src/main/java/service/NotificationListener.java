package service;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.Appointment;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "appointment-notifications", groupId = "appointment-notification-group")
    public void receiveMessage(String message) {
        try {
            // Deserialize the JSON string into an Appointment object
            Appointment appointment = objectMapper.readValue(message, Appointment.class);
            System.out.println("Received notification for appointment: " + appointment);
            // Add your logic to process the message here(send emails) based on the appointment status
        } catch (Exception e) {
            System.err.println("Error processing appointment notification: " + e.getMessage());
        }

    }
}
