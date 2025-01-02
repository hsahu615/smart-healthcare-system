package com.hungrycoders.notifications;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hungrycoders.model.Appointment;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public NotificationProducer(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void sendAppointmentEvent(Appointment appointment) {
        try {
            // Serialize the Appointment object to a JSON string
            String appointmentJson = objectMapper.writeValueAsString(appointment);

            // Send the message to the Kafka topic
            //    @Value("${kafka.topic.appointment-notifications}")
            String appointmentNotificationsTopic = "appointment-notifications";
            kafkaTemplate.send(appointmentNotificationsTopic, appointmentJson);

            System.out.println("Appointment event sent to Kafka: " + appointmentJson);
        } catch (JsonProcessingException e) {
            System.err.println("Error serializing appointment object: " + e.getMessage());
        }
    }
}
