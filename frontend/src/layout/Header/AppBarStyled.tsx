import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'

import { drawerWidth } from '../../config'

type AppBarStyledTypes = {
  theme?: any,
  open: boolean
}

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: AppBarStyledTypes) => ({
  zIndex: 1202,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderBottom: '1px solid #f0f0f0',
  boxShadow: 'none',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default AppBarStyled
