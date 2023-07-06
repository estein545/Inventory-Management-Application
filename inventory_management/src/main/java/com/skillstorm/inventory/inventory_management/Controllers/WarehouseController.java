package com.skillstorm.inventory.inventory_management.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventory.inventory_management.Models.Warehouse;
import com.skillstorm.inventory.inventory_management.Services.WarehouseService;

@RestController

@RequestMapping("/warehouses")
public class WarehouseController {

    @Autowired
    WarehouseService warehouseService;

    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.findAll();

        return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }
    
    @PostMapping("/warehouse")
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse wh) {
        Warehouse warehouse = warehouseService.saveWarehouse(wh);

        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.CREATED);

    }
}
