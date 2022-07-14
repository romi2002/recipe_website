import * as React from 'react'
import CloseableModal from "../Utils/CloseableModal"
import {TextField, Grid, Button, CircularProgress} from "@mui/material"

const LoginModal = ({
                        handleClose,
                        handleLogin,
                        username,
                        setUsername,
                        password,
                        setPassword
                    }) => {

    const formFilled = username !== '' && password !== ''

    return (
        <CloseableModal title="Log in" handleClose={handleClose}>
            <Grid container direction={'column'} spacing={1} alignContent={"start"}>
                <Grid item>
                    <TextField id="standard-basic" label="User Name" onChange={setUsername}/>
                </Grid>
                <Grid item>
                    <TextField id="standard-basic" label="Password" onChange={setPassword}/>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleLogin} disabled={!formFilled}>Log In</Button>
                </Grid>
            </Grid>
        </CloseableModal>
    )
}

export default LoginModal