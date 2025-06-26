package com.flexislot.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)  // EAGER ensures it's loaded immediately
    @JoinColumn(name = "slot_type_id", nullable = false)
    private SlotType slotType;

    public String getCategory() {
        return slotType != null ? slotType.getCategory() : null;
    }

    public LocalDate getDate() {
        return slotType != null ? slotType.getDate() : null;
    }

    @Builder.Default
    @Column(nullable = false)
    private boolean booked = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}