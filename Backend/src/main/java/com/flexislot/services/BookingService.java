package com.flexislot.services;

import com.flexislot.models.*;
import com.flexislot.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired private BookingRepository bookingRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SlotRepository slotRepository;

    public Booking bookSlot(Long userId, Long slotId, String purpose) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Slot> slot = slotRepository.findById(slotId);
        if (user.isEmpty() || slot.isEmpty()) {
            throw new RuntimeException("User or Slot not found");
        }

        Slot selectedSlot = slot.get();
        if (selectedSlot.isBooked()) {
            throw new RuntimeException("Slot already booked");
        }

        selectedSlot.setBooked(true);
        slotRepository.save(selectedSlot);

        Booking booking = Booking.builder()
                .user(user.get())
                .slot(selectedSlot)
                .purpose(purpose)
                .build();

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByUser(user);
    }
}
