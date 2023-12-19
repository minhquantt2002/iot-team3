import { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow, Checkbox, TableSortLabel, IconButton } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { formatDataUser, getUserByAdmin } from '../../store/actions/userAction'
import { handleSelectRowTable } from '../../store/reducers/uiReducer'
import { resetFiltering } from '../../store/reducers/filterReducer'

import { SelectType, UiState } from '../../common/Ui'
import { User, headUsers } from '../../common/User'
import { ValueFilter } from '../../common/Filter'

import { getComparator, stableSort } from '../../components/Table/TableSorting'
import TableLoader from '../../components/Table/TableLoader'
import BodyTableEmpty from '../../components/Table/TableBodyEmpty'
import TableHeader from '../../components/Table/TableHeader'
import { useNavigate } from 'react-router-dom'

const UserContent = ({ page, rowsPerPage }: { [key: string]: number }) => {
    const dispatch = useAppDispatch()
    const userStatus = useAppSelector((reducers) => reducers.user.status)
    const userData = useAppSelector((reducers) => reducers.user.data)
    const userStatusCode = useAppSelector((reducers) => reducers.user.statusCode)
    const navigate = useNavigate()
    const filteringState = useAppSelector((reducers) => reducers.filter)

    const [order, setOrder] = useState<'asc' | 'desc'>('desc')
    const [orderBy, setOrderBy] = useState<keyof User>('id')

    const selected = useAppSelector((reducers) => reducers.ui.selectRowTable)
    const isSelected = (id: string) => selected?.id === id

    useEffect(() => {
        dispatch(getUserByAdmin())
    }, [dispatch, userStatusCode])

    useEffect(() => {
        dispatch(handleSelectRowTable({ selectRowTable: null } as UiState))
        dispatch(resetFiltering())
    }, [dispatch])

    // sorting
    const createSortHandler = (field: keyof User) => {
        return () => {
            const isAsc = orderBy === field && order === 'asc'
            dispatch(handleSelectRowTable({ selectRowTable: null } as UiState))
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(field)
        }
    }

    // select a row
    const handleClickRow = (isItemSelected: boolean, id: string) => {
        return (!isItemSelected && selected === null) || isItemSelected ?
            () => dispatch(handleSelectRowTable({ selectRowTable: { id: id } as SelectType } as UiState)) :
            () => { }
    }

    return (
        <>
            <TableHeader>
                <TableCell padding='checkbox'>
                    <Checkbox disabled />
                </TableCell>
                { headUsers.map((th) => (
                    <TableCell
                        key={ th.id }
                        sortDirection={ orderBy === th.id ? order : false }
                    >
                        {
                            th.id === 'image_url' ? th.label :
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
                <TableCell></TableCell>
            </TableHeader>

            <TableBody>
                { userData.length === 0 && userStatus === 'loading' && <TableLoader length={ headUsers.length + 1 } /> }
                { userData.length === 0 && userStatus === 'success' && <BodyTableEmpty text={ 'Danh sách trống !' } len={ headUsers.length } /> }
                { stableSort(formatDataUser(userData).filter((value) => {
                    const type = filteringState.type
                    const filterValue = filteringState.value[type as keyof ValueFilter]
                    return (type === '') ? value : (value[type as keyof User]?.toLowerCase().includes(filterValue.toLowerCase()))
                }), getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        const isItemSelected = isSelected(row.id)
                        return (
                            <TableRow
                                hover
                                onClick={ handleClickRow(isItemSelected, row.id) }
                                tabIndex={ -1 }
                                key={ row.id }
                                aria-checked={ isItemSelected }
                                selected={ isItemSelected }
                                sx={ { cursor: 'pointer' } }
                            >
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        color='primary'
                                        checked={ isItemSelected && selected !== null }
                                        disabled={ !isItemSelected && selected !== null ? true : false }
                                    />
                                </TableCell>
                                { headUsers.map((th) => {
                                    return (
                                        <TableCell key={ th.id } align='left' style={ th.id === 'image_url' ? { paddingRight: 0 } : {} }>
                                            {
                                                th.id !== 'image_url' ? row[th.id]
                                                    : <img
                                                        src={ row[th.id] }
                                                        loading="lazy"
                                                        alt=''
                                                        width={ 100 }
                                                    />
                                            }
                                        </TableCell>
                                    )
                                }) }
                                <TableCell align='center' style={ { paddingLeft: 0 } }>
                                    <IconButton
                                        aria-label="view"
                                        color="primary"
                                        onClick={ () => {
                                            navigate(`${row.id}`);
                                        } }
                                        title="View"
                                    >
                                        <VisibilityOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    }) }
            </TableBody>
        </>
    )
}

export default UserContent
