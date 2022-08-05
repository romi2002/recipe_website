import * as React from 'react'
import { useState } from 'react'
import { Box, Button } from '@mui/material'
import LoginModal from './LoginModal'
import AccountCreationModal from './AccountCreationModal'
import Auth from '../../api/auth'
import { useRecoilState } from 'recoil'
import { userDataAtom } from '../../recoil/auth/UserDataAtom'

const LoginButtons = () => {
  const [, setUserData] = useRecoilState(userDataAtom)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAccountCreationModal, setShowAccountCreationModal] = useState(false)
  const [showLoginError, setShowLoginError] = useState(false)

  const onLoginButton = () => {
    setShowLoginModal(true)
  }

  const onSignupButton = () => {
    setShowAccountCreationModal(true)
  }

  const handleLogin = () => {
    Auth.login(username, password).catch((error) => {
      setShowLoginError(true)
      console.log(error)
    }).then((token) => {
      if (token === undefined) {
        setShowLoginError(true)
        return
      }
      const newUserData = { username, token, isLoggedIn: true }
      setUserData(newUserData)
    })
  }

  const handleSignup = () => {
    Auth.createUser(username, password, { phoneNumber }).catch((error) => {
      // TODO handle errors correctly
      console.log(error.message)
    }).then(() => {
      Auth.login(username, password).then(token => {
        const newUserData = { username, token, isLoggedIn: true }
        setUserData(newUserData)
      })
    })
  }

  return (
    <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}>
      <Box sx={{ pr: 2 }}>
        <Button color="inherit" variant="text" onClick={onLoginButton} data-testid={'LoginButton'}>
          Log In
        </Button>
      </Box>
      <Box>
        <Button color="inherit" variant="text" onClick={onSignupButton} data-testid={'SignupButton'}>
          Sign Up</Button>
      </Box>
      {showLoginModal && <LoginModal
        handleClose={() => setShowLoginModal(false)}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        showLoginError={showLoginError} setShowLoginError={setShowLoginError}
        handleLogin={handleLogin}/>}
      {showAccountCreationModal && <AccountCreationModal
        handleClose={() => setShowAccountCreationModal(false)}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
        handleSignup={handleSignup}/>}
    </Box>
  )
}

export default LoginButtons
