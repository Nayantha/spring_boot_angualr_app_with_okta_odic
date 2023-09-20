package com.nayanthayasiru.vehicle_reservation_service;

import com.nayanthayasiru.vehicle_reservation_service.models.Event;
import com.nayanthayasiru.vehicle_reservation_service.models.Group;
import com.nayanthayasiru.vehicle_reservation_service.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
class Initializer implements CommandLineRunner {

    private final GroupRepository repository;


    @Override
    public void run(String... strings) {
        Stream.of("Omaha JUG", "Kansas City JUG", "Chicago JUG",
                        "Dallas JUG", "Philly JUG", "Garden State JUG", "NY Java SIG")
                .forEach(name -> repository.save(new Group(name)));

        Group jug = repository.findByName("Garden State JUG");
        Event e = new Event(Instant.parse("2023-10-18T18:00:00.000Z"),
                "OAuth for Java Developers", "Learn all about OAuth and OIDC + Java!");
        jug.setEvents(Collections.singleton(e));
        repository.save(jug);

        repository.findAll().forEach(System.out::println);
    }
}
