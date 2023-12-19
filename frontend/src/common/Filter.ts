export interface ValueFilter {
    id: string
}

export interface FilterState {
    type: string
    value: ValueFilter
}

export const typeSearch = {
    UserLog: [
        {
            id: 'user_id',
            label: 'Mã nhân viên'
        },
        {
            id: 'name',
            label: 'Họ và tên'
        },
    ],
    User: [
        {
            id: 'id',
            label: 'Mã nhân viên'
        },
        {
            id: 'card_id',
            label: 'Mã thẻ'
        },
        {
            id: 'name',
            label: 'Họ và tên'
        },
        {
            id: 'email',
            label: 'Email'
        },
        {
            id: 'phone_number',
            label: 'Số điện thoại'
        }
    ],
}