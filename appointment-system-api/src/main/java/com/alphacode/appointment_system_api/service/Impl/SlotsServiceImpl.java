package com.alphacode.appointment_system_api.service.Impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.alphacode.appointment_system_api.dto.SlotDTO;
import com.alphacode.appointment_system_api.exception.SlotException;
import com.alphacode.appointment_system_api.model.Slot;
import com.alphacode.appointment_system_api.model.Status;
import com.alphacode.appointment_system_api.repository.SlotRepository;
import com.alphacode.appointment_system_api.service.SlotsService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class SlotsServiceImpl implements SlotsService {

    private final SlotRepository slotRepository;

    private static final LocalTime BUSINESS_START_TIME = LocalTime.of(9, 0);
    private static final LocalTime BUSINESS_END_TIME = LocalTime.of(17, 0);
    private static final int SLOT_DURATION_MINUTES = 30;

    @Override
    @Transactional
    public List<SlotDTO> getSlots(LocalDate date) {

        LocalDate today = LocalDate.now();
        if (date.isBefore(today)) {
            log.warn("Cannot generate slots for past dates: {}", date);
            throw new SlotException("No slots available for past dates");
        }

        List<Slot> slotList = slotRepository.findByDate(date);

        if (slotList.isEmpty()) {
            log.info("No slots found for date: {}. Generating slots...", date);
            generateSlotsForDate(date);
            slotList = slotRepository.findByDate(date);
        }
        
        return slotList.stream()
                .filter(slot -> slot.getStatus().equals(Status.AVAILABLE))
                .map(slot -> SlotDTO.builder() 
                    .id(slot.getId())         
                    .startTime(slot.getStartTime())
                    .endTime(slot.getEndTime())
                    .status(slot.getStatus())
                    .build())
                .collect(Collectors.toList());
    }

    

    private void generateSlotsForDate(LocalDate date) {

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        LocalTime currentTime = BUSINESS_START_TIME;

        if (date.equals(today)) {
            if (now.isAfter(BUSINESS_END_TIME)) {
                throw new SlotException("No slots available for today as business hours have ended");
            }
            currentTime = now.isAfter(BUSINESS_START_TIME) ? now : BUSINESS_START_TIME;
        } else {
            currentTime = BUSINESS_START_TIME;
        }

        while(currentTime.isBefore(BUSINESS_END_TIME)) {

            LocalTime endTimeSlot = currentTime.plusMinutes(SLOT_DURATION_MINUTES);
            
            if (date.equals(today) && endTimeSlot.isBefore(now)) {
                log.info("Skipping past slot: {} - {} for today's date", currentTime, endTimeSlot);
            } else if (!slotRepository.existsByDateAndStartTimeAndEndTime(date, currentTime, endTimeSlot)) {
                Slot slot = new Slot();
                slot.setDate(date);
                slot.setStartTime(currentTime);
                slot.setEndTime(endTimeSlot);
                slot.setStatus(Status.AVAILABLE);
                slotRepository.save(slot);
                log.info("Slot created: {} - {} for date: {}", currentTime, endTimeSlot, date);
            } else {
                log.info("Slot already exists: {} - {} for date: {}", currentTime, endTimeSlot, date);
            }
            currentTime = endTimeSlot;
        }
    }
}
