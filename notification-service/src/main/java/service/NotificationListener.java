package service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {

    @KafkaListener(topics = "your-topic-name", groupId = "your-group-id")
    public void receiveMessage(String message) {
        System.out.println("Received notification: " + message);
        // Add your logic to process the message here(send emails)
    }
}
