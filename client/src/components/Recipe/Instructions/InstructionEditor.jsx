import * as React from 'react'
import EditableTable from "../../Utils/EditableTable"
import {Card, TableRow, TableCell, Typography, TextField} from "@mui/material"
import {useEffect} from "react"

const InstructionEditorCell = ({onChange}) => {
    return (
        <TableCell>
            <TextField variant="outlined" multiline rows={5} onChange={onChange}/>
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

    return (
        <Card>
            <EditableTable columns={['Step Number', 'Text']}
                           onAddHandler={onInstructionAdd}
                           onRemoveHandler={onInstructionRemove}
                           title={"Instruction Editor"}>
                {instructions.map((instruction, index) => {
                    return (<TableRow key={'instruction-step-' + index}>
                        <TableCell>
                            <Typography>
                                {index + 1}
                            </Typography>
                        </TableCell>
                        <InstructionEditorCell onChange={(event) => {
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