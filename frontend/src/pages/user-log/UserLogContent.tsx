import { useState, useEffect } from 'react'
import { Button, TableBody, TableCell, TableRow, TableSortLabel } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { handleSelectRowTable } from '../../store/reducers/uiReducer'
import { resetFiltering } from '../../store/reducers/filterReducer'

import { UiState } from '../../common/Ui'
import { BodyUserLog, headUserLogs, headUserLogsInDetail } from '../../common/UserLog'

import { getComparator, stableSort } from '../../components/Table/TableSorting'
import TableHeader from '../../components/Table/TableHeader'
import BodyTableEmpty from '../../components/Table/TableBodyEmpty'
import TableLoader from '../../components/Table/TableLoader'
import { ValueFilter } from '../../common/Filter'

const UserLogContent: React.FC<{
    isInDetails?: boolean,
    page: number,
    rowsPerPage: number,
    data: BodyUserLog[]
}> = ({ isInDetails, page, rowsPerPage, data }) => {
    const dispatch = useAppDispatch()
    const userLogStatus = useAppSelector((reducers) => reducers.userLog.status)

    const filteringState = useAppSelector((reducers) => reducers.filter)

    const [order, setOrder] = useState<'asc' | 'desc'>('desc')
    const [orderBy, setOrderBy] = useState<keyof BodyUserLog>('time_out')

    useEffect(() => {
        dispatch(handleSelectRowTable({ selectRowTable: null } as UiState))
        dispatch(resetFiltering())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // sorting
    const createSortHandler = (field: keyof BodyUserLog) => {
        return () => {
            const isAsc = orderBy === field && order === 'asc'
            dispatch(handleSelectRowTable({ selectRowTable: null } as UiState))
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(field)
        }
    }

    return (
        <>
            <TableHeader>
                { (isInDetails ? headUserLogsInDetail : headUserLogs).map((th) => (
                    <TableCell
                        key={ th.id! }
                        sortDirection={ orderBy === th.id ? order : false }
                        sx={ th.id === 'status' ? { paddingLeft: 0, paddingRight: 0 } : {} }
                    >
                        {
                            th.id === 'status' ? th.label :
                                <TableSortLabel
                                    active={ orderBy === th.id }
                                    direction={ orderBy === th.id ? order : 'asc' }
                                    onClick={ createSortHandler(th.id) }
                                >
                                    { th.label }
                                </TableSortLabel>
                        }

                    </TableCell>
                )) }
            </TableHeader>

            <TableBody>
                { data.length === 0 && userLogStatus === 'loading' && <TableLoader length={ headUserLogs.length + 1 } /> }
                { data.length === 0 && userLogStatus === 'success' && <BodyTableEmpty text={ 'Danh sách trống !' } len={ headUserLogs.length } /> }
                { stableSort(data.filter((value) => {
                    const type = filteringState.type
                    const filterValue = filteringState.value[type as keyof ValueFilter]
                    return (type === '') ? value : (value[type as keyof BodyUserLog]?.toLowerCase().includes(filterValue.toLowerCase()))
                }), getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                            <TableRow>
                                { (isInDetails ? headUserLogsInDetail : headUserLogs).map((th) => {
                                    if (th.id === 'status') {
                                        const txts = row[th.id].split('.')
                                        return (
                                            <TableCell key={ th.id } align='left' sx={ {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '0 !important',
                                                alignItems: 'start'
                                            } }>
                                                <Button
                                                    sx={ {
                                                        padding: 0.5,
                                                        mb: 0.5,
                                                        mt: 0.5
                                                    } }
                                                    variant='contained'
                                                    color={ txts[0] === 'Vào muộn' ? 'error' : 'success' }
                                                >
                                                    { txts[0] }
                                                </Button>
                                                <Button
                                                    sx={ { padding: 0.5 } }
                                                    variant='contained'
                                                    color={ txts[1] === 'Tan sớm' ? 'error' : txts[1] === 'Chưa tan' ? 'info' : 'success' }
                                                >
                                                    { txts[1] }
                                                </Button>
                                            </TableCell>
                                        )
                                    }
                                    return (
                                        <TableCell key={ th.id } align='left'>
                                            { row[th.id] }
                                        </TableCell>
                                    )
                                }) }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </>
    )
}

export default UserLogContent
