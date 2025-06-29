package com.flexislot.controllers;

import com.flexislot.models.*;
import com.flexislot.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {
    @Autowired
    private ContactRepository contactRepo;

    @PostMapping
    public ResponseEntity<Map<String, Object>> saveContact(@RequestBody Contact contact) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate required fields
            if (contact.getName() == null || contact.getName().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Name is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (contact.getEmail() == null || contact.getEmail().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Email is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (contact.getMessage() == null || contact.getMessage().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Message is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Save the contact
            contactRepo.save(contact);
            
            response.put("success", true);
            response.put("message", "Message received successfully!");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to save message. Please try again.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
