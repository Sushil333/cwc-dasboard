import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Page from '../components/Page';
import * as API from '../api/index';

export default function Orders() {
  const [placedOrders, setPlacedOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    API.getPlacedOrders()
      .then((res) => {
        setPlacedOrders(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Typography variant="h4" gutterBottom>
          All orders
        </Typography>

        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="right">Dish Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Ordered Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* loading spinner */}
              {loading && (
                <TableRow>
                  <TableCell colSpan={7} align="center" scope="row">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}

              {/* loading data */}
              {!loading &&
                placedOrders.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="right">{row.dishName}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">{new Date(row.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
