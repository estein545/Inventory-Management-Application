package com.skillstorm.inventory.inventory_management.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventory.inventory_management.Models.Toy;
import com.skillstorm.inventory.inventory_management.Repositories.ToyRepository;

@Service
public class ToyService {

    @Autowired
    ToyRepository toyRepository;

    @Autowired
    InventoryService inventoryService;

    public List<Toy> findAll() {
        return toyRepository.findAll();
    }

    public Toy find(long id) {
        Optional<Toy> toy = toyRepository.findById(id);
        if(toy.isPresent()) {
            return toy.get();
        }
        return null;
        
    }

    public Toy find(String toyName) {
        Optional<Toy> toy = toyRepository.findByToyName(toyName);
        if(toy.isPresent()) {
            return toy.get();
        }
        return null;
        
    }

    public Toy saveNewToy(Toy toy) {
        List<Toy> toys = toyRepository.findAll();
        for(Toy oldToy: toys) {
            if (oldToy.getToyName().equals(toy.getToyName())) {
                return null;
            }
        }
            
        return toyRepository.save(toy);
    }

    public Toy saveToy(Toy toy) {
        List<Toy> toys = toyRepository.findAll();
        for(Toy oldToy: toys) {
            if (oldToy.getToyName().equals(toy.getToyName())) {
                toy.setId(oldToy.getId());
                oldToy = toy;
                return oldToy;
            }
        }

        return null;
    }

    public void deleteById(long id) {
        toyRepository.deleteById(id);

    }

    public void deleteByToyName(String toyName) {
        Toy toy = find(toyName);
        inventoryService.deleteByToyId(toy.getId());
        toyRepository.deleteByToyName(toyName);

    }

}
