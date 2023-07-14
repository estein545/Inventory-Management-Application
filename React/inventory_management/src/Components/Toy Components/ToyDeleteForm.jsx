import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { toast } from "react-hot-toast";


export default function ToyDeleteForm({handleDeleteToy, toy}) {

    const url = "http://localhost:8080/toys"
    
    const initialId = toy?.id ?? "";
    const initialName = toy?.toyName ?? "";

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const deletedToy = {
            id : data.get('toyId'),
            toyName : data.get('toyName'),
        }
        
        handleDeleteToy(deletedToy.id)

        fetch(url + "/toy/" + data.get('toyId'), {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(deletedToy)
        })
        .then(data => data.json())
        .then( () => {
            event.target.reset();
            toast.success("Toy Deleted!");
        })
        .catch(error => console.error(error))
    }

    function handleNoClick(event) {
        event.preventDefault();                         // Prevent the form submission upon clicking "No"
      }

    return(
        <>
            <Form onSubmit={handleSubmit}>

                
                <TextInput id="toy-ID-input" name="toyId" defaultValue={initialId} hidden/>
                
                <TextInput id="toy-toyName-input" name="toyName" value={initialName} onChange={(event) => setInitialName(event.target.value)} hidden/>

                <Button type="submit" data-close-modal='true'>Yes</Button>
                <Button onClick = {handleNoClick} data-close-modal='true'>No</Button>
            </Form>
        </>
    )
}