package com.flexislot.controllers;

import com.flexislot.models.*;
import com.flexislot.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    @Autowired
    private ContactRepository contactRepo;

    @PostMapping
    public String saveContact(@RequestBody Contact contact) {
        contactRepo.save(contact);
        return "Message received!";
    }
}
