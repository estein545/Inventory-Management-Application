package com.skillstorm.inventory.inventory_management.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventory.inventory_management.Models.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    
}
