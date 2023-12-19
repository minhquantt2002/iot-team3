import { Box, Drawer } from '@mui/material'

import DrawerHeader from './DrawerHeader'
import DrawerContent from './DrawerContent'
import { drawerWidth } from '../../config'

const MainDrawer = ({ open }: { [key: string]: boolean }) => {
    return (
        <Box component='nav' >
            <Drawer
                open={open}
                variant='permanent'
                ModalProps={{ keepMounted: false }}
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: open ? drawerWidth : '0' ,
                        borderRight: '1px solid #f0f0f0',
                        boxShadow: 'inherit',
                    },
                    '& .MuiBackdrop-root': {
                        display: 'none'
                    }
                }}
            >
                {open && <DrawerHeader />}
                {open && <DrawerContent />}
            </Drawer>
        </Box>
    )
}

export default MainDrawer
