package com.nayanthayasiru.vehicle_reservation_service.repository;

import com.nayanthayasiru.vehicle_reservation_service.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByName(String name);
}
