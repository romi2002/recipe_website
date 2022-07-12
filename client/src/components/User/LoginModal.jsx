import * as React from 'react'
import CloseableModal from "../Utils/CloseableModal"
import {TextField, Box, Button} from "@mui/material"

const LoginModal = () => {
    return (
        <CloseableModal title="Log in">
            <Box sx={{display: 'flex', flexDirection:'column'}}>
                <TextField id="standard-basic" label="User Name"/>
                <TextField id="standard-basic" label="Password"/>
                <Button variant='contained'>Log In</Button>
            </Box>
        </CloseableModal>
    )
}

export default LoginModal