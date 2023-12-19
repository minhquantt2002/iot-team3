export type SelectType = {
    id: string;
    [key: string]: string;
};

export type UiState = {
    sidebarShow: boolean,
    selectItem: string[],
    addDialogOpen: boolean,
    editDialogOpen: boolean,
    deleteDialogOpen: boolean,
    uploadDialogOpen: boolean,
    selectRowTable: SelectType | null,
}

export type ActionState = {
    statusCode: number,
    msg: string
}

export type PaginationProp = {
    count: number
    page: number
    rowsPerPage: number
    handleChangePage: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ResponseState {
    data: []
    statusCode: number
    status: 'loading' | 'success' | 'error',
    form: {}
}