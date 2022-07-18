import * as React from 'react'
import PropTypes from 'prop-types'
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
} from '@mui/material'

const EditableTable = ({
  children,
  columns,
  onAddHandler,
  onRemoveHandler,
  title = 'Editable Table',
  columnWidths
}) => {
  return (
        <Card sx={{ minWidth: 200 }}>
            <CardHeader title={title}/>
            <CardContent>
                <TableContainer sx={{ zIndex: 0 }}>
                    <Table sx={{ width: 'auto', tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((col, index) => {
                                  return (<TableCell width={columnWidths[index]} key={'editable-table-' + col + index}>{col}</TableCell>)
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {children}
                        </TableBody>
                    </Table>
                    <Grid container spacing={2} justifyContent={'start'} pt={2}>
                        <Grid item sm={6} xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                <Button onClick={onRemoveHandler} variant={'contained'}>Remove</Button>
                            </Box>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                <Button onClick={onAddHandler} variant={'contained'}>Add</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </TableContainer>
            </CardContent>
        </Card>
  )
}

EditableTable.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.array,
  onAddHandler: PropTypes.func,
  onRemoveHandler: PropTypes.func,
  title: PropTypes.string,
  columnWidths: PropTypes.string
}

export default EditableTable
