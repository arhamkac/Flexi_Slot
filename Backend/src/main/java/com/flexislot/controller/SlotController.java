package com.flexislot.controller;

import com.flexislot.entity.*;
import com.flexislot.repository.*;
import com.flexislot.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class SlotController {
    @Autowired
    private SlotService slotService;
    @Autowired
    private UserRepository userRepo;

    @GetMapping("/available")
    public List<Slot> getAvailableSlots() {
        return slotService.getAvailableSlots();
    }

    @PostMapping("/book/{id}")
    public String bookSlot(@PathVariable Long id, @RequestParam String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return slotService.bookSlot(id, user);
    }
}