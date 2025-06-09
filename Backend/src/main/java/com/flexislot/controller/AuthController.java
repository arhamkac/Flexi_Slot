package com.flexislot.controller;

import com.flexislot.entity.*;
import com.flexislot.repository.*;
import com.flexislot.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        return userService.signup(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        boolean valid = userService.validateUser(user.getEmail(), user.getPassword());
        return valid ? "Login successful" : "Invalid credentials";
    }
}