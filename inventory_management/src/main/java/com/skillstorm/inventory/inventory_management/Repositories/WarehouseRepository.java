package com.skillstorm.inventory.inventory_management.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventory.inventory_management.Models.Warehouse;

import java.util.Optional;


@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    
    public Optional<Warehouse> findByLocation(String location);

    public void deleteById(long id);

    public void deleteByLocation(String location);


}
