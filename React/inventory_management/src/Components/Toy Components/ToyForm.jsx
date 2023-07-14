import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { toast } from "react-hot-toast";

export default function ToyForm({handleNewToy}) {

    const url = "http://localhost:8080/toys"

    //handles submission, creating a new toy
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const newToy = {

            toyName : data.get('toyName'),

        }

        fetch(url + "/toy", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newToy)
        })
        .then(data => data.json())
        .then(returnedData => {
            handleNewToy(returnedData);
            event.target.reset();
            toast.success("Toy created!")
        })
        .catch(error => toast.error("Toy already exists!"))
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>

                <Label htmlFor="toy-name-input">Toy Name</Label>
                <TextInput id="toy-name-input" name="toyName" />

                <Button type="submit" data-close-modal='true'>Create</Button>
            </Form>
        </>
    )
}