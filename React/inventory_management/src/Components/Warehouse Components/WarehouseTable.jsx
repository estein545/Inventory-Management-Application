import { Button, Icon, Table, ModalToggleButton, Modal, ModalHeading } from "@trussworks/react-uswds";
import { useState, useRef } from "react";
import WarehouseUpdateForm from "./WarehouseUpdateForm";
import WarehouseDeleteForm from "./WarehouseDeleteForm"


export function WarehouseTable({tableData, buttonStyle, setButtonStyle, setWarehouses, warehouses, editOrDelete}) {
    const modalRef = useRef(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    
    // function to update the warehouses table after a submission to the WarehouseUpdateForm
    function handleUpdateWarehouse(updatedWarehouse) {
        setWarehouses((oldState) => {
          const updatedState = [...oldState];
          for (const warehouse of oldState) {
            if (warehouse.id === updatedWarehouse.id) {
              updatedState[updatedState.indexOf(warehouse)] = updatedWarehouse;
            }
          }
      
          return updatedState;
        });
      }
    
    //Updates the warehouse table after a submission to the WarehouseDeleteForm
    function handleDeleteWarehouse(deletedWarehouseId) {
        setWarehouses((oldState) => {
            return oldState.filter(warehouse => warehouse.id != deletedWarehouseId);
        });
    }

    //Function to pass the warehouse prop to the Edit & Delete Buttons for auto-fill 
    function handleUpdateClick(warehouse) {
        setSelectedWarehouse(warehouse);

    }

    return(
        <>
            <Table striped fullWidth className="big-primary-lighter">
                <thead>
                    <tr>
                        <td>Warehouse</td>
                        <td>Location</td>
                        <td>Current Quantity</td>
                        <td>Capacity</td>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((warehouse) => {
                        return (
                            <tr key={warehouse.id}>
                                <td>{warehouse.id}</td>
                                <td>{warehouse.location}</td>
                                <td>{warehouse.totalQuantity}</td>
                                <td>{warehouse.maxQuantity}</td>
                                <td  style={buttonStyle}>
                                    {editOrDelete === "Edit" ? <ModalToggleButton className = "styledButton2" onClick={() => handleUpdateClick(warehouse)} modalRef={modalRef} opener>
                                        <img src="src\assets\editicon.png" width= '20px' height = '23px'></img>
                                    </ModalToggleButton> :
                                    <ModalToggleButton className = "styledButton3" onClick={() => handleUpdateClick(warehouse)} modalRef={modalRef} opener>
                                        <img src="src\assets\trash.png" width= '20px' height = '23px'></img>
                                    </ModalToggleButton>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {editOrDelete === "Edit" ? <Modal id='update-warehouse-modal' ref={modalRef}>
                <ModalHeading>Update Warehouse</ModalHeading>
                    <WarehouseUpdateForm warehouse = {selectedWarehouse} handleUpdateWarehouse={handleUpdateWarehouse}/>
            </Modal> :
            <Modal id='update-warehouse-modal' ref={modalRef}>
                <ModalHeading>Are you sure you want to delete Warehouse {selectedWarehouse.id}, located in {selectedWarehouse.location}?</ModalHeading>
                    <WarehouseDeleteForm warehouse = {selectedWarehouse} handleDeleteWarehouse={handleDeleteWarehouse}/>
            </Modal>}
        </>
    )
}