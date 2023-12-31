package com.nayanthayasiru.vehicle_reservation_service.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "vehicle_service")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private long id;
    @Column(name = "username")
    private String name;
    private String email;
    private String phone;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String vehicle_no;
    private int mileage;
    private String message;
}
