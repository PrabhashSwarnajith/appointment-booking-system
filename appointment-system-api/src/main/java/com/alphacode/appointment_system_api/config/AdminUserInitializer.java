package com.alphacode.appointment_system_api.config;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.alphacode.appointment_system_api.model.Role;
import com.alphacode.appointment_system_api.model.User;
import com.alphacode.appointment_system_api.repository.UserRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class AdminUserInitializer implements CommandLineRunner {

    private UserRepository userRepository;
    private  BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        
        try{
            if(userRepository.findByUsername("Admin" ).isEmpty()){
                User admin = User.builder()
                                .username("Admin")
                                .email("admin@gmail.com")
                                .password(passwordEncoder.encode("admin"))
                                .role(Role.ADMIN)
                                .created_at(LocalDateTime.now())
                                .build();
                userRepository.save(admin);
            }
        }
        catch(Exception e){
            e.printStackTrace();
            throw new Exception("Error while initializing admin user: " + e.getMessage());
        }

    }

}
