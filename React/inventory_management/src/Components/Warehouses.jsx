import { Button, Grid, GridContainer, Modal, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";
import { WarehouseTable } from './WarehouseTable';
import { useEffect, useRef, useState } from "react";
import WarehouseForm from "./WarehouseForm";

export default function Warehouses() {

    const modalRef = useRef(null);
    const url = "http://localhost:8080/warehouses"
    const [warehouses, setWarehouses] = useState([]);
    const [buttonStyle, setButtonStyle] = useState();
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

    useEffect(() => { 

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            setWarehouses(returnedData);
        })
        .catch(error => console.error(error))  

        setButtonStyle(buttonStyleOne);
    }, []);

    
    function handleNewWarehouse(newWarehouse) {
        setWarehouses((oldState) => {
            return [...oldState, newWarehouse]
        })
    }


    function handleEditOnClick() {
        setEditMode(true);
        
    }

    return(
        <>
            <GridContainer>
                <Grid row>
                    <Grid col={10}>
                        <h1 className='text-centered'>Warehouses</h1>
                    </Grid>
                    <Grid col={5}>
                        <ModalToggleButton modalRef={modalRef} opener>Create</ModalToggleButton>
                        <Button onClick = {handleEditOnClick}>Update</Button>
                        <Button>Delete</Button>
                    </Grid>
                </Grid>
                <Grid row>
                    <Grid col>
                        <WarehouseTable tableData={warehouses}></WarehouseTable>
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