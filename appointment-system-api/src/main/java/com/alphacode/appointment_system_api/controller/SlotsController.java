package com.alphacode.appointment_system_api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alphacode.appointment_system_api.dto.SlotDTO;
import com.alphacode.appointment_system_api.service.SlotsService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping ("/api")
@AllArgsConstructor
public class SlotsController {

    private final SlotsService slotsService;

    @GetMapping(value = "/slots")
    public ResponseEntity<List<SlotDTO>> getSlots(@RequestParam LocalDate date) {
        return ResponseEntity.ok(slotsService.getSlots(date));
    }

}
