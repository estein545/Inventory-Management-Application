import { Button, Grid, GridContainer, Modal, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";
import { ToyTable } from '../Toy Components/ToyTable';
import { useEffect, useRef, useState } from "react";
import ToyForm from "../Toy Components/ToyForm";


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
export default function Toys() {

    const modalRef = useRef(null);
    const url = "http://localhost:8080/toys";
    const [toys, setToys] = useState([]);
    const [buttonStyle, setButtonStyle] = useState(buttonStyleOne);
    const [editOrDelete, setEditOrDelete] = useState();

    useEffect(() => { 

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            returnedData.sort((a,b) => {                            // sorts the toy list alphabetically by Toy Name
                return a.toyName.localeCompare(b.toyName)
            })
            setToys(returnedData);
        })
        .catch(error => console.error(error))  

        
    }, []);

    
    function handleNewToy(newToy) {
        setToys((oldState) => {
            const newState = [...oldState, newToy]
            newState.sort((a,b) => {                            // resorts the toy list alphabetically by Toy Name
                return a.toyName.localeCompare(b.toyName)
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
                        <h1 className='text-centered'> All Toys</h1>
                    </Grid>
                    <Grid col={5}>
                        <ModalToggleButton modalRef={modalRef} opener>Create</ModalToggleButton>
                        <Button onClick = {handleEditOnClick}>Update</Button>
                        <Button onClick = {handleDeleteOnClick}>Delete</Button>
                    </Grid>
                </Grid>
                <Grid row>
                    <Grid col>
                        <ToyTable tableData={toys} 
                            buttonStyle={buttonStyle} 
                            setButtonStyle={setButtonStyle} 
                            setToys = {setToys}
                            toys = {toys} 
                            editOrDelete = {editOrDelete}>  
                        </ToyTable>
                    </Grid>
                </Grid>
            </GridContainer>

            <Modal id='create-toy-modal' ref={modalRef}>
                <ModalHeading>Add a New Toy</ModalHeading>
                <ToyForm handleNewToy={handleNewToy}></ToyForm>
            </Modal>
            { 0 === 1 ? <InventoryForm toys={toys}/> :  null}               {/* This should never be rendered but is needed to pass toys props to InventoryForm */}
        </>
    )
    
}