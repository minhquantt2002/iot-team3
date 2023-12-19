
import { useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

// assets
import {
  CommentOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'

const SettingTab = () => {
  const theme = useTheme()

  const [selectedIndex, setSelectedIndex] = useState(0)
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
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event: any) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <PhoneOutlined />
        </ListItemIcon>
        <ListItemText primary='Support' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event: any) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary='Account Settings' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event: any) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary='Privacy Center' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event: any) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary='Feedback' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event: any) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary='History' />
      </ListItemButton>
    </List>
  )
}

export default SettingTab
