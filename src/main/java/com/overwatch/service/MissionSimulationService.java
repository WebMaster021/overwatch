package com.overwatch.service;

import com.overwatch.entity.AbstractUnit;
import com.overwatch.entity.SentinelUnit;
import com.overwatch.repository.UnitRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class MissionSimulationService {
    private final UnitRepository repository;
    private final Random random = new Random();

    public MissionSimulationService(UnitRepository repository) {
        this.repository = repository;
    }

    @Scheduled(fixedRate = 2000)
    public void updateUnitPosition() {
        List<AbstractUnit> units = repository.findAll();

        if (units.isEmpty()) return;

        System.out.println("⚡ SIMULATION: Updating " + units.size() + " units...");

        for (AbstractUnit unit : units) {
            double moveLat = (random.nextDouble() - 0.5) * 0.001;
            double moveLon = (random.nextDouble() - 0.5) * 0.001;

            unit.setLatitude(unit.getLatitude() + moveLat);
            unit.setLongitude(unit.getLongitude() + moveLon);

            if (unit.getBatteryLevel() > 0) {
                unit.setBatteryLevel(unit.getBatteryLevel() - 1);
            } else {
                System.out.println("\uD83D\uDD0B RECHARGING UNIT: " + unit.getCallsign());
                unit.setBatteryLevel(100);
            }

            repository.save(unit);
        }
    }
}
