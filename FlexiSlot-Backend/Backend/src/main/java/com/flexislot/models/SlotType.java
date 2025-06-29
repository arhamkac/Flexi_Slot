package com.flexislot.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder @Getter @Setter
public class SlotType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;
}
