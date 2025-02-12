package com.alphacode.appointment_system_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alphacode.appointment_system_api.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
}
