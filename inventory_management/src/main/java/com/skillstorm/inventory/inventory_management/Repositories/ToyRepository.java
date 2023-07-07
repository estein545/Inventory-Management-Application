package com.skillstorm.inventory.inventory_management.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventory.inventory_management.Models.Toy;
import java.util.Optional;


@Repository
public interface ToyRepository extends JpaRepository<Toy, Long> {
    
    public Optional<Toy> findByToyName(String toyName);

    public void deleteById(long id);

    public void deleteByToyName(String toyName);

}
