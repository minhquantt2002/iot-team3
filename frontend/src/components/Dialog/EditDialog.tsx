import {
    Dialog, DialogTitle, DialogContent, Toolbar, DialogActions, Button, Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeEditDialog } from '../../store/reducers/uiReducer'
import { handleSelectRowTable } from '../../store/reducers/uiReducer'

import ConfirmDialog from './ConfirmDialog'

import { UiState } from '../../common/Ui'

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: '8px 0 12px 0',
        }
    },
}))

const dialogStyle = {
    ' .MuiDialogContent-root': {
        minWidth: '100%'
    },
    ' .MuiDialog-paper': {
        minWidth: '80%'
    },
    '& .MuiGrid-item': {
        p: '0 4px'
    }
}

type EditDialogProps = {
    title: string,
    children: React.ReactNode,
    statusCode: number,
    handleUpdate: () => void,
    resetStatusCode: () => void
}

const EditDialog = ({ title, children, statusCode, handleUpdate, resetStatusCode }: EditDialogProps) => {
    const classes = useStyles()
    const open = useAppSelector((reducers) => reducers.ui.editDialogOpen)
    const dispatch = useAppDispatch()

    const handleCloseModal = () => {
        dispatch(closeEditDialog())
        dispatch(handleSelectRowTable({ selectRowTable: null } as UiState))
        setTimeout(() => {
            resetStatusCode()
        }, 200)
    }

    return (
        <>
            {statusCode === 201 && <ConfirmDialog content={`The ${title} is successfuly updated.`} status={'success'} open={open} handleClose={handleCloseModal} />}
            {statusCode !== 201 &&
                <Dialog open={open} className={classes.root} sx={dialogStyle}>
                    <Toolbar sx={{ flexDirection: 'column' }}>
                        <DialogTitle>
                            <Typography variant='h4'>
                                Edit {title}
                            </Typography>
                        </DialogTitle>

                        <DialogContent dividers>
                            {children}
                        </DialogContent>

                        <DialogActions sx={{ m: '12px 0', '>button': { fontWeight: 400 } }}>
                            <Button
                                variant='contained'
                                size='large'
                                color='secondary'
                                onClick={handleCloseModal}
                            >Cancel</Button>
                            <Button
                                variant='contained'
                                size='large'
                                color='primary'
                                onClick={handleUpdate}
                            >Save</Button>
                        </DialogActions>
                    </Toolbar>
                </Dialog>
            }
        </>
    )
}

export default EditDialog
