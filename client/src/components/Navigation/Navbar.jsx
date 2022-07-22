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
import { Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Link } from 'react-router-dom'

const LoggedInButtons = () => {
  return (<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button edge="start" color="inherit" variant="outlined" sx={{ mr: 2 }} component={Link} to={'/recipes/editor'}>
        <AddBoxIcon sx={{ mr: 1 }}/>
        Create recipe
      </Button>
      <UserAvatar/>
    </Box>
  )
}

const defaultButtonGroup = () => {
  const [userData] = useRecoilState(userDataAtom)
  const isUserLoggedIn = userData.isLoggedIn

  return (<Box>
    {isUserLoggedIn ? <LoggedInButtons/> : <LoginButtons/>}
  </Box>)
}

const DesktopNavBar = ({ rightSideButtonGroup }) => {
  return (<Box
    sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
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

      <Box sx={{ flexGrow: 1, mr: 10 }}>
        <SearchBar/>
      </Box>
    </Box>

    <Box>
      {rightSideButtonGroup}
    </Box>
  </Box>)
}

const MobileNavMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // TODO add mobile menu functionality
  return (
    <>
      <IconButton
        size="large" edge="start" color="inherit"
        onClick={handleClick}
      >
        <MenuIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  )
}

const MobileNavBar = ({}) => {
  return (<Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'center' }}>
    <MobileNavMenu/>
    <SearchBar/>
  </Box>)
}

const Navbar = ({ rightSideButtonGroup = defaultButtonGroup() }) => {
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
