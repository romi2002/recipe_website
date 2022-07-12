import * as React from 'react'
import EditableTable from "../../Utils/EditableTable"
import {Card, TableRow, TableCell, Typography, TextField} from "@mui/material"

const IngredientEditorCell = ({onQuantityChange, onNameChange}) => {
    return (
        <>
            <TableCell>
                <TextField variant="outlined" onChange={onQuantityChange}/>
            </TableCell>
            <TableCell>
                <TextField variant="outlined" onChange={onNameChange}/>
            </TableCell>
        </>
    )
}

const IngredientEditor = ({ingredients, setIngredients}) => {
    const onIngredientAdd = () => {
        let newIngredient = [...ingredients]
        newIngredient.push({name: '', quantity: ''})
        setIngredients(newIngredient)
    }

    const onIngredientRemove = () => {
        if (ingredients.length === 1) return

        let newIngredient = [...ingredients]
        newIngredient.pop()
        setIngredients(newIngredient)
    }

    const onRowChange = (index, key, event) => {
        let newIngredient = [...ingredients]
        newIngredient[index][key] = event.target.value
        setIngredients(newIngredient)
    }

    return (
        <Card>
            <EditableTable columns={['Quantity', 'Name']}
                           onAddHandler={onIngredientAdd}
                           onRemoveHandler={onIngredientRemove}>
                {ingredients && ingredients.map((instruction, index) => {
                    return (<TableRow key={'ingredient-' + index}>
                        <IngredientEditorCell
                            onQuantityChange={(event) => onRowChange(index, 'quantity', event)}
                            onNameChange={(event) => onRowChange(index, 'name', event)}/>
                    </TableRow>)
                })}
            </EditableTable>
        </Card>
    )
}

export default IngredientEditor