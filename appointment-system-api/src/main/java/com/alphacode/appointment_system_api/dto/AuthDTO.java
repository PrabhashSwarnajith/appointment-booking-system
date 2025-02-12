package com.alphacode.appointment_system_api.dto;


import java.time.LocalDateTime;

import com.alphacode.appointment_system_api.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthDTO {
    private Long userId;
    private Role role;
    private String accessToken;
    private LocalDateTime expirationTime;
    private String message;
}
