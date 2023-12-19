
import { useState } from 'react'

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import {
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons'

const ProfileTab = ({ handleLogout }: any) => {

  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const handleListItemClick = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setSelectedIndex(index)
  }

  return (
    <List
      component='nav'
      sx={{
        p: 0,
        '& .MuiListItemIcon-root': {
          minWidth: 32,
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event: any) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary='Edit Profile' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event: any) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary='View Profile' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event: any) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon>
        <ListItemText primary='Billing' />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItemButton>
    </List>
  )
}

export default ProfileTab
