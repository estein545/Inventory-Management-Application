import { Button, Icon, Table, ModalToggleButton, Modal, ModalHeading } from "@trussworks/react-uswds";
import { useState, useRef } from "react";
import InventoryUpdateForm from "./InventoryUpdateForm";
import InventoryDeleteForm from "./InventoryDeleteForm"


export function InventoryTable({tableData, buttonStyle, setButtonStyle, setInventory, inventory, editOrDelete}) {
    const modalRef = useRef(null);
    const [selectedInventory, setSelectedInventory] = useState("");
    
    function handleUpdateInventory(updatedInventory) {
        setInventory((oldState) => {
          const updatedState = [...oldState];
          for (const inventory of oldState) {
            if (inventory.id === updatedInventory.id) {
              updatedState[updatedState.indexOf(inventory)] = updatedInventory;
            }
          }
      
          return updatedState;
        });
      }

    function handleDeleteInventory(deletedInventoryId) {
        setInventory((oldState) => {
            return oldState.filter(inventory => inventory.id != deletedInventoryId);
        });
    }

    function handleUpdateClick(inventory) {
        setSelectedInventory(inventory);

    }

    return(
        <>
            <Table striped fullWidth className="big-primary-lighter">
                <thead>
                    <tr>
                        <td>Warehouse</td>
                        <td>Toy</td>
                        <td>Quantity</td>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((inventory) => {
                        return (
                            <tr key={inventory.id}>
                                <td>{inventory.warehouse.location}</td>
                                <td>{inventory.toy.toyName}</td>
                                <td>{inventory.quantity}</td>
                                <td  style={buttonStyle}>
                                    {editOrDelete === "Edit" ? <ModalToggleButton onClick={() => handleUpdateClick(inventory)} modalRef={modalRef} opener>
                                        <img src="src\assets\editicon.png" width= '20px' height = '23px'></img>
                                    </ModalToggleButton> :
                                    <ModalToggleButton onClick={() => handleUpdateClick(inventory)} modalRef={modalRef} opener>
                                        <img src="src\assets\trash.png" width= '20px' height = '23px'></img>
                                    </ModalToggleButton>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {editOrDelete === "Edit" ? <Modal id='update-inventory-modal' ref={modalRef}>
                <ModalHeading>Edit Inventory</ModalHeading>
                    <InventoryUpdateForm inventory = {selectedInventory} handleUpdateInventory={handleUpdateInventory}/>
            </Modal> :
            <Modal id='update-inventory-modal' ref={modalRef}>
                <ModalHeading>Are you sure you want to delete all {selectedInventory?.toy?.toyName}, located in {selectedInventory?.warehouse?.location}?</ModalHeading>
                    <InventoryDeleteForm inventory = {selectedInventory} handleDeleteInventory={handleDeleteInventory}/>
            </Modal>}
        </>
    )
}