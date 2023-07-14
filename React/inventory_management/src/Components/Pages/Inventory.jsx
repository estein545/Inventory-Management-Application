import { Button, Grid, GridContainer, Modal, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";
import { InventoryTable } from '../Inventory Components/InventoryTable';
import { useEffect, useRef, useState } from "react";
import InventoryForm from "../Inventory Components/InventoryForm";


const buttonStyleOne = {
    borderWidth: 0,
    backgroundColor: 'white',
    opacity: 0,
}
const buttonStyleTwo = {
    borderWidth: 0,
    backgroundColor: 'white',
    opacity: 1,
}
export default function Inventory() {

    const modalRef = useRef(null);
    const url = "http://localhost:8080/inventory"
    const [inventory, setInventory] = useState([]);
    const [buttonStyle, setButtonStyle] = useState(buttonStyleOne);
    const [editOrDelete, setEditOrDelete] = useState();

    useEffect(() => { 

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            returnedData.sort((a,b) => {                            // sorts the inventory list alphabetically by Warehouse, then by Quantity if the Warehouses are the same
                if (a.warehouse.location.localeCompare(b.warehouse.location) === 0) {
                    return b.quantity - a.quantity;
                }
                return a.warehouse.location.localeCompare(b.warehouse.location)
            })
            setInventory(returnedData);
        })
        .catch(error => console.error(error))  

        
    }, []);

    
    function handleNewInventory(newInventory) {
        setInventory((oldState) => {
            const newState = [...oldState, newInventory]
            newState.sort((a,b) => {                            // resorts the inventory list when a new inventory entry is added
                if (a.warehouse.location.localeCompare(b.warehouse.location) === 0) {
                    return b.quantity - a.quantity;
                }
                return a.warehouse.location.localeCompare(b.warehouse.location)
            })
            return newState
        })
    }


    function handleEditOnClick() {

        if (editOrDelete === "Edit") {
            setButtonStyle((previousStyle) => {
                return previousStyle.opacity === buttonStyleOne.opacity ? buttonStyleTwo : buttonStyleOne
            });
        } else {
            setButtonStyle(() => {return buttonStyleTwo});
        }

        setEditOrDelete(() => {
            return "Edit"
        })
    }

    function handleDeleteOnClick() {
        if (editOrDelete === "Delete") {
            setButtonStyle((previousStyle) => {
                return previousStyle.opacity === buttonStyleOne.opacity ? buttonStyleTwo : buttonStyleOne
            });
        } else {
            setButtonStyle(() => {return buttonStyleTwo});
        }

        setEditOrDelete(() => {
            return "Delete"
        })
    }
    

    return(
        <>
            <GridContainer>
                <Grid row>
                    <Grid col={10}>
                        <h1 className='text-centered'>All Inventory Entries</h1>
                    </Grid>
                    <Grid col={5}>
                        <ModalToggleButton modalRef={modalRef} opener>Create</ModalToggleButton>
                        <Button onClick = {handleEditOnClick}>Update</Button>
                        <Button onClick = {handleDeleteOnClick}>Delete</Button>
                    </Grid>
                </Grid>
                <Grid row>
                    <Grid col>
                        <InventoryTable tableData={inventory} 
                            buttonStyle={buttonStyle} 
                            setButtonStyle={setButtonStyle} 
                            setInventory = {setInventory}
                            inventory = {inventory} 
                            editOrDelete = {editOrDelete}>  
                        </InventoryTable>
                    </Grid>
                </Grid>
            </GridContainer>

            <Modal id='create-inventory-modal' ref={modalRef}>
                <ModalHeading>Create a New Inventory Entry</ModalHeading>
                <InventoryForm handleNewInventory={handleNewInventory}></InventoryForm>
            </Modal>
        </>
    )
    
}