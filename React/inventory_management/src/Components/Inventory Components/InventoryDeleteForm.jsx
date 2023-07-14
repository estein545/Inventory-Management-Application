import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { toast } from "react-hot-toast";

export default function InventoryDeleteForm({handleDeleteInventory, inventory}) {

    const url = "http://localhost:8080/inventory"

    //initialize the variables to be sent to the delete request
    const initialId = inventory?.id ?? "";
    const initialWarehouseId = inventory?.warehouse?.id ?? "";
    const initialWarehouseLocation = inventory?.warehouse?.location ?? "";
    const initialWarehouseQuantity = inventory?.warehouse?.totalQuantity ?? "";
    const initialWarehouseMaxQuantity = inventory?.warehouse?.maxQuantity ?? "";
    const initialToyId = inventory?.toy?.id ?? "";
    const initialToyName = inventory?.toy?.toyName ?? "";
    const initialQuantity = inventory?.quantity ?? "";

    //handle submission by sending a delete request to the back end
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const deletedInventory = {
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

        handleDeleteInventory(deletedInventory.id)

        fetch(url + "/delete-inventory/" + data.get('Id'), {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(deletedInventory)
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

                
                <TextInput id="warehouse-ID-input" name="warehouseId" defaultValue={initialWarehouseId} hidden/>
                
                <TextInput id="warehouse-location-input" name="warehouseLocation" value={initialWarehouseLocation} onChange={(event) => setInitialLocation(event.target.value)} hidden/>

                <TextInput id="warehouse-Quantity-input" name="warehouseQuantity" defaultValue={initialWarehouseQuantity} readOnly hidden/>

                <TextInput id="warehouse-maxQuantity-input" name="warehousemaxQuantity" value={initialWarehouseMaxQuantity} onChange={(event) => setInitialMaxQuantity(event.target.value)} hidden/>

                <TextInput id="inventory-Id-input" name="Id" defaultValue={initialId} readOnly hidden/>

                <TextInput id="inventory-Quantity-input" name="inventoryQuantity" defaultValue={initialQuantity} readOnly hidden/>

                <TextInput id="toy-id-input" name="toyId" defaultValue={initialToyId} readOnly hidden/>

                <TextInput id="toy-toyName-input" name="toyName" defaultValue={initialToyName} readOnly hidden/>

                <Button type="submit" data-close-modal='true'>Yes</Button>
                <Button className = "styledButton3" onClick = {handleNoClick} data-close-modal='true'>No</Button>
            </Form>
        </>
    )
}