import { Button, Grid, GridContainer, Modal, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";
import { WarehouseTable } from '../Warehouse Components/WarehouseTable';
import { useEffect, useRef, useState } from "react";
import WarehouseForm from "../Warehouse Components/WarehouseForm";
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
export default function Warehouses() {

    const modalRef = useRef(null);
    const url = "http://localhost:8080/warehouses"
    const [warehouses, setWarehouses] = useState([]);
    const [buttonStyle, setButtonStyle] = useState(buttonStyleOne);
    const [editOrDelete, setEditOrDelete] = useState();

    useEffect(() => { 

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            returnedData.sort((a,b) => {                            // sorts the warehouse list by ID number by default
                return a.id - b.id
            })
            setWarehouses(returnedData);
        })
        .catch(error => console.error(error))  

        
    }, []);

    
    function handleNewWarehouse(newWarehouse) {
        setWarehouses((oldState) => {
            return [...oldState, newWarehouse]
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
                        <h1 className='text-centered'>All Warehouses</h1>
                    </Grid>
                    <Grid col={5}>
                        <ModalToggleButton modalRef={modalRef} opener>Create</ModalToggleButton>
                        <Button onClick = {handleEditOnClick}>Update</Button>
                        <Button onClick = {handleDeleteOnClick}>Delete</Button>
                    </Grid>
                </Grid>
                <Grid row>
                    <Grid col>
                        <WarehouseTable tableData={warehouses} 
                            buttonStyle={buttonStyle} 
                            setButtonStyle={setButtonStyle} 
                            setWarehouses = {setWarehouses}
                            warehouses = {warehouses} 
                            editOrDelete = {editOrDelete}>  
                        </WarehouseTable>
                    </Grid>
                </Grid>
            </GridContainer>

            <Modal id='create-warehouse-modal' ref={modalRef}>
                <ModalHeading>Create a New Warehouse</ModalHeading>
                <WarehouseForm handleNewWarehouse={handleNewWarehouse}></WarehouseForm>
            </Modal> 
            
        </>
    )
    
}