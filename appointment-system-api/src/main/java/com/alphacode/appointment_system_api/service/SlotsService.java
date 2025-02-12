package com.alphacode.appointment_system_api.service;

import java.time.LocalDate;
import java.util.List;

import com.alphacode.appointment_system_api.dto.SlotDTO;

public interface SlotsService {
    List<SlotDTO> getSlots(LocalDate date);
}
