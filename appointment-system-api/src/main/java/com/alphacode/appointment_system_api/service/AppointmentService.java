package com.alphacode.appointment_system_api.service;

import java.util.List;

import com.alphacode.appointment_system_api.dto.AppointmentDTO;

public interface AppointmentService {
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);
    List<AppointmentDTO> getAppointment();
    void deleteAppointment(Long id);
}
