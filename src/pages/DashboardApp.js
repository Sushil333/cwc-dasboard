// material
import { Box, Container, Typography, Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import { fCurrency } from '../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome Back</Typography>
        </Box>

        <Grid container spacing={2}>
          {/* left side */}
          <Grid item xs={8} sm={12} md={8}>
            k
          </Grid>
          {/* right side */}
          <Grid item xs={3} sm={12} md={3}>
            <RootStyle>
              <Typography variant="h2" sx={{ color: 'text.primary' }}>
                ₹{fCurrency(2000)}
              </Typography>
              <Typography variant="subtitle2">Total Revenue</Typography>
            </RootStyle>
          </Grid>
        </Grid>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        {/* </Grid> */}
      </Container>
    </Page>
  );
}
