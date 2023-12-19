import { Box, List, Typography } from '@mui/material'

import NavItem from './NavItem'
import { MenuItemTypes } from '../../../../menu-items/main'

type NavGroupTypes = {
  key: string,
  item: MenuItemTypes
}

const NavGroup = ({ item }: NavGroupTypes) => {

  return (
    <List
      subheader={
        item.title && (
          <Box sx={ { pl: 3 } }>
            <Typography variant="subtitle2" color="textSecondary">
              { item.title }
            </Typography>
          </Box>
        )
      }
      sx={ { mb: 0, py: 0, zIndex: 0 } }
    >
      {
        item.children.map((menuItem) => {
          return <NavItem key={ menuItem.id } item={ menuItem } level={ 1 } />
        })
      }
    </List>
  )
}

export default NavGroup
