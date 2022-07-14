import * as React from 'react'
import {Button, Box} from "@mui/material"
import Typography from "@mui/material/Typography"
import LoginModal from "./LoginModal"
import {useState} from "react"
import AccountCreationModal from "./AccountCreationModal"

const LoginButtons = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showAccountCreationModal, setShowAccountCreationModal] = useState(false)

    const onLoginButton = () => {
        setShowLoginModal(true)
    }

    const onSignupButton = () => {
        setShowAccountCreationModal(true)
    }

    const handleLogin = () => {
        console.log("Logging in")
    }

    const handleSignup = () => {

    }

    return (
        <Box sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}>
            <Box sx={{pr: 2}}>
                <Button variant="contained" onClick={onLoginButton}>
                    <Typography variant="h8">
                        Log In
                    </Typography>
                </Button>
            </Box>
            <Box>
                <Button variant="contained" onClick={onSignupButton}>Sign Up</Button>
            </Box>
            {showLoginModal && <LoginModal
                handleClose={() => setShowLoginModal(false)}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                handleLogin={handleLogin}/>}
            {showAccountCreationModal && <AccountCreationModal
                handleClose={() => setShowAccountCreationModal(false)}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                handleSignup={handleSignup}/>}
        </Box>
    )
}

export default LoginButtons