package com.overwatch.controller;


import com.overwatch.entity.AbstractUnit;
import com.overwatch.repository.UnitRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/units")
@CrossOrigin(origins = "*")
public class UnitController {

    private final UnitRepository repository;

    public UnitController(UnitRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AbstractUnit> getAllUnits() {
        return repository.findAll();
    }

    @PostMapping("/{id}")
    public AbstractUnit getUnit(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Unit not found"));
    }
}
