package com.skillstorm.inventory.inventory_management.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne
    @JoinColumn(name = "toy_id")
    private Toy toy;

    @Column(name = "quantity")
    private int quantity;

    public Inventory() {
    }

    public Inventory(int id, Warehouse warehouse, Toy toy, int quantity) {
        this.id = id;
        this.warehouse = warehouse;
        this.toy = toy;
        this.quantity = quantity;
    }

    public Inventory(Warehouse warehouse, Toy toy, int quantity) {
        this.warehouse = warehouse;
        this.toy = toy;
        this.quantity = quantity;
    }

    public Inventory(Warehouse warehouse, Toy toy) {
        this.warehouse = warehouse;
        this.toy = toy;
    }

    public Inventory(int id, Warehouse warehouse, Toy toy) {
        this.id = id;
        this.warehouse = warehouse;
        this.toy = toy;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Toy getToy() {
        return toy;
    }

    public void setToy(Toy toy) {
        this.toy = toy;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((warehouse == null) ? 0 : warehouse.hashCode());
        result = prime * result + ((toy == null) ? 0 : toy.hashCode());
        result = prime * result + quantity;
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
        Inventory other = (Inventory) obj;
        if (id != other.id)
            return false;
        if (warehouse == null) {
            if (other.warehouse != null)
                return false;
        } else if (!warehouse.equals(other.warehouse))
            return false;
        if (toy == null) {
            if (other.toy != null)
                return false;
        } else if (!toy.equals(other.toy))
            return false;
        if (quantity != other.quantity)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Inventory [id=" + id + ", warehouse=" + warehouse + ", toy=" + toy + ", quantity=" + quantity + "]";
    }

    
}
