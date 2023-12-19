import { Toolbar, Divider, Button } from '@mui/material'

import ToolbarTable from '../../components/Table/TableToolbar'
import TableFiltering from '../../components/Table/TableFiltering'
import { CSVLink } from 'react-csv';

import UserLogCard from './UserLogCard'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { vi } from 'date-fns/locale';

const UserLogToolbar: React.FC<{
    isInUserDetails?: boolean,
    filterTime: Date | null,
    onChangeFilterTime: (date: Date | null) => void,
    data: any,
    headers: any
}> = ({ filterTime, onChangeFilterTime, isInUserDetails, data, headers }) => {

    return (
        <ToolbarTable title='Theo dõi chấm công'>
            {
                !isInUserDetails &&
                <>
                    <Divider />
                    <UserLogCard />
                    <Divider />
                </>
            }


            <Toolbar sx={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
                {
                    !isInUserDetails &&
                    <TableFiltering title='UserLog' />
                }

                <Box ml={ 2 }>
                    <LocalizationProvider dateAdapter={ AdapterDateFns } adapterLocale={ vi }>
                        <DatePicker
                            label={ 'Lọc theo ngày' }
                            value={ filterTime }
                            onChange={ e => {
                                onChangeFilterTime(e)
                            } }
                            sx={ { mr: 2 } }
                        />
                    </LocalizationProvider>
                    <Button variant='contained'>
                        <CSVLink
                            data={ data }
                            style={ {
                                color: 'white',
                                textDecoration: 'none'
                            } }
                            filename='Danh sách'
                            >
                            Xuất file CSV
                        </CSVLink>
                    </Button>
                </Box>
            </Toolbar>

            <Divider />
        </ToolbarTable>
    )
}

export default UserLogToolbar
