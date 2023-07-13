import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";

export default function WarehouseForm({handleNewWarehouse}) {

    const url = "http://localhost:8080/warehouses"

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const updatedWarehouse = {
            id : 
            location : data.get('warehouseLocation'),
            maxQuantity : data.get('warehousemaxQuantity'),
            totalQuantity: 0
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
            handleUpdatedWarehouse(returnedData);
            event.target.reset();
        })
        .catch(error => console.error(error))
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>

                <Label htmlFor="warehouse-ID-input">Warehouse ID</Label>
                <TextInput id="warehouse-ID-input" name="warehouseId" />

                <Label htmlFor="warehouse-location-input">Warehouse Location</Label>
                <TextInput id="warehouse-location-input" name="warehouseLocation" />

                <Label htmlFor="warehouse-Quantity-input">Warehouse Quantity</Label>
                <TextInput id="warehouse-Quantity-input" name="warehouseQuantity" value="0" disabled/>

                <Label htmlFor="warehouse-maxQuantity-input">Warehouse Capacity</Label>
                <TextInput id="warehouse-maxQuantity-input" name="warehousemaxQuantity" />

                <Button type="submit" data-close-modal='true'>Create</Button>
            </Form>
        </>
    )
}