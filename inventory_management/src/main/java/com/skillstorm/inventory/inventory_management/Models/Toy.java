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


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="toys")
public class Toy {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "toy_name")
    private String toyName;

    @JsonBackReference
    @OneToMany(targetEntity = Inventory.class, mappedBy = "toy")
    private Set<Inventory> locations;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getToyName() {
        return toyName;
    }

    public void setToyName(String toyName) {
        this.toyName = toyName;
    }

    public Set<Inventory> getLocations() {
        return locations;
    }

    public void setLocations(Set<Inventory> locations) {
        this.locations = locations;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Toy other = (Toy) obj;
        if (id != other.id)
            return false;
        if (toyName == null) {
            if (other.toyName != null)
                return false;
        } else if (!toyName.equals(other.toyName))
            return false;
        if (locations == null) {
            if (other.locations != null)
                return false;
        } else if (!locations.equals(other.locations))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((toyName == null) ? 0 : toyName.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "Toy [id=" + id + ", toyName=" + toyName + "]";
    }

    

    
}
