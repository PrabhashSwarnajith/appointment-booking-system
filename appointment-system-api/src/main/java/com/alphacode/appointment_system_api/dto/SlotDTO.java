package com.alphacode.appointment_system_api.dto;


import java.time.LocalTime;

import com.alphacode.appointment_system_api.model.Status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SlotDTO {

    private Long id;
    private LocalTime startTime;
    private LocalTime endTime;
    private Status status;
}
