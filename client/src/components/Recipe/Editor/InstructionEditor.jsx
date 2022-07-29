import * as React from 'react'
import PropTypes from 'prop-types'
import EditableTable from '../../Utils/EditableTable'
import { Card, TableCell, TableRow, TextField, Typography } from '@mui/material'

const InstructionEditorCell = ({ onChange, width, instruction }) => {
  return (
    <TableCell width={width}>
      <TextField sx={{ width: '100%' }} variant="outlined" multiline onChange={onChange} value={instruction}/>
    </TableCell>
  )
}

InstructionEditorCell.propTypes = {
  onChange: PropTypes.func,
  width: PropTypes.string
}

/**
 * Basic editor for recipe instructions, allows adding and removing steps
 * @returns {JSX.Element}
 * @constructor
 */
const InstructionEditor = ({ instructions, setInstructions }) => {
  const onInstructionAdd = () => {
    const newInstructions = [...instructions]
    newInstructions.push('')
    setInstructions(newInstructions)
  }

  const onInstructionRemove = () => {
    if (instructions.length === 1) {
      setInstructions([''])
      return
    }

    const newInstructions = [...instructions]
    newInstructions.pop()
    setInstructions(newInstructions)
  }

  const columnWidths = ['10%', '90%']

  return (
    <Card>
      <EditableTable columns={['Step Number', 'Text']}
                     onAddHandler={onInstructionAdd}
                     onRemoveHandler={onInstructionRemove}
                     title={'Instruction Editor'}
                     columnWidths={columnWidths}
                     buttonLabels={['Remove Instruction Step', 'Add Instruction Step']}>
        {instructions.map((instruction, index) => {
          return (<TableRow key={'instruction-step-' + index}>
            <TableCell width={columnWidths[0]}>
              <Typography>
                {index + 1}
              </Typography>
            </TableCell>
            <InstructionEditorCell width={columnWidths[1]} onChange={(event) => {
              const newInstructions = [...instructions]
              newInstructions[index] = event.target.value
              setInstructions(newInstructions)
            }}
                                   instruction={instruction}/>
          </TableRow>)
        })}
      </EditableTable>
    </Card>
  )
}

InstructionEditor.propTypes = {
  instructions: PropTypes.array,
  setInstructions: PropTypes.func
}

export default InstructionEditor
