/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

import { activeItem } from '../../../../store/reducers/uiReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'

import { ChildrenItemTypes } from '../../../../menu-items/main'

import { UiState } from '../../../../common/Ui'


type NavItemTypes = {
  key: string,
  item: ChildrenItemTypes,
  level: number
}

const NavItem = ({ item, level }: NavItemTypes) => {
  const dispatch = useAppDispatch()
  const selectItem = useAppSelector((reducers) => reducers.ui.selectItem)

  const itemTarget = '_self'

  const listItemProps = {
    component: forwardRef((props, ref) => (
      <Link key={ item.id } { ...props } to={ item.url } target={ itemTarget } />
    ))
  }

  const itemHandler = (id: string) => {
    dispatch(activeItem({ selectItem: [id] } as UiState))
  }

  const ItemIcon = item.icon

  const isSelected = selectItem.findIndex((id: string) => id === item.id) > -1

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id)
    if (currentIndex > -1) {
      dispatch(activeItem({ selectItem: [item.id] } as UiState))
    }
  }, [])

  const textColor = 'text.primary'
  const iconSelectedColor = 'primary.main'

  return (
    <ListItemButton
      { ...listItemProps }
      onClick={ () => itemHandler(item.id) }
      selected={ isSelected }
      sx={ {
        zIndex: 1201,
        pl: `${level * 28}px`,
        py: 1.25,
      } }
    >
      { ItemIcon && (
        <ListItemIcon
          sx={ {
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            fontSize: '1rem'
          } }
        >
          <ItemIcon></ItemIcon>
        </ListItemIcon>
      ) }
      <ListItemText
        primary={
          <Typography
            variant='h6'
            sx={ {
              color: isSelected ? iconSelectedColor : textColor,
              borderRight: isSelected ? "2px solid #1890ff" : 'none',
              fontWeight: 400,
              fontSize: '0.875rem',
              fontFamily: `'Public Sans', sans-serif`
            } }
          >
            { item.title }
          </Typography>
        }
      />
    </ListItemButton>
  )
}

export default NavItem
