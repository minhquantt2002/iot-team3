import { createAsyncThunk } from "@reduxjs/toolkit"

import { BodyUserLog } from "../../common/UserLog"
import { fetchUserLogs, fetchUserLogsById } from '../services/userLogApi'
import { ResponseState } from "../../common/Ui"

// init
export const init: ResponseState = {
    statusCode: 200,
    data: [],
    status: 'success',
    form: {}
}

export const resetStatusCode = (state: ResponseState) => {
    state.statusCode = 200
}


export const getUserLogsbyAdmin = createAsyncThunk(
    "getUserLogs",
    async () => {
        return await fetchUserLogs()
    }
)


export const getUserLogsbyId = createAsyncThunk(
    "getUserLogsbyId",
    async ({ id }: { [k: string]: string }) => {
        return await fetchUserLogsById(id)
    }
)

const validateTime = (v: Date) => {
    return (v.getHours() > 9 ? v.getHours() : '0' + v.getHours())
        + ':' + (v.getMinutes() > 9 ? v.getMinutes() : '0' + v.getMinutes())
        + ':' + (v.getSeconds() > 9 ? v.getSeconds() : '0' + v.getSeconds())
}

export const formatDataUserLog = (data: any, filterTime: Date | null): BodyUserLog[] => {
    const inDefault = '08:00:00'
    const outDefault = '17:30:00'

    data = data.map((row: any): BodyUserLog => {
        const timeIn = validateTime(new Date(row['checkin_date'] + 'T' + row['time_in']))
        const timeOut = validateTime(new Date(row['checkin_date'] + 'T' + row['time_out']))
        const status = (timeIn <= inDefault ? 'Vào đúng giờ' : 'Vào muộn') + '.' +
            (timeOut === '0NaN:0NaN:0NaN' ? 'Chưa tan' : (timeOut <= outDefault) ? 'Tan sớm' : 'Đã tan')
        return {
            ...row,
            checkin_date: (row['checkin_date'] + '').split('-').reverse().join('-'),
            name: row['user']['name'] ?? '',
            card_id: row['user']['card_id'] ?? '',
            // stt_in: timeIn <= inDefault ? '1' : '0',
            // stt_out: timeToday <= outDefault && timeOut <= outDefault ? '1' : '0',
            status: status
        }
    })

    const date = filterTime?.getDate() + '-' + (filterTime?.getMonth()! + 1) + '-' + filterTime?.getFullYear()

    return data.filter((row: any) => {
        return row['checkin_date'] === date
    })
}
