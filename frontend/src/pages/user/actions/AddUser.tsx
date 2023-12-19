/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, SelectChangeEvent, TextField } from '@mui/material'
import { useAppDispatch } from '../../../store/hooks'
import { handleChangeForm, resetForm } from '../../../store/reducers/usersReducer'
import { User } from '../../../common/User';
import { useState, useEffect } from 'react';
import Select from '../../../components/Select';


const AddUser = () => {
    const [isUserAdded, setIsUserAdded] = useState(false);
    const [cardId, setCardId] = useState('');
    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target
        dispatch(handleChangeForm({ name, value }))

        setIsUserAdded(true)
    }

    useEffect(() => {
        if (!isUserAdded) {
            dispatch(resetForm({} as User))
            setIsUserAdded(false);
        }
    }, [dispatch, isUserAdded]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost/fil-card-id')
        ws.onmessage = function (event) {
            setCardId(event.data)
            dispatch(handleChangeForm({ name: 'card_id', value: event.data }))

            setIsUserAdded(true)
        }
    }, [])

    return (
        <>
            <Grid container>
                <Grid item xs={ 6 }>
                    <label htmlFor="id">Mã thẻ:</label>
                    <TextField
                        required
                        placeholder='Hãy quẹt thẻ để điền mã thẻ'
                        name='card_id'
                        type='text'
                        value={ cardId }
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Họ và tên:</label>
                    <TextField
                        required
                        placeholder='Nhập họ và tên'
                        name='name'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Email:</label>
                    <TextField
                        required
                        placeholder='Nhập email'
                        name='email'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Ngày sinh:</label>
                    <TextField
                        required
                        placeholder=''
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
                        name='id'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Số điện thoại:</label>
                    <TextField
                        required
                        placeholder='Nhập số điện thoại'
                        name='phone_number'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                    <label htmlFor="id">Giới tính:</label>
                    <Select
                        title=''
                        name='gender'
                        defaultValue={ null }
                        options={ [{ id: 'Nam', label: 'Nam' }, { id: 'Nữ', label: 'Nữ' }, { id: 'Khác', label: 'Khác' }] }
                        handleChange={ handleChange }
                    />
                    <label htmlFor="id">Ảnh đại diện:</label>
                    <TextField
                        required
                        placeholder=''
                        name='image_url'
                        type='text'
                        onChange={ (e) => { handleChange(e) } }
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default AddUser
