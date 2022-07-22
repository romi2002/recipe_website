import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import UserAvatar from '../User/UserAvatar'
import LoginButtons from '../User/LoginButtons'
import { useRecoilState } from 'recoil'
import userDataAtom from '../../recoil/auth/UserDataAtom'
import SearchBar from '../Search/SearchBar'

const pages = ['Products', 'Pricing', 'Blog']

const defaultButtonGroup = () => {
  const [userData] = useRecoilState(userDataAtom)
  const isUserLoggedIn = userData.isLoggedIn

  return (<Box>
    {isUserLoggedIn ? <UserAvatar/> : <LoginButtons/>}
  </Box>)
}

const DesktopNavBar = ({ rightSideButtonGroup }) => {
  return (<Box
    sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'sans-serif',
        fontWeight: 700,
        letterSpacing: '.1rem',
        color: 'inherit',
        textDecoration: 'none'
      }}
    >
      RECIPE WEB
    </Typography>

    <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'none', md: 'flex' } }}>
      <SearchBar/>
    </Box>

    <Box>
      {rightSideButtonGroup}
    </Box>
  </Box>)
}

const MobileNavBar = ({}) => {
  return (<Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'center' }}>
    <SearchBar/>
  </Box>)
}

const Navbar = ({ rightSideButtonGroup = defaultButtonGroup() }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (<AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <DesktopNavBar rightSideButtonGroup={rightSideButtonGroup}/>
        <MobileNavBar/>
      </Toolbar>
    </Container>
  </AppBar>)
}

Navbar.propTypes = {
  rightSideButtonGroup: PropTypes.element
}

export default Navbar
