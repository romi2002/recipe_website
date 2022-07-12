import * as React from 'react'
import {TextField, Box, Button, Checkbox} from "@mui/material"
import CloseableModal from "../Utils/CloseableModal"


const AccountCreationModal = () => {
    //TODO add a FormGroup
    return (
        <CloseableModal title="Sign Up">
            <Box sx={{display: 'flex', flexDirection:'column'}}>
                <TextField id="standard-basic" label="User Name"/>
                <TextField id="standard-basic" label="Password"/>
                <TextField id="standard-basic" label="Confirm Password"/>
                <Checkbox label="I agree to the terms and conditions"/>
                <Button variant='contained'>Submit</Button>
            </Box>

        </CloseableModal>
    )
}

export default AccountCreationModal;