import * as React from 'react'
import {Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material"
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
        <Box>

            <TableContainer sx={{zIndex: 0}} component={Paper}>
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
                <Box sx={{display: 'flex',
                    flexDirection: 'row',
                    zIndex: 1,
                    bottom: 0,
                    right: 1,
                    justifyContent: 'end',
                    position: 'relative'}}>
                    <Fab onClick={onAddHandler} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                    <Fab onClick={onRemoveHandler} color="primary" aria-label="remove">
                        <RemoveIcon/>
                    </Fab>
                </Box>

            </TableContainer>

        </Box>

    )
}

export default EditableTable