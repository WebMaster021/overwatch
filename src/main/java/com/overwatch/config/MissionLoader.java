package com.overwatch.config;

import com.overwatch.entity.SentinelUnit;
import com.overwatch.entity.UnitType;
import com.overwatch.repository.UnitRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MissionLoader {

    @Bean
    CommandLineRunner initDatabase(UnitRepository repository) {
        return args -> {
            System.out.println("⚡ CHECK: MissionLoader is running...");

            if (repository.count() == 0) {

                System.out.println("⚡ ACTION: Creating new units...");

                SentinelUnit drone = new SentinelUnit();
                drone.setCallsign("REAPER-1");
                drone.setUnitType(UnitType.DRONE);
                drone.setLatitude(28.6139);
                drone.setLongitude(77.2090);
                drone.setBatteryLevel(85);

                SentinelUnit sniper = new SentinelUnit();
                sniper.setCallsign("GHOST-LEADER");
                sniper.setUnitType(UnitType.SNIPER_TEAM);
                sniper.setLatitude(28.6129);
                sniper.setLongitude(77.2295);
                sniper.setBatteryLevel(100);


                repository.save(drone);
                repository.save(sniper);

                System.out.println("✅ SUCCESS: Units saved using SentinelUnit class.");
            } else {
                System.out.println("ℹ️ INFO: Database already has units. Skipping loader.");
            }
        };
    }
}