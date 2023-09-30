package com.nayanthayasiru.vehicle_reservation_service.repository;

import com.nayanthayasiru.vehicle_reservation_service.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByNameAndEmail(String name, String email);

    @Query("""
            SELECT r
            FROM vehicle_reservation r
            WHERE r.name = ?1 and r.email = ?2 and r.date >= ?3
            """)
    List<Reservation> findAllByNameAndEmailFromToday(String name, String email, Date Today);
}
