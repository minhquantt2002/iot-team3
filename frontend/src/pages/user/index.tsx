import { useState } from 'react'

import TableFrame from '../../components/Table/TableFrame'
import { Pagination } from '../../components/Table/TablePagination'

import { useAppSelector } from '../../store/hooks'

import UserContent from './UserContent'
import UserToolbar from './UserToolbar'

const User = () => {
    const data = useAppSelector((reducers) => reducers.user.data)

    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const paginationState = {
        count: data.length,
        page: page,
        rowsPerPage: rowsPerPage,
        handleChangePage: handleChangePage,
        handleChangeRowsPerPage: handleChangeRowsPerPage
    }

    const Content = (
        <UserContent
            page={page}
            rowsPerPage={rowsPerPage}
        />
    )

    const Toolbar = (
        <UserToolbar />
    )

    return (
        <>
            <TableFrame
                Content={Content}
                Toolbar={Toolbar}
            />
            <Pagination
                {...paginationState}
            />
        </>
    )
}

export default User
