import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";


export default function ToyUpdateForm({handleUpdateToy, toy}) {

    const url = "http://localhost:8080/toys"

    // Get initial values from the toy object or set them to empty strings
    const [initialName, setInitialName] = useState(toy?.toyName ?? "");
    const initialId = toy?.id ?? "";

    // Update values whenever the toy prop changes
    useEffect(() => {
        setInitialName(toy?.toyName ?? "")
    }, [toy])
    
    // Function to handle form submission by sending a put request to the back end
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const updatedToy = {
            id : data.get('toyId'),
            toyName : data.get('toyName'),
        }

        fetch(url + "/toy", {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updatedToy)
        })
        .then(data => data.json())
        .then(returnedData => {
            handleUpdateToy(returnedData);
            event.target.reset();
            toast.success("Toy Updated!");
        })
        .catch(error => toast.error("Update Failed!"))
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>

                <Label htmlFor="toy-ID-input">Toy ID</Label>
                <TextInput id="toy-ID-input" name="toyId" defaultValue={initialId} readOnly/>

                <Label htmlFor="toy-name-input">Toy Name</Label>
                <TextInput id="toy-name-input" name="toyName" value={initialName} onChange={(event) => setInitialName(event.target.value)}/>

                <Button type="submit" data-close-modal='true'>Update</Button>
            </Form>
        </>
    )
}