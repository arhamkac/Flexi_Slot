package com.flexislot.services;

import com.flexislot.models.Slot;
import com.flexislot.repositories.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SlotService {
    @Autowired private SlotRepository slotRepository;

    public List<Slot> getAvailableSlots() {
        return slotRepository.findAll().stream()
                .filter(slot -> !slot.isBooked())
                .toList();
    }
}
