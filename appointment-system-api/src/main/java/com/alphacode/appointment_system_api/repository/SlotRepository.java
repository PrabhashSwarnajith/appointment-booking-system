package com.alphacode.appointment_system_api.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alphacode.appointment_system_api.model.Slot;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {

    boolean existsByDateAndStartTimeAndEndTime(LocalDate date, LocalTime startTime, LocalTime endTime);
    
    List<Slot> findByDate(LocalDate date);

    boolean existsByDate(LocalDate date); 

    Optional<Slot> findSlotById (Long id);
}
