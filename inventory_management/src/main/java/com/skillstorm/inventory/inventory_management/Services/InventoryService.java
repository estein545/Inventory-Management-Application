package com.skillstorm.inventory.inventory_management.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventory.inventory_management.Models.Inventory;
import com.skillstorm.inventory.inventory_management.Models.Toy;
import com.skillstorm.inventory.inventory_management.Models.Warehouse;
import com.skillstorm.inventory.inventory_management.Repositories.InventoryRepository;
import com.skillstorm.inventory.inventory_management.Repositories.ToyRepository;
import com.skillstorm.inventory.inventory_management.Repositories.WarehouseRepository;

@Service
public class InventoryService {
    
    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    ToyRepository toyRepository;

    @Autowired
    WarehouseRepository warehouseRepository;

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
        List<Warehouse> allWarehouses = warehouseRepository.findAll();
        List<Toy> allToys = toyRepository.findAll();

        for(Warehouse oldWarehouse: allWarehouses) {
            if(oldWarehouse.getLocation().equals(inventory.getWarehouse().getLocation())) {      // allows for Body Request to only have Warehouse Name and Toy Name - sets Correct Warehouse
                inventory.setWarehouse(oldWarehouse);
            }
        }

        for(Toy oldToy: allToys) {
            if(oldToy.getToyName().equals(inventory.getToy().getToyName())) {                   // allows for Body Request to only have Warehouse Name and Toy Name - sets Correct Toy
                inventory.setToy(oldToy);
            }
        }
        for(Inventory oldInventory: allInventory) {
            if (oldInventory.getWarehouse().getId() == (inventory.getWarehouse().getId()) && oldInventory.getToy().getId() == (inventory.getToy().getId())) { // check if the inventory already exists
                return null;                                                                                                        // if it does, do not create a new one
            }
        }

        int currentQuantity = 0;

        for(Inventory oldInventory: allInventory) {
            if (oldInventory.getWarehouse().getId() == (inventory.getWarehouse().getId())) {                                                    // check if they're the same warehouse
                inventory.getWarehouse().setMaxQuantity(oldInventory.getWarehouse().getMaxQuantity());
                currentQuantity += oldInventory.getQuantity();                                                                     // if they are, add it to the currentQuantity count                                                                                                 
            }
        }

        currentQuantity += inventory.getQuantity();

        if (inventory.getWarehouse().getMaxQuantity() < currentQuantity) {
            return null;                                                                                                            // if the current quantity including the new inventory exceeds the max capacity of the warehouse, do not add it
        }


        if(inventory.getWarehouse().getId() == 0 || inventory.getToy().getId() == 0) {
            return null;
        }
            
        return inventoryRepository.save(inventory);                                                                                 // if it doesn't exist, and the additional inventory doesn't surpass the warehouse's capacity, save it
    }

    public Inventory saveInventory(Inventory inventory) {
        List<Inventory> allInventory = inventoryRepository.findAll();
        Inventory updatedInventory = null;
        Inventory outdatedInventory = null;
        for(Inventory oldInventory: inventoryRepository.findAll()) {
            if (oldInventory.getWarehouse().getId() == (inventory.getWarehouse().getId()) && oldInventory.getToy().getId() == (inventory.getToy().getId())) { // check to make sure the inventory already exists
                inventory.setId(oldInventory.getId());
                updatedInventory = inventory;                                                                                       // if it does exist, create an updated version
                outdatedInventory = oldInventory;
            }
            
        }

        if(updatedInventory == null) {
            return null;                                                                                                           // if it doesn't exist, don't update it
        }

        int currentQuantity = 0;

        for(Inventory oldInventory: allInventory) {                                                                               // check that the updated version won't cause the warehouse to exceed max capacity
            if (oldInventory.getWarehouse().getId() == (inventory.getWarehouse().getId())) {                                        
                currentQuantity += oldInventory.getQuantity();                                                                                                                                                            
            }
        }

        currentQuantity = currentQuantity - outdatedInventory.getQuantity() + updatedInventory.getQuantity();                     // subtract out the old version and add in the new

        if (inventory.getWarehouse().getMaxQuantity() >= currentQuantity) {
             return inventoryRepository.save(updatedInventory);                                                                                                // if the additional inventory doesn't surpass the warehouse's capacity, update it
        }


            
        return null;                                                                                                               // if additional inventory will surpass max capacity, don't update
    }

    public void deleteByWarehouseId(long warehouseId) {
        inventoryRepository.deleteAllByWarehouseId(warehouseId);
    }

    public void deleteByToyId(long toyId) {
        inventoryRepository.deleteAllByToyId(toyId);
    }

    public void deleteById(long id) {
        inventoryRepository.deleteById(id);
    }
    
}
