import {
    Dialog, DialogTitle, DialogContent, Toolbar, DialogActions, Button, Typography
} from '@mui/material'

import { makeStyles } from '@mui/styles'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { closeAddDialog } from '../../store/reducers/uiReducer'
import ConfirmDialog from './ConfirmDialog'

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: '8px 0 12px 0',
        }
    }
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

type AddDialogProps = {
    title: string,
    children: React.ReactNode,
    statusCode: number,
    handleAdd: () => void,
    resetStatusCode: () => void
}


const AddDialog = ({ title, children, statusCode, handleAdd, resetStatusCode }: AddDialogProps) => {
    const classes = useStyles()
    const open = useAppSelector((reducers) => reducers.ui.addDialogOpen)
    const dispatch = useAppDispatch()

    const handleCloseModal = () => {
        dispatch(closeAddDialog())
        setTimeout(() => {
            resetStatusCode()
        }, 200)
    }

    return (
        <>
            { statusCode === 201 && <ConfirmDialog content={ `The ${title} is successfuly created.` } status={ 'success' } open={ open } handleClose={ handleCloseModal } /> }
            { statusCode !== 201 &&
                <Dialog open={ open } className={ classes.root } sx={ dialogStyle }>
                    <Toolbar className='' sx={ { flexDirection: 'column' } }>
                        <DialogTitle>
                            <Typography variant='h4'>
                                Thêm { title }
                            </Typography>
                        </DialogTitle>

                        <DialogContent dividers>
                            { children }
                        </DialogContent>

                        <DialogActions sx={ { width: '100%', m: '12px 0', '>button': { fontWeight: 400 }, justifyContent: 'space-between' } }>
                            <Button
                                variant='contained'
                                size='large'
                                color='secondary'
                                onClick={ handleCloseModal }
                            >Hủy bỏ</Button>
                            <Button
                                variant='contained'
                                size='large'
                                color='primary'
                                onClick={ handleAdd }
                            >Thêm mới</Button>
                        </DialogActions>
                    </Toolbar>
                </Dialog>
            }
        </>
    )
}

export default AddDialog
