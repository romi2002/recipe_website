import * as React from 'react'
import CloseableModal from '../Utils/CloseableModal'
import { TextField, Grid, Button, Snackbar, Alert } from '@mui/material'
import { useState } from 'react'

const LoginModal = ({
  handleClose,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  showLoginError,
  setShowLoginError
}) => {
  const formFilled = username !== '' && password !== ''

  return (
        <CloseableModal title="Log in" handleClose={handleClose}>
            <Grid container direction={'column'} spacing={1} alignContent={'start'}>
                <Grid item>
                    <TextField id="standard-basic" label="User Name" onChange={(event) => setUsername(event.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id="standard-basic" label="Password" type="password" onChange={(event) => setPassword(event.target.value)}/>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleLogin} disabled={!formFilled}>Log In</Button>
                </Grid>
            </Grid>
            <Snackbar
                open={showLoginError}
                autoHideDuration={6000}
                onClose={() => setShowLoginError(false)}>
                <Alert severity='error'>
                    Invalid login
                </Alert>
            </Snackbar>
        </CloseableModal>
  )
}

export default LoginModal
