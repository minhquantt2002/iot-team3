import { Stack, Button, Toolbar, Divider } from '@mui/material'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

import EditDialog from '../../components/Dialog/EditDialog'
import DeleteDialog from '../../components/Dialog/DeleteDialog'
import ToolbarTable from '../../components/Table/TableToolbar'
import TableFiltering from '../../components/Table/TableFiltering'
import AddDialog from '../../components/Dialog/AddDialog'

import EditUser from './actions/EditUser'
import AddUser from './actions/AddUser'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { openAddDialog, openDeleteDialog, openEditDialog } from '../../store/reducers/uiReducer'
import { deleteUserByAdmin, updateUserByAdmin, addUserByAdmin } from '../../store/actions/userAction'
import { resetStatusCode } from '../../store/reducers/usersReducer'

import { User } from '../../common/User'


const DeviceTypeToolbar = () => {
    const dispatch = useAppDispatch()
    const selected = useAppSelector((reducers) => reducers.ui.selectRowTable)


    const openAdd = useAppSelector((reducers) => reducers.ui.addDialogOpen)
    const openEdit = useAppSelector((reducers) => reducers.ui.editDialogOpen)
    const openDelete = useAppSelector((reducers) => reducers.ui.deleteDialogOpen)

    const statusCode = useAppSelector((reducers) => reducers.user.statusCode)
    const formUser = useAppSelector((reducers) => reducers.user.form as User)

    const handleResetStatusCode = () => {
        dispatch(resetStatusCode())
    }

    const handleAddUser = () => {
        console.log(formUser)
        dispatch(addUserByAdmin(formUser))
    }

    const handleUpdateUser = () => {
        console.log(formUser)
        dispatch(updateUserByAdmin(formUser))
    }

    const handleDeleteUser = () => {
        console.log({ ...selected })
        const id = selected?.id;
        const payload = { sub: id || "" };
        dispatch(deleteUserByAdmin(payload));
    }

    return (
        <ToolbarTable title='Quản lý thông tin nhân viên'>
            <Divider />
            <Toolbar sx={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
                <Stack ml={ 2 } mr={ 4 } spacing={ 2 } minHeight={ 40 } direction='row'>
                    <Button disabled={ selected !== null } variant='outlined' color='primary' startIcon={ <PlusOutlined /> } onClick={ () => dispatch(openAddDialog()) }>Thêm</Button>
                    <Button disabled={ selected === null } variant='outlined' color='warning' startIcon={ <EditOutlined /> } onClick={ () => dispatch(openEditDialog()) }>Sửa</Button>
                    <Button disabled={ selected === null } variant='outlined' color='error' startIcon={ <DeleteOutlined /> } onClick={ () => dispatch(openDeleteDialog()) }>Xóa</Button>
                </Stack>

                { openAdd &&
                    <AddDialog title='nhân viên' statusCode={ statusCode } handleAdd={ handleAddUser } resetStatusCode={ handleResetStatusCode }>
                        <AddUser />
                    </AddDialog>
                }

                { openEdit &&
                    <EditDialog title='nhân viên' statusCode={ statusCode } handleUpdate={ handleUpdateUser } resetStatusCode={ handleResetStatusCode }>
                        <EditUser />
                    </EditDialog>
                }

                { openDelete && <DeleteDialog title='nhân viên' statusCode={ statusCode } handleDelete={ handleDeleteUser } resetStatusCode={ handleResetStatusCode } /> }

                <TableFiltering title='User' />
            </Toolbar>
            <Divider />
        </ToolbarTable>
    )
}

export default DeviceTypeToolbar
