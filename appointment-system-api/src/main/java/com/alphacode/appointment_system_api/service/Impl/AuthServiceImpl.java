package com.alphacode.appointment_system_api.service.Impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alphacode.appointment_system_api.dto.AuthDTO;
import com.alphacode.appointment_system_api.dto.UserDTO;
import com.alphacode.appointment_system_api.exception.EmailAlreadyExistsException;
import com.alphacode.appointment_system_api.exception.InvalidCredentialsException;
import com.alphacode.appointment_system_api.exception.UsernameAlreadyExistsException;
import com.alphacode.appointment_system_api.model.Role;
import com.alphacode.appointment_system_api.model.User;
import com.alphacode.appointment_system_api.model.UserPrinciple;
import com.alphacode.appointment_system_api.repository.UserRepository;
import com.alphacode.appointment_system_api.security.JwtService;
import com.alphacode.appointment_system_api.service.AuthService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    
    @Override
    @Transactional
    public UserDTO register(UserDTO authRequest) {

        if (userRepository.existsByEmail(authRequest.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if (userRepository.existsByUsername(authRequest.getUsername())) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

        User user = User.builder()
                        .email(authRequest.getEmail())
                        .username(authRequest.getUsername())
                        .password(passwordEncoder.encode(authRequest.getPassword()))
                        .role(Role.USER)
                        .build();
        userRepository.save(user);
        log.info("User registered successfully with email: {}", user.getEmail());

        return UserDTO.builder()
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .message("User registered successfully.")
                        .build();
    }

    @Override
    public AuthDTO login(UserDTO authRequest) {

        try{
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        }catch (Exception e){
            log.warn("Authentication failed for email: {}", authRequest.getEmail());
            throw new InvalidCredentialsException("Invalid email or password.");
        }


        Optional<User> optionalUser = userRepository.findByEmail(authRequest.getEmail());
        if (optionalUser.isEmpty()) {
            log.warn("User not found for email: {}", authRequest.getEmail());
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        User user = optionalUser.get();
        UserPrinciple userPrinciple = new UserPrinciple(user);


        String token = jwtService.generateToke(userPrinciple);

        log.info("User logged in successfully with email: {}", user.getEmail());

        return AuthDTO.builder()
                    .userId(user.getId())
                    .accessToken(token)
                    .role(user.getRole())
                    .expirationTime(LocalDateTime.now().plusMinutes(30))
                    .message("User logged in successfully.")
                    .build();
    }
}
 