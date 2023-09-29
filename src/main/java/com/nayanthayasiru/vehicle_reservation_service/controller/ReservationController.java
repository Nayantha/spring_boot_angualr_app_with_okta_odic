package com.nayanthayasiru.vehicle_reservation_service.controller;

import com.nayanthayasiru.vehicle_reservation_service.models.Reservation;
import com.nayanthayasiru.vehicle_reservation_service.models.User;
import com.nayanthayasiru.vehicle_reservation_service.repository.ReservationRepository;
import com.nayanthayasiru.vehicle_reservation_service.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ReservationController {
    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    @GetMapping("/all_reservations")
    Collection<Reservation> getReservationsOfAUser(Principal principal) throws Exception {
        User user = userRepository.findById(principal.getName()).orElseThrow(Exception::new);
        return reservationRepository.findAllByNameAndEmail(user.getName(), user.getEmail());
    }

    @GetMapping("/reservation")
    Collection<Reservation> getReservationsOfAUserFromToday(Principal principal) throws Exception {
        User user = userRepository.findById(principal.getName()).orElseThrow(Exception::new);
        return reservationRepository.findAllByNameAndEmailFromToday(user.getName(), user.getEmail(), LocalDate.now());
    }

    @GetMapping("/reservation/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        return reservation.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
