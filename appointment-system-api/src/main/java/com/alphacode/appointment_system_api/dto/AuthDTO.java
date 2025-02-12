package com.alphacode.appointment_system_api.dto;


import java.time.LocalDateTime;

import com.alphacode.appointment_system_api.model.Role;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthDTO {
    private Long userId;
    private Role role;
    private String accessToken;
    private LocalDateTime expirationTime;
    private String message;
}
