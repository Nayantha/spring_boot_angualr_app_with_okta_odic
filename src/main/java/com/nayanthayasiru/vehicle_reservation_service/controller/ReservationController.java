package com.nayanthayasiru.vehicle_reservation_service.controller;

import com.nayanthayasiru.vehicle_reservation_service.models.Reservation;
import com.nayanthayasiru.vehicle_reservation_service.models.User;
import com.nayanthayasiru.vehicle_reservation_service.repository.ReservationRepository;
import com.nayanthayasiru.vehicle_reservation_service.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ReservationController {
    private final Logger log = LoggerFactory.getLogger(ReservationController.class);
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    @GetMapping("/all_reservations")
    ResponseEntity<Collection<Reservation>> getReservationsOfAUser(Principal principal) throws Exception {
        User user = userRepository.findById(principal.getName()).orElseThrow(Exception::new);
        return ResponseEntity.ok().body(reservationRepository.findAllByNameAndEmail(user.getName(), user.getEmail()));
    }

    @GetMapping("/reservations")
    ResponseEntity<Collection<Reservation>> getReservationsOfAUserFromToday(Principal principal) {
        User user = userRepository.findById(principal.getName()).orElseThrow();
        log.info("user {}", user);
        Collection<Reservation> reservations = reservationRepository.findAllByNameAndEmail(user.getName(), user.getEmail())
                .stream()
                .filter(reservation -> reservation.getDate().isAfter(LocalDate.now()))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(reservations);
    }

    @GetMapping("/reservation/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        return reservation.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/reservation")
    ResponseEntity<Reservation> createReservation(@Valid @RequestBody Reservation reservation, @Valid @RequestBody User user, @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        log.info("Request to create reservation: {}", reservation);
        log.info("Request to create reservation by user: {}", user);
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        // check to see if user already exists
        User savedUser = userRepository.findById(userId).orElse(new User(
                userId,
                details.get("name").toString(),
                details.get("email").toString(),
                details.get("name").toString()
        ));
        savedUser.setContactNumber(user.getContactNumber());
        savedUser.setCountry(user.getCountry());
        userRepository.save(savedUser);
        reservation.setName(savedUser.getName());
        log.info("reservation {}", reservation);
        Reservation result = reservationRepository.save(reservation);
        return ResponseEntity.created(new URI("/api/reservation/" + result.getId()))
                .body(result);
    }

    @PutMapping("/reservation/{id}")
    ResponseEntity<Reservation> updateGroup(@Valid @RequestBody Reservation reservation) {
        log.info("Request to update reservation: {}", reservation);
        Reservation result = reservationRepository.save(reservation);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/reservation/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Request to delete reservation: {}", id);
        reservationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
