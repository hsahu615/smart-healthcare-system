package com.hungrycoders.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerListener {

	final Logger logger = LoggerFactory.getLogger(getClass());

	@KafkaListener(topics = "${spring.kafka.topic.name}", groupId = "${spring.kafka.group-id}")
	public void listen(String message) {
		final String consumeMessage = String.format("Received Messasge: [%s] ", message);
		logger.info(consumeMessage);
	}
}
