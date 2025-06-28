package com.flexislot.controllers;

import com.flexislot.models.Room;
import com.flexislot.models.Slot;
import com.flexislot.models.SlotType;
import com.flexislot.repositories.RoomRepository;
import com.flexislot.repositories.SlotRepository;
import com.flexislot.repositories.SlotTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slot-types")
public class SlotTypeController {

    @Autowired
    private SlotTypeRepository slotTypeRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private SlotRepository slotRepository;

    @PostMapping
    public SlotType createSlotType(@RequestBody SlotType slotType) {
        Long roomId = slotType.getRoom().getId();
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + roomId));

        SlotType savedSlotType = slotTypeRepository.save(slotType);

        // Now create and save the slot with the saved slotType
        Slot slot = new Slot();
        slot.setSlotType(savedSlotType);
        slot.setBooked(false);
        slotRepository.save(slot);

        return savedSlotType;
    }


    @GetMapping
    public List<SlotType> getAllSlotTypes() {
        return slotTypeRepository.findAll();
    }
}

