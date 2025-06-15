package com.flexislot.controllers;

import com.flexislot.models.Slot;
import com.flexislot.models.SlotType;
import com.flexislot.models.User;
import com.flexislot.repositories.UserRepository;
import com.flexislot.services.SlotService;
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

    @GetMapping
    public List<Slot> getSlots() {
        return slotService.getSlots();
    }

    @GetMapping("/available")
    public List<Slot> getAvailableSlots(){
        return slotService.getAvailableSlots();
    }

    @PostMapping
    public Slot createSlot(@RequestBody Slot slot) {
        if (slot.getSlotType() == null || slot.getSlotType().getId() == null) {
            throw new RuntimeException("SlotType is required.");
        }

        // Get SlotType from DB to ensure it's valid
        SlotType slotType = slotService.findSlotTypeById(slot.getSlotType().getId());
        slot.setSlotType(slotType);

        // Optional: Assign user if ID present
        if (slot.getUser() != null && slot.getUser().getId() != null) {
            User user = userRepo.findById(slot.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + slot.getUser().getId()));
            slot.setUser(user);
        } else {
            slot.setUser(null);
        }

        slot.setBooked(false); // make sure default is false
        return slotService.saveSlot(slot);
    }


    @PostMapping("/book/{id}")
    public String bookSlot(@PathVariable Long id, @RequestParam String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }

        return slotService.bookSlot(id, user);
    }
}
