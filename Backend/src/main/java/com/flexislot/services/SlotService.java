package com.flexislot.services;

import com.flexislot.models.Slot;
import com.flexislot.models.SlotType;
import com.flexislot.models.User;
import com.flexislot.repositories.SlotRepository;
import com.flexislot.repositories.SlotTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private SlotTypeRepository slotTypeRepository;

    public List<Slot> getSlots() {
        return slotRepository.findAll();
    }

    public List<Slot> getAvailableSlots(){
        return slotRepository.findAll().stream()
                .filter(slot -> !slot.isBooked())
                .toList();
    }

    public SlotType findSlotTypeById(Long id) {
        return slotTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SlotType not found with ID: " + id));
    }

    public Slot saveSlot(Slot slot) {
        return slotRepository.save(slot);
    }

    public String bookSlot(Long slotId, User user) {
        Optional<Slot> optionalSlot = slotRepository.findById(slotId);
        if (optionalSlot.isEmpty()) {
            return "Slot not found!";
        }

        Slot slot = optionalSlot.get();
        if (slot.isBooked()) {
            return "Slot already booked!";
        }

        slot.setBooked(true);
        slot.setUser(user);
        slotRepository.save(slot);

        return "Slot booked successfully for " + user.getName();
    }
}
