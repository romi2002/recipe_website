import * as React from 'react'
import {
    Card,
    CardContent,
    Grid,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CardHeader, Button, Box
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
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Button onClick={onRemoveHandler} variant={"contained"}>Remove</Button>
                            </Box>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Button onClick={onAddHandler} variant={"contained"}>Add</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default EditableTable