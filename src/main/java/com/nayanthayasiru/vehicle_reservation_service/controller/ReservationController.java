package com.nayanthayasiru.vehicle_reservation_service.controller;

import com.nayanthayasiru.vehicle_reservation_service.models.Reservation;
import com.nayanthayasiru.vehicle_reservation_service.models.User;
import com.nayanthayasiru.vehicle_reservation_service.repository.ReservationRepository;
import com.nayanthayasiru.vehicle_reservation_service.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collection;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ReservationController {
    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    @GetMapping("/reservation")
    Collection<Reservation> getReservationsOfAUser(Principal principal) throws Exception {
        User user = userRepository.findById(principal.getName()).orElseThrow(Exception::new);
        return reservationRepository.findAllByNameAndEmail(user.getName(), user.getEmail());
    }
}
