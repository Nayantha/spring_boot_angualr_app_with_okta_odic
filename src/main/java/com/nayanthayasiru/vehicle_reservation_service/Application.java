package com.nayanthayasiru.vehicle_reservation_service;

import com.nayanthayasiru.vehicle_reservation_service.controller.GroupController;
import com.nayanthayasiru.vehicle_reservation_service.models.Event;
import com.nayanthayasiru.vehicle_reservation_service.models.Group;
import com.nayanthayasiru.vehicle_reservation_service.repository.GroupRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@SpringBootApplication
@ComponentScan(
        basePackages = {"com.nayanthayasiru"},
        excludeFilters = {
                @ComponentScan.Filter(
                        type = FilterType.ASSIGNABLE_TYPE,
                        value = {
                                Group.class,
                                GroupRepository.class,
                                GroupController.class,
                                Event.class
                        }
                )
        }
)
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
