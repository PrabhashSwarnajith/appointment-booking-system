package com.alphacode.appointment_system_api.service;

import com.alphacode.appointment_system_api.dto.AppointmentDTO;

public interface AppointmentService {
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);
    AppointmentDTO getAppointment();
    void deleteAppointment(Long id);
}
