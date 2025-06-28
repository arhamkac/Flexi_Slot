package com.flexislot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendPasswordResetEmail(String to, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request - FlexiSlot");
        message.setText(
            "Hello,\n\n" +
            "You have requested to reset your password for your FlexiSlot account.\n\n" +
            "Your password reset token is: " + resetToken + "\n\n" +
            "This token will expire in 24 hours.\n\n" +
            "If you did not request this password reset, please ignore this email.\n\n" +
            "Best regards,\n" +
            "FlexiSlot Team"
        );
        
        mailSender.send(message);
    }
    
    public void sendPasswordChangeConfirmation(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Changed Successfully - FlexiSlot");
        message.setText(
            "Hello,\n\n" +
            "Your password has been successfully changed for your FlexiSlot account.\n\n" +
            "If you did not make this change, please contact our support team immediately.\n\n" +
            "Best regards,\n" +
            "FlexiSlot Team"
        );
        
        mailSender.send(message);
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
} 