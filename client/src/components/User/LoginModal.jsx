import * as React from 'react'
import PropTypes from 'prop-types'
import CloseableModal from '../Utils/CloseableModal'
import { Alert, Button, Grid, Snackbar, TextField } from '@mui/material'

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
      <Grid container direction={'column'} spacing={1} alignContent={'start'} data-testid={'LoginModal'}>
        <Grid item>
          <TextField id="standard-basic"
                     label="User Name"
                     onChange={(event) => setUsername(event.target.value)}
                     data-testid={'LoginUsernameInput'}/>
        </Grid>
        <Grid item>
          <TextField id="standard-basic" label="Password" type="password" data-testid={'LoginPasswordInput'}
                     onChange={(event) => setPassword(event.target.value)}/>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleLogin} disabled={!formFilled} data-testid={'LoginModalSubmit'}>
            Log In</Button>
        </Grid>
      </Grid>
      <Snackbar
        open={showLoginError}
        autoHideDuration={6000}
        onClose={() => setShowLoginError(false)}>
        <Alert severity="error">
          Invalid login
        </Alert>
      </Snackbar>
    </CloseableModal>
  )
}

LoginModal.propTypes = {
  handleClose: PropTypes.func,
  handleLogin: PropTypes.func,
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  showLoginError: PropTypes.bool,
  setShowLoginError: PropTypes.func
}

export default LoginModal
