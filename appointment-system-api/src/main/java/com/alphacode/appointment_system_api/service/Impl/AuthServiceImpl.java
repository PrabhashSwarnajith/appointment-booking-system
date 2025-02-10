package com.alphacode.appointment_system_api.service.Impl;

import org.springframework.stereotype.Service;

import com.alphacode.appointment_system_api.dto.AuthDTO;
import com.alphacode.appointment_system_api.dto.UserDTO;
import com.alphacode.appointment_system_api.service.AuthService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {@Override
    public UserDTO register(UserDTO authRequest) {
        
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }

    @Override
    public AuthDTO login(UserDTO authRequest) {
        
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

}
