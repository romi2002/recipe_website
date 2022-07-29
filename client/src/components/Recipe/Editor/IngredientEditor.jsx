import * as React from 'react'
import PropTypes from 'prop-types'
import EditableTable from '../../Utils/EditableTable'
import { Card, TableCell, TableRow, TextField } from '@mui/material'

const IngredientEditorCell = ({ onQuantityChange, onNameChange, columnWidths, ingredient }) => {
  return (
    <>
      <TableCell width={columnWidths[0]}>
        <TextField variant="outlined" onChange={onQuantityChange} value={ingredient.quantity}/>
      </TableCell>
      <TableCell width={columnWidths[1]}>
        <TextField variant="outlined" sx={{ width: '100%' }} onChange={onNameChange} value={ingredient.name}/>
      </TableCell>
    </>
  )
}

IngredientEditorCell.propTypes = {
  onQuantityChange: PropTypes.func,
  onNameChange: PropTypes.func,
  columnWidths: PropTypes.string
}

const IngredientEditor = ({ ingredients, setIngredients }) => {
  const onIngredientAdd = () => {
    const newIngredient = [...ingredients]
    newIngredient.push({ name: '', quantity: '' })
    setIngredients(newIngredient)
  }

  const onIngredientRemove = () => {
    if (ingredients.length === 1) {
      // Clear ingredients
      setIngredients([{ name: '', quantity: '' }])
      return
    }

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
                     title={'Ingredient Editor'}
                     columnWidths={columnWidths}
                     buttonLabels={['Remove Ingredient', 'Add Ingredient']}>
        {ingredients && ingredients.map((ingredient, index) => {
          return (<TableRow key={'ingredient-' + index}>
            <IngredientEditorCell
              columnWidths={columnWidths}
              onQuantityChange={(event) => onRowChange(index, 'quantity', event)}
              onNameChange={(event) => onRowChange(index, 'name', event)}
              ingredient={ingredient}/>
          </TableRow>)
        })}
      </EditableTable>
    </Card>
  )
}

IngredientEditor.propTypes = {
  ingredients: PropTypes.array,
  setIngredients: PropTypes.func
}

export default IngredientEditor
