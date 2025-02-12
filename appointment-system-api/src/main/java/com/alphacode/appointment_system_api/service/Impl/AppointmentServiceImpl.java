package com.alphacode.appointment_system_api.service.Impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.alphacode.appointment_system_api.dto.AppointmentDTO;
import com.alphacode.appointment_system_api.exception.DuplicateEntryException;
import com.alphacode.appointment_system_api.exception.UserNotAuthenticatedException;
import com.alphacode.appointment_system_api.model.Appointment;
import com.alphacode.appointment_system_api.model.Slot;
import com.alphacode.appointment_system_api.model.Status;
import com.alphacode.appointment_system_api.model.User;
import com.alphacode.appointment_system_api.repository.AppointmentRepository;
import com.alphacode.appointment_system_api.repository.SlotRepository;
import com.alphacode.appointment_system_api.repository.UserRepository;
import com.alphacode.appointment_system_api.service.AppointmentService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final SlotRepository slotRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {

        
        User user = authenticateAndGetUser();

        // Get the slot
        Slot slot = slotRepository.findSlotById(appointmentDTO.getSlot_id())
                .orElseThrow(() -> new RuntimeException("Slot not found"));
                

        // Check if the slot is available
        if (appointmentRepository.existsBySlot(slot)) {
            throw new DuplicateEntryException("Slot is already booked");
        }

        Appointment appointment = Appointment.builder()
                .slot(slot)
                .user(user)
                .name(appointmentDTO.getName())
                .contact(appointmentDTO.getContact())
                .createdAt(LocalDateTime.now())
                .build();
        appointmentRepository.save(appointment);

        slot.setStatus(Status.BOOKED);
        slotRepository.save(slot);


        return AppointmentDTO.builder()
                .id(appointment.getId())
                .name(appointment.getName())
                .contact(appointment.getContact())
                .user_email(user.getEmail())
                .date(appointment.getSlot().getDate())
                .time(slot.getEndTime()+ " - " + slot.getStartTime())
                .status(appointment.getSlot().getStatus().name())
                .message("Appointment created successfully")
                .build();
    }

    @Override
    public List<AppointmentDTO> getAppointment() {

        User user = authenticateAndGetUser();

        List<Appointment> appointments = appointmentRepository.findAllByUserId(user.getId());

        if (appointments == null || appointments.isEmpty()) {
            log.warn("No appointments found for user with ID: {}", user.getId());
            throw new RuntimeException("No appointments found for the user");
        }

        return appointments.stream()
                .map(appointment -> AppointmentDTO.builder()
                        .id(appointment.getId())
                        .name(appointment.getName())
                        .date(appointment.getSlot().getDate())
                        .time(appointment.getSlot().getStartTime() + " - " + appointment.getSlot().getEndTime())
                        .status(appointment.getSlot().getStatus().name())
                        .message("Appointments found")
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAppointment(Long id) {

        log.info("Deleting appointment with ID: {}", id);
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        log.info("Appointment found with ID: {}", id);
        Slot slot = appointment.getSlot();
        if (slot == null) {
            log.error("Slot not found for appointment with ID: {}", id);
            throw new RuntimeException("Slot not found for appointment with ID: " + id);
        }
    
        slot.setStatus(Status.AVAILABLE);
        slotRepository.save(slot);
        log.info("Slot with ID: {} updated to AVAILABLE", slot.getId());
        
        appointmentRepository.delete(appointment);
        log.info("Appointment with ID: {} deleted successfully", id);

    }

    private User authenticateAndGetUser(){

        // Get the current authentication object
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
         // Check if the user is authenticated
        if (authentication == null || !authentication.isAuthenticated()) {
            log.error("User not authenticated");
            throw new UserNotAuthenticatedException("User not authenticated");
        }

        // Get the user
        return userRepository.findByUsername(authentication.getName()).get();
    }



}
