import * as React from 'react'
import {Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material"
import {Fab} from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const EditableTable = ({
                           children,
                           columns,
                           onAddHandler,
                           onRemoveHandler
                       }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col, index) => {
                            return (<TableCell key={'editable-table-' + col + index}>{col}</TableCell>)
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
            <Fab onClick={onAddHandler} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>
            <Fab onClick={onRemoveHandler} color="primary" aria-label="remove">
                <RemoveIcon/>
            </Fab>
        </TableContainer>
    )
}

export default EditableTable