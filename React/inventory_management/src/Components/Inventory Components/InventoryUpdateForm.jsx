import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function InventoryUpdateForm({handleUpdateInventory, inventory}) {

    const url = "http://localhost:8080/inventory"

    // Get initial values from the inventory object or set them to empty strings
    const initialId = inventory?.id ?? "";
    const initialWarehouseId = inventory?.warehouse?.id ?? "";
    const initialWarehouseLocation = inventory?.warehouse?.location ?? "";
    const initialWarehouseQuantity = inventory?.warehouse?.totalQuantity ?? "";
    const initialWarehouseMaxQuantity = inventory?.warehouse?.maxQuantity ?? "";
    const initialToyId = inventory?.toy?.id ?? "";
    const initialToyName = inventory?.toy?.toyName ?? "";
    const [initialQuantity, setInitialQuantity] = useState(inventory?.quantity ?? "");

    // Update values whenever the inventory prop changes
    useEffect(() => {
        setInitialQuantity(inventory?.quantity ?? "");
    }, [inventory])

    // Function to handle form submission by sending a put request to the back end
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const updatedInventory = {
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

        fetch(url + "/update-inventory", {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updatedInventory)
        })
        .then(data => data.json())
        .then(returnedData => {
            handleUpdateInventory(returnedData);
            event.target.reset();
            toast.success("Inventory Added!");
        })
        .catch(error => toast.error("Exceeds Max Quantity of the Warehouse!"))
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>

                <TextInput id="warehouse-ID-input" name="warehouseId" defaultValue={initialWarehouseId} hidden/>
                
                <Label htmlFor="warehouse-location-input">Warehouse</Label>
                <TextInput id="warehouse-location-input" name="warehouseLocation" defaultValue={initialWarehouseLocation} readOnly/>

                <TextInput id="warehouse-Quantity-input" name="warehouseQuantity" defaultValue={initialWarehouseQuantity} readOnly hidden/>

                <TextInput id="warehouse-maxQuantity-input" name="warehousemaxQuantity" defaultValue={initialWarehouseMaxQuantity} hidden/>

                <TextInput id="inventory-Id-input" name="Id" defaultValue={initialId} readOnly hidden/>

                <TextInput id="toy-id-input" name="toyId" defaultValue={initialToyId} readOnly hidden/>

                <Label htmlFor="toy-toyName-input">Toy</Label>
                <TextInput id="toy-toyName-input" name="toyName" defaultValue={initialToyName} readOnly/>

                <Label htmlFor="inventory-Quantity-input">Quantity</Label>
                <TextInput id="inventory-Quantity-input" name="inventoryQuantity" value={initialQuantity} onChange={(event) => setInitialQuantity(event.target.value)}/>

                <Button type="submit" data-close-modal='true'>Update</Button>
            </Form>
        </>
    )
}