import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { toast } from "react-hot-toast";

export default function InventoryForm({handleNewInventory}) {

    const url = "http://localhost:8080/inventory"

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const newInventory = {
            id : data.get('Id'),
            warehouse: {
                id: data.get('warehouseId'),
                location : data.get('warehouseLocation'),
                maxQuantity : data.get('warehousemaxQuantity'),
                totalQuantity: data.get('warehouseQuantity')
            },
            toy: {
                id: data.get('toyId'),
                toyName: data.get('toyName')
            },
            quantity: data.get('inventoryQuantity')
        }

        fetch(url + "/new-inventory", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newInventory)
        })
        .then(data => data.json())
        .then(returnedData => {
            console.log(returnedData);
            handleNewInventory(returnedData);
            event.target.reset();
            toast.success("Inventory added!")
        })
        .catch(error => toast.error("Inventory Entry already exists or Warehouse/Toy Does not Exist!"))
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>

                <Label htmlFor="warehouse-location-input">Warehouse Location</Label>
                <TextInput id="warehouse-location-input" name="warehouseLocation" />

                <Label htmlFor="toy-toyName-input">Toy Name</Label>
                <TextInput id="toy-toyName-input" name="toyName"/>

                <Label htmlFor="inventory-Quantity-input">Quantity</Label>
                <TextInput id="inventory-Quantity-input" name="inventoryQuantity" />

                <Button type="submit" data-close-modal='true'>Create</Button>
            </Form>
        </>
    )
}