import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Toolbar, Typography, Box, InputBase
} from '@mui/material'
import { CloudUploadOutlined } from '@ant-design/icons'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeUploadDialog } from '../../store/reducers/uiReducer'

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            minHeight: '200px',
            margin: '8px 0 12px 0',
        }
    },
    inputRoot: {
        textAlign: 'center',
        position: 'relative',
        paddingBottom: '0',
        '& .MuiInputBase-root': {
            position: 'relative',
            width: '100%',
            minHeight: '200px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            border: '2px dashed rgba(0, 0, 0, 0.6)',
            borderRadius: '2px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            overflow: 'hidden',
            zIndex: '1'
        },
        '& .MuiInputBase-input': {
            padding: 0,
            minHeight: '200px',
            position: 'absolute',
            cursor: 'pointer',
            display: 'none'
        }
    },
    text: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        msTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        zIndex: '0',
        color: 'rgba(0, 0, 0, 0.6)'
    }
}))

const dialogStyle = {
    ' .MuiDialogContent-root': {
        minWidth: '100%'
    },
    ' .MuiDialog-paper': {
        minWidth: '40%'
    }
}

const UploadDialog = () => {
    const classes = useStyles()

    const [file, setFile] = useState<File | null>()
    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files?.item(0))
        setFile(e.target.files?.item(0))
    }

    const open = useAppSelector((reducers) => reducers.ui.uploadDialogOpen)
    const dispatch = useAppDispatch()
    const handleCloseModal = () => {
        dispatch(closeUploadDialog())
    }

    const handleUpload = () => {

    }

    return (
        <Dialog open={open} className={classes.root} sx={dialogStyle}>
            <Toolbar sx={{ flexDirection: 'column' }}>
                <DialogTitle>
                    <Typography variant='h4'>
                        Upload file
                    </Typography>
                </DialogTitle>

                <DialogContent className={classes.inputRoot}>
                    <label htmlFor="file">
                        <InputBase
                            type='file'
                            name='file'
                            id='file'
                            onChange={onChangeFile}
                        />
                    </label>

                    <Box className={classes.text}>
                        <Typography variant='h5' component='p'>
                            Drop file here.
                        </Typography>
                        <CloudUploadOutlined size={26} />
                        <Typography variant='subtitle2' component={'div'}>
                            {file && file.name}
                        </Typography>
                    </Box>
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
                        onClick={handleUpload}
                    >Save</Button>
                </DialogActions>
            </Toolbar>
        </Dialog >
    )
}

export default UploadDialog

