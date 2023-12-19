import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    Toolbar, Button
} from '@mui/material'

import {
    CheckCircleOutlined
} from '@mui/icons-material'

type ConfirmDialogProps = {
    open: boolean
    handleClose: () => void
    content: string
    status: "error" | "success"
}

const ConfirmDialog = ({ open, content, status, handleClose }: ConfirmDialogProps) => {
    return (
        <Dialog
            open={open}
            sx={{
                '.MuiDialog-paper': {
                    minWidth: 600
                },
                '& .MuiGrid-item': {
                    p: '0 4px'
                }
            }}>
            <Toolbar sx={{ flexDirection: 'column' }}>
                <CheckCircleOutlined sx={{ pt: 3, fontSize: 150 }} color={status} />
                <DialogContent sx={{ textAlign: 'center' }}>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{ pb: 3, '>button': { fontWeight: 400 } }}
                >
                    <Button
                        variant='contained'
                        size='large'
                        color='success'
                        onClick={handleClose}
                    >Ok</Button>
                </DialogActions>

            </Toolbar>
        </Dialog>
    )
}

export default ConfirmDialog
