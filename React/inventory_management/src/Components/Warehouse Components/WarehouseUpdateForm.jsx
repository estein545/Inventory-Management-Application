import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

export default function WarehouseUpdateForm({handleUpdateWarehouse, warehouse}) {

    const url = "http://localhost:8080/warehouses"

    const initialId = warehouse?.id ?? "";
    const [initialLocation, setInitialLocation] = useState(warehouse?.location ?? "");
    const initialQuantity = warehouse?.totalQuantity ?? "";
    const [initialMaxQuantity, setInitialMaxQuantity] = useState(warehouse?.maxQuantity ?? "");

    useEffect(() => {
        setInitialLocation(warehouse?.location ?? "");
        setInitialMaxQuantity(warehouse?.maxQuantity ?? "");
    }, [warehouse])

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const updatedWarehouse = {
            id : data.get('warehouseId'),
            location : data.get('warehouseLocation'),
            maxQuantity : data.get('warehousemaxQuantity'),
            totalQuantity: data.get('warehouseQuantity')
        }

        fetch(url + "/warehouse", {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updatedWarehouse)
        })
        .then(data => data.json())
        .then(returnedData => {
            handleUpdateWarehouse(returnedData);
            event.target.reset();
            toast.success("Warehouse Updated!");
        })
        .catch(error => toast.error("Update Failed!"))
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>

                <Label htmlFor="warehouse-ID-input">Warehouse ID</Label>
                <TextInput id="warehouse-ID-input" name="warehouseId" defaultValue={initialId} readOnly/>

                <Label htmlFor="warehouse-location-input">Warehouse Location</Label>
                <TextInput id="warehouse-location-input" name="warehouseLocation" value={initialLocation} onChange={(event) => setInitialLocation(event.target.value)}/>

                <Label htmlFor="warehouse-Quantity-input">Warehouse Quantity</Label>
                <TextInput id="warehouse-Quantity-input" name="warehouseQuantity" defaultValue={initialQuantity} readOnly/>

                <Label htmlFor="warehouse-maxQuantity-input">Warehouse Capacity</Label>
                <TextInput id="warehouse-maxQuantity-input" name="warehousemaxQuantity" value={initialMaxQuantity} onChange={(event) => setInitialMaxQuantity(event.target.value)}/>

                <Button type="submit" data-close-modal='true'>Update</Button>
            </Form>
        </>
    )
}