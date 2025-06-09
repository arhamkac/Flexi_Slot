package com.flexislot.controller;

import com.flexislot.entity.*;
import com.flexislot.repository.*;
import com.flexislot.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
