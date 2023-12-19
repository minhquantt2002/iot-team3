import { Stack } from '@mui/material'
import LogoIcon from '../../assets/brand/2.jpg'


function DrawerHeader() {

  return (
    <Stack alignItems='center' justifyContent='center' maxHeight='48px'>
      <img src={ LogoIcon } alt="HuePress Logo" style={ { height: "150%", width: "100%" } } />
    </Stack>
  )
}

export default DrawerHeader
