import React, { useState, useEffect } from 'react';
// material
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

// components
import Page from '../components/Page';
import * as API from '../api/index';
import AppWeeklySales from '../components/_dashboard/app/AppWeeklySales';
import AppNewUsers from '../components/_dashboard/app/AppNewUsers';
import AppItemOrders from '../components/_dashboard/app/AppItemOrders';
import AppBugReports from '../components/_dashboard/app/AppBugReports';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [displayData, setDisplayData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = (id) => {
    API.getDisplayData(id)
      .then((res) => {
        setDisplayData(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    API.getUserStore().then((res) => {
      fetchData(res.data.data._id);
    });
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome Back</Typography>
        </Box>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            {loading && <Skeleton variant="rectangular" width={230} height={230} />}
            {!loading && <AppItemOrders orders={displayData.totalOrders} />}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {loading && <Skeleton variant="rectangular" width={230} height={230} />}
            {!loading && <AppBugReports revenue={displayData.totalRevenue} />}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
