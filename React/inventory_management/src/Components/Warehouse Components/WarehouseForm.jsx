import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import toast, { Toaster } from "react-hot-toast";
export default function WarehouseForm({handleNewWarehouse}) {

    const url = "http://localhost:8080/warehouses"


    //handles submission, creating a new warehouse
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const newWarehouse = {
            location : data.get('warehouseLocation'),
            maxQuantity : data.get('warehousemaxQuantity'),
            totalQuantity: 0
        }

        fetch(url + "/warehouse", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newWarehouse)
        })
        .then(data => data.json())
        .then(returnedData => {
            handleNewWarehouse(returnedData);
            event.target.reset();
            toast.success("Warehouse created!")
        })
        .catch(error => toast.error("Warehouse already exists!"))
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>

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