import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Toolbar,
    Typography
} from '@mui/material'

import { HighlightOffOutlined } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeDeleteDialog, handleSelectRowTable } from '../../store/reducers/uiReducer'

import ConfirmDialog from './ConfirmDialog'

import { UiState } from '../../common/Ui'

type DeleteDialogProps = {
    title: string,
    statusCode: number,
    handleDelete: () => void,
    resetStatusCode: () => void
}

const DeleteDialog = ({ title, statusCode, handleDelete, resetStatusCode }: DeleteDialogProps) => {
    const dispatch = useAppDispatch()
    const open = useAppSelector((reducers) => reducers.ui.deleteDialogOpen)

    const handleCloseModal = () => {
        dispatch(closeDeleteDialog())
        dispatch(handleSelectRowTable({ selectRowTable: null } as UiState))
        setTimeout(() => {
            resetStatusCode()
        }, 200)
    }
    return (
        <>
            {statusCode === 204 && <ConfirmDialog content={`The ${title} is successfuly deleted.`} status={'success'} open={open} handleClose={handleCloseModal} />}
            {(statusCode === 500 || statusCode === 400) && <ConfirmDialog content={`Delete ${title} is failure.`} status={'error'} open={open} handleClose={handleCloseModal} />}
            {statusCode === 200 && <Dialog
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
                    <>
                        <HighlightOffOutlined sx={{ pt: 3, fontSize: 150 }} color='error' />
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                            <Typography variant='h4'>
                                Delete {title}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Do you really want to delete this {title}? This process canot be undo.
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions
                            sx={{ pb: 3, '>button': { fontWeight: 400 } }}
                        >
                            <Button
                                variant='contained'
                                size='large'
                                color='secondary'
                                onClick={handleCloseModal}
                            >Cancel</Button>
                            <Button
                                variant='contained'
                                size='large'
                                color='error'
                                onClick={handleDelete}
                            >Accept</Button>
                        </DialogActions>
                    </>
                </Toolbar>
            </Dialog>
            }
        </>
    )
}

export default DeleteDialog
