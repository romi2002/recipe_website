import * as React from 'react'
import EditableTable from "../../Utils/EditableTable"
import {Card, TableRow, TableCell, Typography, TextField} from "@mui/material"

const InstructionEditorCell = ({onChange, width}) => {
    return (
        <TableCell width={width}>
            <TextField sx={{width: '100%'}} variant="outlined" multiline onChange={onChange}/>
        </TableCell>
    )
}

/**
 * Basic editor for recipe instructions, allows adding and removing steps
 * @returns {JSX.Element}
 * @constructor
 */
const InstructionEditor = ({instructions, setInstructions}) => {
    const onInstructionAdd = () => {
        let newInstructions = [...instructions]
        newInstructions.push('')
        setInstructions(newInstructions)
    }

    const onInstructionRemove = () => {
        if (instructions.length === 1) return

        let newInstructions = [...instructions]
        newInstructions.pop()
        setInstructions(newInstructions)
    }

    const columnWidths = ['10%', '90%']

    return (
        <Card>
            <EditableTable columns={['Step Number', 'Text']}
                           onAddHandler={onInstructionAdd}
                           onRemoveHandler={onInstructionRemove}
                           title={"Instruction Editor"} columnWidths={columnWidths}>
                {instructions.map((instruction, index) => {
                    return (<TableRow key={'instruction-step-' + index}>
                        <TableCell width={columnWidths[0]}>
                            <Typography>
                                {index + 1}
                            </Typography>
                        </TableCell>
                        <InstructionEditorCell width={columnWidths[1]} onChange={(event) => {
                            let newInstructions = [...instructions]
                            newInstructions[index] = event.target.value
                            setInstructions(newInstructions)
                        }}/>
                    </TableRow>)
                })}
            </EditableTable>
        </Card>
    )
}

export default InstructionEditor