import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import Auth from '../../api/auth'

const settings = [
  {
    name: 'My Recipes',
    action: (navigate) => {
      navigate('/profile/user_recipes', { replace: true })
    }
  },
  {
    name: 'My Favorites',
    action: (navigate) => {
      navigate('/profile/user_favorites', { replace: true })
    }
  },
  {
    name: 'Log Out',
    action: (navigate) => {
      Auth.logout()
      navigate(0)
    }
  }
]

const UserAvatar = () => {
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleSettingClick = (name, action) => {
    action(navigate)
    handleCloseUserMenu()
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(({ name, action }) => (
          <MenuItem key={name} onClick={() => {
            handleSettingClick(name, action)
          }}>
            <Typography textAlign="center">{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default UserAvatar
