package com.hungrycoders.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hungrycoders.model.Appointment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerListener {

	final Logger logger = LoggerFactory.getLogger(getClass());
	private final ObjectMapper objectMapper = new ObjectMapper();
	@KafkaListener(topics = "${spring.kafka.topic.name}", groupId = "${spring.kafka.group-id}")
	public void listen(String message) throws JsonProcessingException {
		// Deserialize the JSON message into an Appointment object
		objectMapper.registerModule(new JavaTimeModule());
		Appointment appointment = objectMapper.readValue(message, Appointment.class);
		String appointmentJson = objectMapper.writeValueAsString(appointment);
		// Log the deserialized Appointment object
		logger.info("Received Appointment | message: {}, json: {}", message, appointmentJson);
	}
}
