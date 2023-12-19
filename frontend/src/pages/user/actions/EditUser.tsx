import { useEffect } from 'react'
import { Grid, SelectChangeEvent, TextField } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getUserInStore } from '../../../store/actions/userAction'
import { handleChangeForm, setFormUser } from '../../../store/reducers/usersReducer'
import Select from '../../../components/Select'


const EditDeviceType = () => {
    const dispatch = useAppDispatch()
    const selected = useAppSelector((reducers) => reducers.ui.selectRowTable)
    const usersData = useAppSelector((reducers) => reducers.user.data)
    const user = getUserInStore(usersData, selected?.id as string)

    useEffect(() => {
        dispatch(setFormUser(user))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target
        dispatch(handleChangeForm({ name, value }))
    }
    return (
        <>
            <Grid container>
                <Grid item xs={ 6 }>
                    <label htmlFor="id">Mã thẻ:</label>
                    <TextField
                        required
                        placeholder='Quẹt thẻ để tự động điền'
                        defaultValue={ user.card_id }
                        name='card_id'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Họ và tên:</label>
                    <TextField
                        required
                        placeholder='Nhập họ và tên'
                        defaultValue={ user.name }
                        name='name'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Email:</label>
                    <TextField
                        required
                        placeholder='Nhập email'
                        defaultValue={ user.email }
                        name='email'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Ngày sinh:</label>
                    <TextField
                        required
                        placeholder=''
                        defaultValue={ user.dob }
                        name='dob'
                        type='date'
                        onChange={ (e) => { handleChange(e) } }
                    />
                </Grid>
                <Grid item xs={ 6 }>
                    <label htmlFor="id">Mã nhân viên:</label>
                    <TextField
                        required
                        placeholder='Nhập mã nhân viên'
                        defaultValue={ user.id }
                        name='id'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Số điện thoại:</label>
                    <TextField
                        required
                        placeholder='Nhập số điện thoại'
                        defaultValue={ user.phone_number }
                        name='phone_number'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Giới tính:</label>
                    <Select
                        title=''
                        name='gender'
                        defaultValue={ { id: user.gender, label: user.gender } }
                        options={ [{ id: 'Nam', label: 'Nam' }, { id: 'Nữ', label: 'Nữ' }, { id: 'Khác', label: 'Khác' }] }
                        handleChange={ handleChange }
                    />
                    <label htmlFor="id">Ảnh đại diện:</label>
                    <TextField
                        required
                        placeholder=''
                        defaultValue={ user.image_url }
                        name='image_url'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default EditDeviceType
