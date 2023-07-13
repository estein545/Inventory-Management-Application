import { Button, Icon, Table } from "@trussworks/react-uswds";
import { useState } from "react";

export function WarehouseTable({tableData}) {
    const buttonStyleOne = {
        borderWidth: 0,
        backgroundColor: 'white',
        opacity: 0,
    }
    const [buttonStyle, setButtonStyle] = useState(buttonStyleOne);
    const [warehouseButton, setWarehouseButton] = useState();



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
                                <td className = {warehouseButton} style={buttonStyle}>
                                    <button >
                                        <img src="src\assets\editicon.png" width= '20px' height = '23px'></img>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    )
}