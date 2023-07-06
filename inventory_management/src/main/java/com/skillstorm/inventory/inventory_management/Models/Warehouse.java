package com.skillstorm.inventory.inventory_management.Models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "WAREHOUSES")
public class Warehouse {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name = "location")
    private String location;

    @Column(name = "max_quantity")
    private int maxQuantity;

    @JsonBackReference
    @OneToMany(targetEntity = Inventory.class, mappedBy = "warehouse")
    private Set<Inventory> toys;

    public Warehouse() {
    }

    public Warehouse(long id, String location, int maxQuantity, Set<Inventory> toys) {
        this.id = id;
        this.location = location;
        this.maxQuantity = maxQuantity;
        this.toys = toys;
    }

    public Warehouse(String location, int maxQuantity, Set<Inventory> toys) {
        this.location = location;
        this.maxQuantity = maxQuantity;
        this.toys = toys;
    }

    public Warehouse(String location, int maxQuantity) {
        this.location = location;
        this.maxQuantity = maxQuantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getMaxQuantity() {
        return maxQuantity;
    }

    public void setMaxQuantity(int maxQuantity) {
        this.maxQuantity = maxQuantity;
    }

    public Set<Inventory> getToys() {
        return toys;
    }

    public void setToys(Set<Inventory> toys) {
        this.toys = toys;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((location == null) ? 0 : location.hashCode());
        result = prime * result + maxQuantity;
        result = prime * result + ((toys == null) ? 0 : toys.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Warehouse other = (Warehouse) obj;
        if (id != other.id)
            return false;
        if (location == null) {
            if (other.location != null)
                return false;
        } else if (!location.equals(other.location))
            return false;
        if (maxQuantity != other.maxQuantity)
            return false;
        if (toys == null) {
            if (other.toys != null)
                return false;
        } else if (!toys.equals(other.toys))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Warehouse [id=" + id + ", location=" + location + ", maxQuantity=" + maxQuantity + ", toys=" + toys
                + "]";
    }

    
}
