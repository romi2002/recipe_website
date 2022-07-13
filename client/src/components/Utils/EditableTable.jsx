import * as React from 'react'
import {
    Box,
    Card,
    CardContent,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CardHeader
} from "@mui/material"
import {Fab} from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const EditableTable = ({
                           children,
                           columns,
                           onAddHandler,
                           onRemoveHandler,
                           title = "Editable Table"
                       }) => {
    return (
        <Card sx={{minWidth: 200}}>
            <CardHeader title={title}/>
            <CardContent>
                <TableContainer sx={{zIndex: 0}}>
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        zIndex: 1,
                        bottom: 0,
                        right: 1,
                        justifyContent: 'end',
                        position: 'relative'
                    }}>
                        <Fab onClick={onAddHandler} color="primary" aria-label="add">
                            <AddIcon/>
                        </Fab>
                        <Fab onClick={onRemoveHandler} color="primary" aria-label="remove">
                            <RemoveIcon/>
                        </Fab>
                    </Box>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default EditableTable