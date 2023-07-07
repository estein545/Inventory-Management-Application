package com.skillstorm.inventory.inventory_management.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventory.inventory_management.Models.Inventory;
import com.skillstorm.inventory.inventory_management.Repositories.InventoryRepository;

@Service
public class InventoryService {
    
    @Autowired
    InventoryRepository inventoryRepository;

    public List<Inventory> findAll() {
        return inventoryRepository.findAll();
    }

    public Inventory find(long id) {
        Optional<Inventory> inventory = inventoryRepository.findById(id);
        if(inventory.isPresent()) {
            return inventory.get();
        }
        return null;
        
    }

    public List<Inventory> findAllInventoryByWarehouseId(long id) {
        List<Inventory> inventory = inventoryRepository.findAllByWarehouseId(id);
        if(inventory.isEmpty()) {
            return null;
        }
        return inventory;
        
    }

    public List<Inventory> findAllInventoryByToyId(long id) {
        List<Inventory> inventory = inventoryRepository.findAllByToyId(id);
        if(inventory.isEmpty()) {
            return null;
        }
        return inventory;
        
    }

    public Inventory saveNewInventory(Inventory inventory) {
        List<Inventory> allInventory = inventoryRepository.findAll();
        for(Inventory oldInventory: allInventory) {
            if (oldInventory.getWarehouse().equals(inventory.getWarehouse()) && oldInventory.getToy().equals(inventory.getToy())) {
                return null;
            }
        }
            
        return inventoryRepository.save(inventory);
    }

    public Inventory saveInventory(Inventory inventory) {
        List<Inventory> allInventory = inventoryRepository.findAll();
        for(Inventory oldInventory: allInventory) {
            if (oldInventory.getWarehouse().equals(inventory.getWarehouse()) && oldInventory.getToy().equals(inventory.getToy())) {
                inventory.setId(oldInventory.getId());
                oldInventory = inventory;
                return oldInventory;
            }
        }
            
        return null;
    }

    public void deleteByWarehouseId(long warehouseId) {
        inventoryRepository.deleteAllByWarehouseId(warehouseId);
    }

    public void deleteByToyId(long toyId) {
        inventoryRepository.deleteAllByToyId(toyId);
    }
    
}
