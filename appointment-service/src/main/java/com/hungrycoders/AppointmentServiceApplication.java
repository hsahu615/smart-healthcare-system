package com.hungrycoders;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableFeignClients
public class AppointmentServiceApplication
{
    public static void main( String[] args )
    {
        SpringApplication.run(AppointmentServiceApplication.class, args);
    }
}
