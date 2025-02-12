package com.alphacode.appointment_system_api.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "slots")
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false )
    private LocalTime endTime;

    @Column(nullable = false)
    private Status status;


    public String getFormattedStartTime() {
        return startTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    // Custom getter for formatted endTime
    public String getFormattedEndTime() {
        return endTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
