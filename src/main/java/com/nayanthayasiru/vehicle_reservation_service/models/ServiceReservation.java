package com.nayanthayasiru.vehicle_reservation_service.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.LocalDate;


@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "vehicle_service")
public class ServiceReservation {

    @Id
    @GeneratedValue
    private String id;
    private String name;
    private String email;
    private String contactNumber;
    private LocalDate date;
    private SimpleDateFormat time;
}
