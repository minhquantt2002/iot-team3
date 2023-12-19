import { Box } from '@mui/material'

import NavGroup from './NavGroup'
import menuItem from '../../../../menu-items'
import { MenuItemTypes } from '../../../../menu-items/main'

const Navigation = () => {
  const navGroups = menuItem.map((item: MenuItemTypes) => {
    return <NavGroup key={ item.id } item={ item } />
  })

  return <Box sx={ { pt: 2 } }>{ navGroups }</Box>
}

export default Navigation
