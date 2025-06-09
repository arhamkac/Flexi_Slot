package com.flexislot.service;

import com.flexislot.entity.*;
import com.flexislot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SlotService {
    @Autowired
    private SlotRepository slotRepo;

    public List<Slot> getAvailableSlots() {
        return slotRepo.findByIsBookedFalse();
    }

    public String bookSlot(Long id, User user) {
        Slot slot = slotRepo.findById(id).orElseThrow();
        if (!slot.isBooked()) {
            slot.setBooked(true);
            slot.setBookedBy(user);
            slotRepo.save(slot);
            return "Slot booked!";
        }
        return "Already booked";
    }
}