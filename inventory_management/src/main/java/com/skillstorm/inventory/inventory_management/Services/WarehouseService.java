package com.skillstorm.inventory.inventory_management.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventory.inventory_management.Models.Warehouse;
import com.skillstorm.inventory.inventory_management.Repositories.WarehouseRepository;

@Service
public class WarehouseService {
    
    @Autowired
    WarehouseRepository warehouseRepository;

    public List<Warehouse> findAll() {
        return warehouseRepository.findAll();
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {

        return warehouseRepository.save(warehouse);
    }
}
