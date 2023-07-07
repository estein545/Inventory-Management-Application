package com.skillstorm.inventory.inventory_management.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventory.inventory_management.Models.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    
    public List<Inventory> findAllByWarehouseId(long id);

    public List<Inventory> findAllByToyId(long id);

    public void deleteAllByWarehouseId(long id);

    public void deleteAllByToyId(long id);
}
