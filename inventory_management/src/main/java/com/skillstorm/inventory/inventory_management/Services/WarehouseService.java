package com.skillstorm.inventory.inventory_management.Services;

import java.util.List;
import java.util.Optional;

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

    public Warehouse find(long id) {
        Optional<Warehouse> warehouse = warehouseRepository.findById(id);
        if(warehouse.isPresent()) {
            return warehouse.get();
        }
        return null;
        
    }

    public Warehouse find(String location) {
        Optional<Warehouse> warehouse = warehouseRepository.findByLocation(location);
        if(warehouse.isPresent()) {
            return warehouse.get();
        }
        return null;
        
    }

    public Warehouse saveNewWarehouse(Warehouse warehouse) {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        for(Warehouse oldWarehouse: warehouses) {
            if (oldWarehouse.getLocation().equals(warehouse.getLocation())) {
                return null;
            }
        }
            
        return warehouseRepository.save(warehouse);
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        for(Warehouse oldWarehouse: warehouses) {
            if (oldWarehouse.getLocation().equals(warehouse.getLocation())) {
                warehouse.setId(oldWarehouse.getId());
                oldWarehouse = warehouse;
                return oldWarehouse;
            }
        }

        return warehouseRepository.save(warehouse);
    }

    public void deleteAll() {
        warehouseRepository.deleteAll();

    }

    public void deleteById(long id) {
        warehouseRepository.deleteById(id);

    }

    public void deleteByLocation(String location) {
        warehouseRepository.deleteByLocation(location);

    }
}
