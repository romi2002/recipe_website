import * as React from 'react'
import EditableTable from '../../Utils/EditableTable'
import { Card, TableRow, TableCell, Typography, TextField } from '@mui/material'

const IngredientEditorCell = ({ onQuantityChange, onNameChange, columnWidths }) => {
  return (
        <>
            <TableCell width={columnWidths[0]}>
                <TextField variant="outlined" onChange={onQuantityChange}/>
            </TableCell>
            <TableCell width={columnWidths[1]}>
                <TextField variant="outlined" sx={{ width: '100%' }} onChange={onNameChange}/>
            </TableCell>
        </>
  )
}

const IngredientEditor = ({ ingredients, setIngredients }) => {
  const onIngredientAdd = () => {
    const newIngredient = [...ingredients]
    newIngredient.push({ name: '', quantity: '' })
    setIngredients(newIngredient)
  }

  const onIngredientRemove = () => {
    if (ingredients.length === 1) return

    const newIngredient = [...ingredients]
    newIngredient.pop()
    setIngredients(newIngredient)
  }

  const onRowChange = (index, key, event) => {
    const newIngredient = [...ingredients]
    newIngredient[index][key] = event.target.value
    setIngredients(newIngredient)
  }

  const columnWidths = ['10%', '90%']

  return (
        <Card>
            <EditableTable columns={['Quantity', 'Name']}
                           onAddHandler={onIngredientAdd}
                           onRemoveHandler={onIngredientRemove}
                           title={'Ingredient Editor'} columnWidths={columnWidths}>
                {ingredients && ingredients.map((instruction, index) => {
                  return (<TableRow key={'ingredient-' + index}>
                        <IngredientEditorCell
                            columnWidths={columnWidths}
                            onQuantityChange={(event) => onRowChange(index, 'quantity', event)}
                            onNameChange={(event) => onRowChange(index, 'name', event)}/>
                    </TableRow>)
                })}
            </EditableTable>
        </Card>
  )
}

export default IngredientEditor
