package com.overwatch.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class AbstractUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String callsign;

    @Enumerated(EnumType.STRING)
    private UnitType unitType;

    private double latitude;
    private double longitude;

    private int batteryLevel;
    private String status;

    private LocalDateTime lastUpdated;

    @PrePersist
    public void init() {
        this.lastUpdated = LocalDateTime.now();
        this.status = "ACTIVE";
    }
}
