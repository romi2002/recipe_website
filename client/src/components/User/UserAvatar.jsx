import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const settings = [
  {
    name: 'My Recipes',
    action: () => {
      // TODO create user recipes page and goto
    }
  },
  {
    name: 'Log Out',
    action: () => {
      // TODO add logout route and call
    }
  }
]

const UserAvatar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleSettingClick = (name, action) => {
    action()
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
