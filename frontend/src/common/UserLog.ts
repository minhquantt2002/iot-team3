export interface BodyUserLog {
    // id: string
    name: string
    user_id: string
    card_id: string
    checkin_date: string
    time_in: string
    time_out: string
    status: string
}


export interface HeadUserLog {
    id: keyof BodyUserLog
    label: string
}

export const headUserLogs: HeadUserLog[] = [
    { id: 'card_id', label: 'Mã thẻ', },
    { id: 'user_id', label: 'Mã nhân viên', },
    { id: 'name', label: 'Họ và tên', },
    { id: 'checkin_date', label: 'Ngày', },
    { id: 'time_in', label: 'Vào', },
    { id: 'time_out', label: 'Ra', },
    { id: 'status', label: 'Trạng thái vào', },
]

export const headUserLogsInDetail: HeadUserLog[] = [
    { id: 'checkin_date', label: 'Ngày', },
    { id: 'time_in', label: 'Vào', },
    { id: 'time_out', label: 'Ra', },
]
