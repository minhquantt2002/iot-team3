import { createSlice } from '@reduxjs/toolkit'
import * as filterAction from '../actions/filterAction'

const filterSlice = createSlice({
    name: 'filter',
    initialState: filterAction.init,
    reducers: {
        handleChangeInputFilter: filterAction.handleChangeInputFilter,
        resetFiltering: filterAction.resetFiltering
    }
})

export const {
    handleChangeInputFilter,
    resetFiltering
} = filterSlice.actions

export default filterSlice
