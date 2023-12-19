import { IconButton, Toolbar } from '@mui/material'

import AppBarStyled from './AppBarStyled'
import HeaderContent from './HeaderContent'

import { MenuOutlined } from '@ant-design/icons'

type MainHeaderTypes = {
  open: boolean,
  handleDrawerToggle: any
}

const MainHeader = ({ open, handleDrawerToggle }: MainHeaderTypes) => {
  const mainHeader = (
    <Toolbar>
      <IconButton
        disableRipple
        onClick={handleDrawerToggle}
        edge='start'
        color='secondary'
        sx={{
          color: 'text.primary',
          ml: { xs: 0, lg: -2 },
        }}
      >
        <MenuOutlined />
      </IconButton>
      <HeaderContent />
    </Toolbar>
  )

  const stylesAppBar = {
    position: 'fixed',
    color: 'inherit',
    background: 'white',
  }

  return (
    <AppBarStyled open={open} sx={stylesAppBar}>
      {mainHeader}
    </AppBarStyled>
  )
}

export default MainHeader
