package com.alphacode.appointment_system_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alphacode.appointment_system_api.model.Appointment;
import com.alphacode.appointment_system_api.model.Slot;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsBySlot(Slot slot);

    Optional<Slot> findByUserId(Long id);

    List<Appointment> findAllByUserId(Long id);

}
