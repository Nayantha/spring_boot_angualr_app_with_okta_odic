package com.nayanthayasiru.vehicle_reservation_service.repository;

import com.nayanthayasiru.vehicle_reservation_service.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, String> {
    List<Reservation> findAllByNameAndEmail(String name, String email);
}
