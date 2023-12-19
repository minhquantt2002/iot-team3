/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { formatDataUser, getUserById } from "../../../store/actions/userAction";
import TableFrame from "../../../components/Table/TableFrame";
import UserLogContent from "../../user-log/UserLogContent";
import { formatDataUserLog, getUserLogsbyId } from "../../../store/actions/userLogAction";
import { Pagination } from "../../../components/Table/TablePagination";
import UserLogToolbar from "../../user-log/UserLogToolbar";
import { headUserLogs } from "../../../common/UserLog";

const BoxTextInfo: React.FC<{ label: string, value: string }> = (props) => {

  return (
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
      } }
    >
      <Typography color={ 'GrayText' } variant='h6'>{ props.label }</Typography>
      <Typography variant='h6'>{ props.value }</Typography>
    </Box>
  )
}

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const user = formatDataUser(useAppSelector((reducers) => reducers.user.data))
  const [filterTime, setFilterTime] = useState<Date | null>(new Date())
  const userLogs = useAppSelector((reducers) => reducers.userLog.data)

  useEffect(() => {
    dispatch(getUserById({ id: id + '' }))
    dispatch(getUserLogsbyId({ id: id + '' }))
  }, [id])

  // Pagination
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
    count: userLogs.length,
    page: page,
    rowsPerPage: rowsPerPage,
    handleChangePage: handleChangePage,
    handleChangeRowsPerPage: handleChangeRowsPerPage
  }

  return (
    <Stack>
      <Typography variant='h5' mb={ 1 } mt={ 1.7 }>
        Thông tin chi tiết nhân viên
      </Typography>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 5 }>
          <Card key={ 'user-detail-card' }>
            <CardContent>
              <Box
                sx={ { alignItems: 'center', display: 'flex', flexDirection: 'column' } }
              >
                <Avatar
                  src={ user.length === 1 ? user[0]['image_url'] : '' }
                  sx={ { height: 80, mb: 2, width: 80, } }
                />
                <Typography variant='h5'>{ user.length === 1 ? user[0]['name'] : '' }</Typography>
              </Box>
              <Box mt={ 4 }>
                <BoxTextInfo label='Mã nhân viên' value={ user.length === 1 ? user[0]['id'] : '' } />
                <Divider />
                <BoxTextInfo label='Họ và tên' value={ user.length === 1 ? user[0]['name'] : '' } />
                <Divider />
                <BoxTextInfo label='Mã thẻ' value={ user.length === 1 ? user[0]['card_id'] : '' } />
                <Divider />
                <BoxTextInfo label='Email' value={ user.length === 1 ? user[0]['email'] : '' } />
                <Divider />
                <BoxTextInfo label='Số điện thoại' value={ user.length === 1 ? user[0]['phone_number'] : '' } />
                <Divider />
                <BoxTextInfo label='Giới tính' value={ user.length === 1 ? user[0]['gender'] : '' } />
                <Divider />
                <BoxTextInfo label='Ngày sinh' value={ user.length === 1 ? user[0]['dob'] : '' } />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={ 7 }>
          <TableFrame
            Content={
              <UserLogContent
                data={ formatDataUserLog(userLogs ?? [], filterTime) }
                isInDetails page={ page }
                rowsPerPage={ rowsPerPage }
              />
            }
            Toolbar={
              <UserLogToolbar
                filterTime={ filterTime }
                onChangeFilterTime={ setFilterTime }
                data={ formatDataUserLog(userLogs ?? [], filterTime) }
                headers={ headUserLogs }
                isInUserDetails
              />
            }
          />
          <Pagination
            { ...paginationState }
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default UserDetail;