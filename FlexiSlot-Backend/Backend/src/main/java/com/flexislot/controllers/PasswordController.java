package com.flexislot.controllers;

import com.flexislot.payloads.PasswordChangeRequest;
import com.flexislot.payloads.PasswordResetConfirmRequest;
import com.flexislot.payloads.PasswordResetRequest;
import com.flexislot.services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody PasswordResetRequest request) {
        boolean success = passwordService.initiatePasswordReset(request);
        if (success) {
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "Password reset email sent successfully"
            ));
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to send password reset email. Please check your email configuration or try again later."
            ));
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetConfirmRequest request) {
        boolean success = passwordService.confirmPasswordReset(request);
        if (success) {
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "Password reset successfully"
            ));
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Invalid or expired token"
            ));
        }
    }

    @PostMapping("/change")
    public ResponseEntity<?> changePassword(@RequestParam String email, @RequestBody PasswordChangeRequest request) {
        boolean success = passwordService.changePassword(email, request);
        if (success) {
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "Password changed successfully"
            ));
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Invalid current password or user not found"
            ));
        }
    }

    @GetMapping("/reset-token/{email}")
    public ResponseEntity<?> getResetToken(@PathVariable String email) {
        String token = passwordService.getResetToken(email);
        if (token != null) {
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "token", token,
                "message", "Reset token retrieved successfully"
            ));
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "No valid reset token found"
            ));
        }
    }
} 