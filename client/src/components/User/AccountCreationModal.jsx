import * as React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Checkbox, Grid, TextField, Typography } from '@mui/material'
import CloseableModal from '../Utils/CloseableModal'
import { isValidPhoneNumber, MuiTelInput } from 'mui-tel-input'

const AccountCreationModal = ({
  username, setUsername, password, setPassword, phoneNumber, setPhoneNumber, handleClose, handleSignup
}) => {
  const [verificationPassword, setVerificationPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isValidPhone, setIsValidPhone] = useState(false)

  const passwordLengthValid = password.length >= 5
  const showInvalidPasswordError = verificationPassword.length >= password.length && password !== verificationPassword
  const formValid = !showInvalidPasswordError && acceptedTerms && username !== '' && isValidPhone && passwordLengthValid

  return (<CloseableModal title="Sign Up" handleClose={handleClose}>
    <Grid container spacing={2} direction={'column'} justifyContent={'center'} alignItems={'stretch'}
          columns={1}>
      <Grid item>
        <TextField id="standard-basic" label="User Name"
                   onChange={(event) => setUsername(event.target.value)}/>
      </Grid>
      <Grid item>
        <TextField id="standard-basic" label="Password" type="password"
                   helperText={!passwordLengthValid && 'Password must be at least 5 characters'}
                   onChange={(event) => setPassword(event.target.value)}/>
      </Grid>
      <Grid item>
        <TextField id="standard-basic" label="Confirm Password" type="password"
                   error={showInvalidPasswordError}
                   helperText={showInvalidPasswordError && 'Invalid password'}
                   onChange={(event) => setVerificationPassword(event.target.value)}/>
      </Grid>
      <Grid item>
        <MuiTelInput
          value={phoneNumber}
          onlyCountries={['US']}
          label={'Phone number'}
          onChange={(value, info) => {
            setPhoneNumber(value)
            setIsValidPhone(isValidPhoneNumber(value))
          }}
          disableDropdown={false}
          forceCallingCode={true}/>
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
  </CloseableModal>)
}

AccountCreationModal.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  handleClose: PropTypes.func,
  handleSignup: PropTypes.func,
  phoneNumber: PropTypes.string,
  setPhoneNumber: PropTypes.func
}

export default AccountCreationModal
