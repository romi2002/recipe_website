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
import { useRecoilState } from 'recoil'
import { userDataAtom } from '../../recoil/auth/UserDataAtom'

const settings = [
  {
    name: 'My Recipes',
    action: (navigate) => {
      navigate('/profile/user_recipes')
    }
  },
  {
    name: 'My Favorites',
    action: (navigate) => {
      navigate('/profile/user_favorites')
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
  const [userData] = useRecoilState(userDataAtom)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const userInitial = userData.username == null || userData.username.length === 0 ? ' ' : userData.username[0].toUpperCase()

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
          <Avatar>{userInitial}</Avatar>
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
