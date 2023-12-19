import { createSlice } from '@reduxjs/toolkit'

import * as userLog from '../actions/userLogAction'

const userLogSlice = createSlice({
    name: 'userLog',
    initialState: userLog.init,
    reducers: {
        resetStatusCode: userLog.resetStatusCode,
    },
    extraReducers: (builder) => {
        // Get UserLog
        builder.addCase(userLog.getUserLogsbyAdmin.pending, (state) => {
            state.status = 'loading'
            state.data = []
        })

        builder.addCase(userLog.getUserLogsbyAdmin.fulfilled, (state, action) => {
            state.status = 'success'
            state.data = action.payload
            console.log('Fetch userLog is success')
        })

        builder.addCase(userLog.getUserLogsbyAdmin.rejected, (state) => {
            console.log('Fetch userLog is error')
        })


        // Get UserLogs By Id
        builder.addCase(userLog.getUserLogsbyId.pending, (state) => {
            state.status = 'loading'
            state.data = []
        })

        builder.addCase(userLog.getUserLogsbyId.fulfilled, (state, action) => {
            state.status = 'success'
            state.data = action.payload
            console.log('Fetch userLog is success')
        })

        builder.addCase(userLog.getUserLogsbyId.rejected, (state) => {
            console.log('Fetch userLog is error')
        })
    }
})

export default userLogSlice

export const {
    resetStatusCode,
} = userLogSlice.actions
