package com.nayanthayasiru.vehicle_reservation_service.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "customer")
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    @Column(name = "contact_number")
    private String contactNumber;
    private String username;
    private String country;
    private Role role;

    public User(String id, String name, String email, String username, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.role = role;
    }

}