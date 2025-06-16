package com.flexislot.services;

import com.flexislot.models.User;
import com.flexislot.payloads.AuthRequest;
import com.flexislot.payloads.AuthResponse;
import com.flexislot.repositories.UserRepository;
import com.flexislot.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");

        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            user.setUsername(user.getEmail().split("@")[0]); // auto-generate username
        }

        return userRepository.save(user);
    }


    public AuthResponse loginUser(AuthRequest request) {
        User user;
        user = userRepository.findByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getId(), user.getUsername(), user.getEmail());
    }
}
