package com.nayanthayasiru.vehicle_reservation_service.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String contactNumber;
    private String username;
    private String country;
}