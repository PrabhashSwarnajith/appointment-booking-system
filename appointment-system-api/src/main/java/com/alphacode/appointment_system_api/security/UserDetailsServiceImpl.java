package com.alphacode.appointment_system_api.security;


import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.alphacode.appointment_system_api.model.User;
import com.alphacode.appointment_system_api.model.UserPrinciple;
import com.alphacode.appointment_system_api.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService  {

    private final UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        
        UserPrinciple userPrinciple = new UserPrinciple(user.get());
        return userPrinciple;
    }

}
