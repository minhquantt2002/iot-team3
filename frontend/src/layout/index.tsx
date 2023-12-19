import { Outlet } from 'react-router-dom'

import { Box, Toolbar } from '@mui/material'

import MainDrawer from './Drawer'
import MainHeader from './Header'

import { toggleSidebar } from '../store/reducers/uiReducer'
import { useAppDispatch, useAppSelector } from '../store/hooks'

import { drawerWidth } from '../config'

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const open = useAppSelector((reducers) => reducers.ui.sidebarShow)

  const handleDrawerToggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <MainHeader open={open} handleDrawerToggle={handleDrawerToggle} />
      <MainDrawer open={open} />
      <Box
        component="main"
        sx={{
          flexGrow: 1, p: { xs: 2, sm: 3 },
          marginLeft: open ? `${drawerWidth}px` : '0',
          width: open ? `calc(100% - ${drawerWidth}px)` : '0',
          position: 'relative',
          background: '#f3f3f3',
          zIndex: 1201,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
