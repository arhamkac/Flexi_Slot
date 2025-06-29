package com.flexislot.controllers;

import com.flexislot.models.Room;
import com.flexislot.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    // Create a room
    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    // Get all rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}

