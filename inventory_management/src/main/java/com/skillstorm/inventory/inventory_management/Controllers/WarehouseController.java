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

    @GetMapping("/warehouse")
    public ResponseEntity<Warehouse> findWarehouse(@RequestParam(value="id") long id) {
        Warehouse warehouse = warehouseService.find(id);

        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.OK);
    }

    @GetMapping("/warehouse/{location}")
    public ResponseEntity<Warehouse> findWarehouse(@PathVariable String location) {
        Warehouse warehouse = warehouseService.find(location);

        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.OK);
    }
    
    @PostMapping("/warehouse")
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse wh) {
        Warehouse warehouse = warehouseService.saveNewWarehouse(wh);

        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.CREATED);

    }

    @PutMapping("/warehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse wh) {
        Warehouse warehouse = warehouseService.saveWarehouse(wh);

        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.CREATED);

    }

    @DeleteMapping
    public int deleteAll() {
        warehouseService.deleteAll();

        return 1;
    }

    @DeleteMapping("/warehouse/{id}")
    public int deleteById(@PathVariable long id) {
        warehouseService.deleteById(id);

        return 1;
    }

    @DeleteMapping("/warehouse/{location}")
    public int deleteByLocation(@PathVariable String location) {
        warehouseService.deleteByLocation(location);

        return 1;
    }

}
