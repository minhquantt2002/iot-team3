import { useRef, useState } from 'react'

import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Typography,
} from '@mui/material'


const Profile = () => {
  const anchorRef = useRef<any>(null)
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const iconBackColorOpen = 'grey.300'

  return (
    <Box sx={ { flexShrink: 0, ml: 0.75 } }>
      <ButtonBase
        sx={ {
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
        } }
        aria-label='open profile'
        ref={ anchorRef }
        aria-controls={ open ? 'profile-grow' : undefined }
        aria-haspopup='true'
        onClick={ handleToggle }
      >
        <Stack direction='row' spacing={ 2 } alignItems='center' sx={ { p: 0.5 } }>
          <Avatar
            alt='profile user'
            sx={ { width: 32, height: 32 } }
          />
          <Typography variant='subtitle2'>Nguyen Minh Quan</Typography>
        </Stack>
      </ButtonBase>
    </Box>
  )
}

export default Profile
