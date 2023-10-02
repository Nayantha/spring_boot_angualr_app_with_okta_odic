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
    @GeneratedValue
    private long id;
    @Column(name = "username")
    private String name;
    private String email;
    private LocalDate date;
    private LocalTime time;
    @Column(name = "vehicle_no")
    private String vehicleNo;
    private int mileage;
    private String message;
    private String location;
}
