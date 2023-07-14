import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { toast } from "react-hot-toast";

export default function WarehouseDeleteForm({handleDeleteWarehouse, warehouse}) {

    const url = "http://localhost:8080/warehouses"

    //initialize the variables to be sent to the delete request
    const initialId = warehouse?.id ?? "";
    const initialLocation = warehouse?.location ?? "";
    const initialQuantity = warehouse?.totalQuantity ?? "";
    const initialMaxQuantity = warehouse?.maxQuantity ?? "";

    //handle submission by sending a delete request to the back end
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const deletedWarehouse = {
            id : data.get('warehouseId'),
            location : data.get('warehouseLocation'),
            maxQuantity : data.get('warehousemaxQuantity'),
            totalQuantity: data.get('warehouseQuantity')
        }

        handleDeleteWarehouse(deletedWarehouse.id)

        fetch(url + "/warehouse/" + data.get('warehouseId'), {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(deletedWarehouse)
        })
        .then(data => data.json())
        .then( () => {
            event.target.reset();
            toast.success("Warehouse Deleted!");
        })
        .catch(error => console.error(error))
    }

    function handleNoClick(event) {
        event.preventDefault();                         // Prevent the form submission upon clicking "No"
      }

    return(
        <>
            <Form onSubmit={handleSubmit}>

                
                <TextInput id="warehouse-ID-input" name="warehouseId" defaultValue={initialId} hidden/>
                
                <TextInput id="warehouse-location-input" name="warehouseLocation" value={initialLocation} onChange={(event) => setInitialLocation(event.target.value)} hidden/>

                <TextInput id="warehouse-Quantity-input" name="warehouseQuantity" defaultValue={initialQuantity} readOnly hidden/>

                <TextInput id="warehouse-maxQuantity-input" name="warehousemaxQuantity" value={initialMaxQuantity} onChange={(event) => setInitialMaxQuantity(event.target.value)} hidden/>

                <Button type="submit" data-close-modal='true'>Yes</Button>
                <Button className = "styledButton3" onClick = {handleNoClick} data-close-modal='true'>No</Button>
            </Form>
        </>
    )
}