import * as React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4
}

const CloseableModal = ({ title, children, handleClose }) => {
  return (
        <Modal open={true}>
            <Box sx={style}>
                <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between', alignContent: 'center', pb: 2 }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Button onClick={handleClose}>
                        <CloseIcon/>
                    </Button>
                </Box>
                {children}
            </Box>
        </Modal>
  )
}

export default CloseableModal
