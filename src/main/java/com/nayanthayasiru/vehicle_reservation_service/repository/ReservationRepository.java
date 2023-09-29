package com.nayanthayasiru.vehicle_reservation_service.repository;

import com.nayanthayasiru.vehicle_reservation_service.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByNameAndEmail(String name, String email);

    @Query("""
            SELECT *
            FROM vehicle_reservation r
            WHERE r.name =:name and r.email =:email and r.date >=:date
            """)
    List<Reservation> findAllByNameAndEmailFromToday(@Param("name") String name, @Param("email") String email, @Param("date") LocalDate Today);
}
