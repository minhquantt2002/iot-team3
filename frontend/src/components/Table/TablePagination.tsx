import TablePagination from '@mui/material/TablePagination'

import { PaginationProp } from '../../common/Ui'

export const Pagination = ({
    count,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
}: PaginationProp) => {
    return (
        <TablePagination
            labelRowsPerPage='Số hàng'
            rowsPerPageOptions={ [5, 10, 25, 50, 100] }
            component="div"
            count={ count }
            rowsPerPage={ rowsPerPage }
            page={ page }
            onPageChange={ handleChangePage }
            onRowsPerPageChange={ handleChangeRowsPerPage }
        />
    )
}
