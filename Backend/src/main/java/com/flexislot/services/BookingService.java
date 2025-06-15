package com.flexislot.services;

import com.flexislot.models.Booking;
import com.flexislot.models.Slot;
import com.flexislot.models.User;
import com.flexislot.repositories.BookingRepository;
import com.flexislot.repositories.SlotRepository;
import com.flexislot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired private BookingRepository bookingRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SlotRepository slotRepository;

    public Booking bookSlot(Long userId, Long slotId, String purpose) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("Slot not found"));

        if (slot.isBooked()) {
            throw new IllegalStateException("Slot already booked");
        }

        slot.setBooked(true);
        slotRepository.save(slot);

        Booking booking = Booking.builder()
                .user(user)
                .slot(slot)
                .purpose(purpose)
                .build();

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return bookingRepository.findByUser(user);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Slot slot = booking.getSlot();
        slot.setBooked(false); // Free the slot
        slotRepository.save(slot);

        bookingRepository.delete(booking); // Remove the booking
    }

}
