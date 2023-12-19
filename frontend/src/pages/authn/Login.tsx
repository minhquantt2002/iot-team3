import { Link } from 'react-router-dom'

import { Box, Grid, Stack, Typography } from '@mui/material'

import AuthLogin from './AuthLogin'

const Login = () => (
  <Box bgcolor={'#fafafb'}>
    <Grid
      item
      xs={12}
      container
      justifyContent='center'
      alignItems='center'
      sx={{ minHeight: { xs: '100vh', md: '100vh' } }}
    >
      <Grid
        container
        spacing={5}
        sx={{
          maxWidth: { xs: 500, lg: 475 },
          margin: { xs: 2.5, md: 3 },
          '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
          },
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px'
        }}
      >
        <Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mb: { xs: -0.5, sm: 0.5 }, position: 'relative', zIndex: 10 }}
            >
              <Typography variant="h3">Login</Typography>
              <Typography
                component={Link}
                to="/register"
                variant="body2"
                sx={{ textDecoration: 'none' }}
                color="primary"
              >
                Don&apos;t have an account?
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AuthLogin />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
)

export default Login
