package com.skillstorm.inventory.inventory_management.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventory.inventory_management.Models.Inventory;
import com.skillstorm.inventory.inventory_management.Services.InventoryService;



@RestController
@RequestMapping("/inventory")
public class InventoryController {
    
    @Autowired
    InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<Inventory>> findAllInventory() {
        List<Inventory> inventory = inventoryService.findAll();

        return new ResponseEntity<List<Inventory>>(inventory, HttpStatus.OK);
    }

    @GetMapping("/warehouse")
    public ResponseEntity<List<Inventory>> findAllInventoryByWarehouseId(@RequestParam long id) {
        List<Inventory> inventory = inventoryService.findAllInventoryByWarehouseId(id);

        return new ResponseEntity<List<Inventory>>(inventory, HttpStatus.OK);
    }

    @GetMapping("/toy")
    public ResponseEntity<List<Inventory>> findAllInventoryByToyId(@RequestParam long id) {
        List<Inventory> inventory = inventoryService.findAllInventoryByToyId(id);

        return new ResponseEntity<List<Inventory>>(inventory, HttpStatus.OK);
    }

    @GetMapping("/inventory")
    public ResponseEntity<Inventory> findInventoryId(@RequestParam(value="id") long id) {
        Inventory inventory = inventoryService.find(id);

        return new ResponseEntity<Inventory>(inventory, HttpStatus.OK);
    }

    @PostMapping("/new-inventory")
    public ResponseEntity<Inventory> createNewInventory(@RequestBody Inventory inventory) {
        Inventory newInventory = inventoryService.saveNewInventory(inventory);

        return new ResponseEntity<Inventory>(newInventory, HttpStatus.CREATED);

    }

    @PutMapping("/update-inventory")
    public ResponseEntity<Inventory> updateInventory(@RequestBody Inventory inventory) {
        Inventory newInventory = inventoryService.saveInventory(inventory);

        return new ResponseEntity<Inventory>(newInventory, HttpStatus.CREATED);

    }

    @DeleteMapping("/delete-warehouse/{warehouseId}")
    public int deleteByWarehouseId(@PathVariable long warehouseId) {
        inventoryService.deleteByWarehouseId(warehouseId);

        return 1;
    }

    @DeleteMapping("/delete-toy/{toyId}")
    public int deleteByToyId(@PathVariable long toyId) {
        inventoryService.deleteByToyId(toyId);

        return 1;
    }

    

}
