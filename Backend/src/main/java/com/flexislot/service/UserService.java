package com.flexislot.service;

import com.flexislot.entity.*;
import com.flexislot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder encoder;

    public String signup(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("USER");
        userRepo.save(user);
        return "Signup successful";
    }

    public boolean validateUser(String email, String password) {
        return userRepo.findByEmail(email)
                .map(user -> encoder.matches(password, user.getPassword()))
                .orElse(false);
    }
}