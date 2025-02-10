package com.alphacode.appointment_system_api.service;

import com.alphacode.appointment_system_api.dto.AuthDTO;
import com.alphacode.appointment_system_api.dto.UserDTO;

public interface AuthService {

    UserDTO register(UserDTO authRequest);
    AuthDTO login(UserDTO authRequest);

}
