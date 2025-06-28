package com.flexislot.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("bookings")
    private User user;


    @ManyToOne(optional = false)
    @JoinColumn(name = "slot_id", nullable = false)
    @JsonIgnoreProperties({"bookings", "user"})
    private Slot slot;

    @Column(nullable = false)
    private String purpose;
}
