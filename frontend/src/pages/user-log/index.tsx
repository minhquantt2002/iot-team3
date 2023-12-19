import { useEffect, useState } from 'react'

import { Pagination } from '../../components/Table/TablePagination'
import TableFrame from '../../components/Table/TableFrame'

import { useAppDispatch, useAppSelector } from '../../store/hooks'

import UserLogContent from './UserLogContent'
import UserLogToolbar from './UserLogToolbar'
import { formatDataUserLog, getUserLogsbyAdmin } from '../../store/actions/userLogAction'
import { headUserLogs } from '../../common/UserLog'

const UserLog = () => {
    const dispatch = useAppDispatch()
    const userLogData = useAppSelector((reducers) => reducers.userLog.data)
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [filterTime, setFilterTime] = useState<Date | null>(new Date())

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const paginationState = {
        count: userLogData.length,
        page: page,
        rowsPerPage: rowsPerPage,
        handleChangePage: handleChangePage,
        handleChangeRowsPerPage: handleChangeRowsPerPage
    }

    useEffect(() => {
        dispatch(getUserLogsbyAdmin())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const Content = (
        <UserLogContent
            data={ formatDataUserLog(userLogData ?? [], filterTime) }
            page={ page }
            rowsPerPage={ rowsPerPage }
        />
    )

    const Toolbar = (
        <UserLogToolbar
            filterTime={ filterTime }
            onChangeFilterTime={ setFilterTime }
            data={ formatDataUserLog(userLogData ?? [], filterTime) }
            headers={ headUserLogs }
        />
    )

    return (
        <>
            <TableFrame
                Content={ Content }
                Toolbar={ Toolbar }
            />

            <Pagination
                { ...paginationState }
            />
        </>
    )
}

export default UserLog
