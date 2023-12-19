/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import userImg from '../../assets/brand/user.png';
import { getUserLogsbyAdmin } from "../../store/actions/userLogAction";
import { useAppDispatch } from "../../store/hooks";
const txtDefault = 'Quẹt thẻ để checkin / checkout';

const UserLogCard = () => {
  const [txt, setTxt] = useState(txtDefault)
  const [inf, setInf] = useState<any>({});
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost/read-card')
    var pre: NodeJS.Timeout;
    ws.onmessage = function (event) {
      const infor = JSON.parse(event.data);
      console.log(infor);
      clearTimeout(pre);
      setInf(infor)
      if ('error' in infor) {
        setTxt(infor['error'])
      }

      if ('time_out' in infor) {
        if (infor['time_out'] === null) {
          setTxt(`Nhân viên vào lúc ${infor['time_in']} ngày ${infor['checkin_date']}!`)
        } else {
          setTxt(`Nhân viên ra về lúc ${infor['time_out']} ngày ${infor['checkin_date']}!`)
        }
        dispatch(getUserLogsbyAdmin())
      }

      pre = setTimeout(() => {
        setInf({})
        setTxt(txtDefault)
      }, 5000)
    }
  }, [])

  return (
    <Grid container spacing={ 2 } p={ 3 }>
      <Grid container item xs={ 12 }>
        <Typography height={ 28 } variant="h4">{ txt }</Typography>
      </Grid>
      <Grid item xs={ 3 } height={ 280 }>
        <img
          src={ 'user' in inf ? inf['user']['image_url'] : userImg }
          width="100%"
          style={ { maxHeight: '100%' } }
          alt=""
        />
      </Grid>
      <Grid container item spacing={ 3 } xs={ 9 }>
        <Grid item xs={ 4 }>
          <Stack spacing={ 1 }>
            <Typography variant="h5" mb={ 1.5 }>Mã nhân viên:</Typography>
            <Typography variant="body1" >{ 'user' in inf ? inf['user']['id'] : '----------------------------' }</Typography>
          </Stack>
        </Grid>
        <Grid item xs={ 4 }>
          <Stack spacing={ 1 }>
            <Typography variant="h5" mb={ 1.5 }>Mã thẻ:</Typography>
            <Typography variant="body1" >{ 'user' in inf ? inf['user']['card_id'] : '----------------------------' }</Typography>
          </Stack>
        </Grid>
        <Grid item xs={ 4 }>
          <Stack spacing={ 1 }>
            <Typography variant="h5" mb={ 1.5 }>Họ và tên:</Typography>
            <Typography variant="body1" >{ 'user' in inf ? inf['user']['name'] : '----------------------------' }</Typography>
          </Stack>
        </Grid>
        <Grid item xs={ 3.5 }>
          <Stack spacing={ 1 }>
            <Typography variant="h5" mb={ 1.5 }>Email:</Typography>
            <Typography variant="body1" >{ 'user' in inf ? inf['user']['email'] : '----------------------------' }</Typography>
          </Stack>
        </Grid>
        <Grid item xs={ 3.5 }>
          <Stack spacing={ 1 }>
            <Typography variant="h5" mb={ 1.5 }>Số điện thoại:</Typography>
            <Typography variant="body1" >{ 'user' in inf ? inf['user']['phone_number'] : '----------------------------' }</Typography>
          </Stack>
        </Grid>
        <Grid item xs={ 2.5 }>
          <Stack spacing={ 1 }>
            <Typography variant="h5" mb={ 1.5 }>Ngày sinh:</Typography>
            <Typography variant="body1" >{ 'user' in inf ? inf['user']['dob'] : '----------------------------' }</Typography>
          </Stack>
        </Grid>
        <Grid item xs={ 2.5 }>
          <Stack spacing={ 1 }>
            <Typography variant="h5" mb={ 1.5 }>Giới tính:</Typography>
            <Typography variant="body1" >{ 'user' in inf ? inf['user']['gender'] : '----------------------------' }</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserLogCard