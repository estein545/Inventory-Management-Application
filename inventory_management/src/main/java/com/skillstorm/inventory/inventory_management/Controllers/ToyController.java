package com.skillstorm.inventory.inventory_management.Controllers;

import java.util.List;

import javax.transaction.Transactional;

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

import com.skillstorm.inventory.inventory_management.Models.Toy;
import com.skillstorm.inventory.inventory_management.Services.InventoryService;
import com.skillstorm.inventory.inventory_management.Services.ToyService;

@RestController
@RequestMapping("/toys")
public class ToyController {

    @Autowired
    ToyService toyService;

    @Autowired
    InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<Toy>> findAllToys() {
        List<Toy> toys = toyService.findAll();

        return new ResponseEntity<List<Toy>>(toys, HttpStatus.OK);
    }

    @GetMapping("/toy")
    public ResponseEntity<Toy> findToy(@RequestParam(value="id") long id) {
        Toy toy = toyService.find(id);

        return new ResponseEntity<Toy>(toy, HttpStatus.OK);
    }

    @GetMapping("/toy/{toyName}")
    public ResponseEntity<Toy> findToy(@PathVariable("toyName") String toyName) {
        Toy toy = toyService.find(toyName);

        return new ResponseEntity<Toy>(toy, HttpStatus.OK);
    }
    
    @PostMapping("/toy")
    public ResponseEntity<Toy> createToy(@RequestBody Toy toy) {
        Toy newToy = toyService.saveNewToy(toy);

        return new ResponseEntity<Toy>(newToy, HttpStatus.CREATED);

    }

    @PutMapping("/toy") // NEED TO RETEST
    public ResponseEntity<Toy> updateToy(@RequestBody Toy toy) {
        Toy newToy = toyService.saveToy(toy);

        return new ResponseEntity<Toy>(newToy, HttpStatus.CREATED);

    }


    @DeleteMapping("/toy/{id}")
    @Transactional
    public int deleteById(@PathVariable long id) {
        inventoryService.deleteByToyId(id);
        toyService.deleteById(id);
        

        return 1;
    }

    @DeleteMapping("/toy")
    @Transactional
    public int deleteByToyName(@RequestParam(value="toyName") String toyName) {
        toyService.deleteByToyName(toyName);

        return 1;
    }
    
}
