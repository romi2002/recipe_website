import * as React from 'react';
import {Button, Box} from "@mui/material"
import Typography from "@mui/material/Typography"

const LoginButtons = () => {
    return(
        <Box sx={{display: {xs: 'flex', md:'flex'}, mr:1}}>
            <Box sx={{pr: 2}}>
                <Button variant='contained'>
                    <Typography variant="h8">
                        Log In
                    </Typography>
                </Button>
            </Box>
            <Box>
                <Button variant='contained'>Sign Up</Button>
            </Box>
        </Box>
    )
}

export default LoginButtons