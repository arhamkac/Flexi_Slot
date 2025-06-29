package com.flexislot.services;

import com.flexislot.models.PasswordResetToken;
import com.flexislot.models.User;
import com.flexislot.payloads.PasswordChangeRequest;
import com.flexislot.payloads.PasswordResetConfirmRequest;
import com.flexislot.payloads.PasswordResetRequest;
import com.flexislot.repositories.PasswordResetTokenRepository;
import com.flexislot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;
    
    @Value("${app.frontend.url}")
    private String frontendUrl;
    
    public boolean initiatePasswordReset(PasswordResetRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Delete any existing tokens for this user
            Optional<PasswordResetToken> existingToken = tokenRepository.findByUserEmail(user.getEmail());
            existingToken.ifPresent(tokenRepository::delete);
            
            // Create new token
            PasswordResetToken token = new PasswordResetToken();
            token.setUser(user);
            token.setToken(UUID.randomUUID().toString());
            token.setExpiryDate(LocalDateTime.now().plusHours(24));
            token.setUsed(false);
            tokenRepository.save(token);
            
            // Send password reset email
            try {
                String resetLink = frontendUrl + "/reset-password?token=" + token.getToken();
                String subject = "Password Reset Request - FlexiSLOT";
                String body = String.format(
                    "Hello %s,\n\n" +
                    "You have requested to reset your password for FlexiSLOT.\n\n" +
                    "Click the following link to reset your password:\n" +
                    "%s\n\n" +
                    "This link will expire in 24 hours.\n\n" +
                    "If you did not request this password reset, please ignore this email.\n\n" +
                    "Best regards,\nFlexiSLOT Team",
                    user.getName(),
                    resetLink
                );
                
                emailService.sendEmail(user.getEmail(), subject, body);
                return true;
            } catch (Exception e) {
                System.err.println("Failed to send password reset email: " + e.getMessage());
                // Delete the token since email failed
                tokenRepository.delete(token);
                return false;
            }
        }
        return false;
    }
    
    public boolean confirmPasswordReset(PasswordResetConfirmRequest request) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(request.getToken());
        
        if (tokenOpt.isPresent()) {
            PasswordResetToken token = tokenOpt.get();
            
            // Check if token is expired or already used
            if (token.getExpiryDate().isBefore(LocalDateTime.now()) || token.isUsed()) {
                return false;
            }
            
            // Update user password
            User user = token.getUser();
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            
            // Mark token as used
            token.setUsed(true);
            tokenRepository.save(token);
            
            // Send confirmation email
            try {
                String subject = "Password Reset Successful - FlexiSLOT";
                String body = String.format(
                    "Hello %s,\n\n" +
                    "Your password has been successfully reset for FlexiSLOT.\n\n" +
                    "If you did not perform this action, please contact support immediately.\n\n" +
                    "Best regards,\nFlexiSLOT Team",
                    user.getName()
                );
                
                emailService.sendEmail(user.getEmail(), subject, body);
            } catch (Exception e) {
                System.err.println("Failed to send password reset confirmation email: " + e.getMessage());
                // Don't fail the password reset if email fails
            }
            
            return true;
        }
        return false;
    }
    
    public boolean changePassword(String userEmail, PasswordChangeRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Verify current password
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                return false;
            }
            
            // Update password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            
            // Send confirmation email
            try {
                String subject = "Password Changed Successfully - FlexiSLOT";
                String body = String.format(
                    "Hello %s,\n\n" +
                    "Your password has been successfully changed for FlexiSLOT.\n\n" +
                    "If you did not perform this action, please contact support immediately.\n\n" +
                    "Best regards,\nFlexiSLOT Team",
                    user.getName()
                );
                
                emailService.sendEmail(user.getEmail(), subject, body);
            } catch (Exception e) {
                System.err.println("Failed to send password change confirmation email: " + e.getMessage());
                // Don't fail the password change if email fails
            }
            
            return true;
        }
        return false;
    }
    
    public String getResetToken(String email) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByUserEmail(email);
        if (tokenOpt.isPresent()) {
            PasswordResetToken token = tokenOpt.get();
            if (!token.isUsed() && token.getExpiryDate().isAfter(LocalDateTime.now())) {
                return token.getToken();
            }
        }
        return null;
    }
} 