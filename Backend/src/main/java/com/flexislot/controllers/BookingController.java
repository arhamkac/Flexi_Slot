package com.flexislot.controllers;

import com.flexislot.models.Booking;
import com.flexislot.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired private BookingService bookingService;

    @PostMapping("/book")
    @ResponseStatus(HttpStatus.CREATED)
    public Booking bookSlot(
            @RequestParam Long userId,
            @RequestParam Long slotId,
            @RequestParam String purpose) {
        return bookingService.bookSlot(userId, slotId, purpose);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    @DeleteMapping("/cancel/{bookingId}")
    public String cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return "Booking canceled successfully.";
    }
}
