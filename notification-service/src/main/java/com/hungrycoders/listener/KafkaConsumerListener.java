package com.hungrycoders.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hungrycoders.model.Appointment;
import com.hungrycoders.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.TopicPartition;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerListener {

	final Logger logger = LoggerFactory.getLogger(getClass());
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Autowired
	private EmailService emailService;

//	@KafkaListener(
//			topics = "${spring.kafka.topic.name}",
//			groupId = "${spring.kafka.group-id}",
//			partitions = "0")
	@KafkaListener(
			groupId = "${spring.kafka.consumer.group-id}",
			topicPartitions = @TopicPartition(topic = "${spring.kafka.listener.topic}", partitions = "0")
	)
	public void listen(String message) throws JsonProcessingException {
		// Deserialize the JSON message into an Appointment object
		objectMapper.registerModule(new JavaTimeModule());
		Appointment appointment = objectMapper.readValue(message, Appointment.class);
		String appointmentJson = objectMapper.writeValueAsString(appointment);
		// send email based on appointment status
		emailService.triggerEmailNotification(appointment);
		// Log the deserialized Appointment object
		logger.info("Received Appointment | message: {}, json: {}", message, appointmentJson);
	}

}
