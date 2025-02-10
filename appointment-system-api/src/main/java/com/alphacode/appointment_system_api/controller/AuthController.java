package com.alphacode.appointment_system_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphacode.appointment_system_api.dto.AuthDTO;
import com.alphacode.appointment_system_api.dto.UserDTO;
import com.alphacode.appointment_system_api.service.AuthService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO authReqest) {
        return ResponseEntity.ok(authService.register(authReqest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDTO> login(@RequestBody UserDTO authReqest) {
        return ResponseEntity.ok(authService.login(authReqest));
    }

}
