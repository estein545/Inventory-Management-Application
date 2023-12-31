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

    @Autowired
    InventoryService inventoryService;

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
        for(Warehouse oldWarehouse: warehouses) {                               //logic to make sure the warehouse can't be added if it already exists
            if (oldWarehouse.getLocation().equals(warehouse.getLocation())) {
                return null;
            }
        }
            
        return warehouseRepository.save(warehouse);
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        for(Warehouse oldWarehouse: warehouses) {
            if (oldWarehouse.getId() == warehouse.getId() && warehouse.getTotalQuantity() <= warehouse.getMaxQuantity()) {      //checks that the warehouse doesn't exist already and also that Capacity is not set lower than current quantity
                oldWarehouse = warehouse;
                return warehouseRepository.save(oldWarehouse);
            }
        }

        return null;
    }

    public void deleteById(long id) {
        warehouseRepository.deleteById(id);

    }

    public void deleteByLocation(String location) {
        Warehouse warehouse = find(location);
        inventoryService.deleteByWarehouseId(warehouse.getId());        //calls inventory service to also delete every inventory entry associated with that warehouse
        warehouseRepository.deleteByLocation(location);

    }
}
