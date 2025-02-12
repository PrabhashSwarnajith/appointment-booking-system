package com.alphacode.appointment_system_api.dto;


import java.time.LocalDate;


import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentDTO {
    private Long id;
    private Long slot_id;
    private String name;
    private String contact;
    private String user_email;
    private LocalDate date;
    private String time;
    private String status;
    private String message;
}
