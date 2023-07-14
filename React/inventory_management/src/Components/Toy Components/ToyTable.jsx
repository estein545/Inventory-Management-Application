import { Button, Icon, Table, ModalToggleButton, Modal, ModalHeading } from "@trussworks/react-uswds";
import { useState, useRef } from "react";
import ToyUpdateForm from "./ToyUpdateForm";
import ToyDeleteForm from "./ToyDeleteForm"


export function ToyTable({tableData, buttonStyle, setButtonStyle, setToys, toys, editOrDelete}) {
    const modalRef = useRef(null);
    const [selectedToy, setSelectedToy] = useState("");


    // function to update the Toys table after a submission to the ToyUpdateForm
    function handleUpdateToy(updatedToy) {
        setToys((oldState) => {
          const updatedState = [...oldState];
          for (const toy of oldState) {
            if (toy.id === updatedToy.id) {
              updatedState[updatedState.indexOf(toy)] = updatedToy;
            }
          }
      
          return updatedState;
        });
      }

    //Updates the toy table after a submission to the ToyDeleteForm
    function handleDeleteToy(deletedToyId) {
        setToys((oldState) => {
            return oldState.filter(toy => toy.id != deletedToyId);
        });
    }

    //Function to pass the toy prop to the Edit & Delete Buttons for auto-fill 
    function handleUpdateClick(toy) {
        setSelectedToy(toy);

    }

    return(
        <>
            <Table striped fullWidth className="big-primary-lighter">
                <thead>
                    <tr>
                        <td hidden>Toy ID</td>
                        <td>Toys</td>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((toy) => {
                        return (
                            <tr key={toy.id}>
                                <td hidden>{toy.id}</td>
                                <td>{toy.toyName}</td>
                                <td  style={buttonStyle}>
                                    {editOrDelete === "Edit" ? <ModalToggleButton className = "styledButton2" onClick={() => handleUpdateClick(toy)} modalRef={modalRef} opener>
                                        <img src="src\assets\editicon.png" width= '20px' height = '23px'></img>
                                    </ModalToggleButton> :
                                    <ModalToggleButton className = "styledButton3" onClick={() => handleUpdateClick(toy)} modalRef={modalRef} opener>
                                        <img src="src\assets\trash.png" width= '20px' height = '23px'></img>
                                    </ModalToggleButton>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {editOrDelete === "Edit" ? <Modal id='update-toy-modal' ref={modalRef}>
                <ModalHeading>Update Toy</ModalHeading>
                    <ToyUpdateForm toy = {selectedToy} handleUpdateToy={handleUpdateToy}/>
            </Modal> :
            <Modal id='update-toy-modal' ref={modalRef}>
                <ModalHeading>Are you sure you want to delete the toy, {selectedToy.toyName}, from ALL warehouses?</ModalHeading>
                    <ToyDeleteForm toy = {selectedToy} handleDeleteToy={handleDeleteToy}/>
            </Modal>}
        </>
    )
}