import * as React from 'react'
import PropTypes from 'prop-types'
import { TextField, Box, Button, Checkbox, Grid, Typography } from '@mui/material'
import CloseableModal from '../Utils/CloseableModal'
import { useState } from 'react'

const AccountCreationModal = ({
  username, setUsername,
  password, setPassword,
  handleClose, handleSignup
}) => {
  const [verificationPassword, setVerificationPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const showInvalidPasswordError = verificationPassword === '' || password === '' || password !== verificationPassword
  const formValid = !showInvalidPasswordError && acceptedTerms && username !== ''

  return (
        <CloseableModal title="Sign Up" handleClose={handleClose}>
            <Grid container spacing={1} direction={'column'} justifyContent={'center'} alignItems={'stretch'}
                  columns={1}>
                <Grid item>
                    <TextField id="standard-basic" label="User Name"
                               onChange={(event) => setUsername(event.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id="standard-basic" label="Password" type="password"
                               error={showInvalidPasswordError}
                               helperText={showInvalidPasswordError && 'Invalid password'}
                               onChange={(event) => setPassword(event.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id="standard-basic" label="Confirm Password" type="password"
                               error={showInvalidPasswordError}
                               helperText={showInvalidPasswordError && 'Invalid password'}
                               onChange={(event) => setVerificationPassword(event.target.value)}/>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography>
                            I agree to the terms and conditions
                        </Typography>
                        <Checkbox onChange={(event) => setAcceptedTerms(event.target.checked)}/>
                    </Box>
                </Grid>
                <Grid item>
                    <Button variant="contained" disabled={!formValid} onClick={handleSignup}>Submit</Button>
                </Grid>
            </Grid>
        </CloseableModal>
  )
}

AccountCreationModal.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  handleClose: PropTypes.func,
  handleSignup: PropTypes.func
}

export default AccountCreationModal
