package com.alphacode.appointment_system_api.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.alphacode.appointment_system_api.model.Role;
import com.alphacode.appointment_system_api.model.User;
import com.alphacode.appointment_system_api.repository.UserRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class DataLoader implements CommandLineRunner {

    private UserRepository userRepository;
    private  BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        
        try{
            if(userRepository.findByUsername("admin") == null){
                User admin =User.builder()
                                .username("admin")
                                .email("admin@gmail.com")
                                .password(passwordEncoder.encode("admin"))
                                .role(Role.ADMIN)
                                .build();
                userRepository.save(admin);
            }
        }
        catch(Exception e){
            throw new Exception("Error while loading data");
        }

    }

}
