package com.overwatch.repository;

import com.overwatch.entity.AbstractUnit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository extends JpaRepository<AbstractUnit, Long> {

}
