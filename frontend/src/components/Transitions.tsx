import { forwardRef } from 'react'

// material-ui
import { Fade, Box, Grow } from '@mui/material'

type TransitionsTypes = {
  children?: React.ReactNode,
  type: 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom',
  position?: 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom',
  sx?: object
}

const Transitions = forwardRef(
  ({ children, position = 'top-left', type = 'grow', sx }: TransitionsTypes, ref: any) => {
    let positionSX = {
      transformOrigin: '0 0 0',
    }

    switch (position) {
      case 'top-right':
      case 'top':
      case 'bottom-left':
      case 'bottom-right':
      case 'bottom':
      case 'top-left':
      default:
        positionSX = {
          transformOrigin: '0 0 0',
        }
        break
    }

    return (
      <Box ref={ref}>
        {type === 'grow' && (
          <Grow {...sx}>
            <Box sx={positionSX}>{children}</Box>
          </Grow>
        )}
        {type === 'fade' && (
          <Fade
            {...sx}
            timeout={{
              appear: 0,
              enter: 300,
              exit: 150,
            }}
          >
            <Box sx={positionSX}>{children}</Box>
          </Fade>
        )}
      </Box>
    )
  }
)

export default Transitions
