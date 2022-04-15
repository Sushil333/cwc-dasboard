import React, { useState, useEffect, useRef } from 'react';
import { CSVLink } from 'react-csv';

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
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ReactToPrint from 'react-to-print';

import ComponentToPrint from './ComponentToPrint';

import Page from '../components/Page';
import * as API from '../api/index';

const TableTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3)
}));

export default function Orders() {
  const [placedOrders, setPlacedOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  let componentRef = useRef();

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
        <TableTitle className="d-flex">
          <Typography variant="h4" gutterBottom>
            All orders
          </Typography>
          {placedOrders && (
            <CSVLink data={placedOrders} filename="my-file.csv" target="_blank">
              <Button variant="contained" color="secondary">
                Export to CSV
              </Button>
            </CSVLink>
          )}
        </TableTitle>

        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="right">Dish Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Ordered Time</TableCell>
                <TableCell align="right">Invoice</TableCell>
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
                    <TableCell align="right">
                      <ReactToPrint
                        trigger={() => <Button>Print Invoice</Button>}
                        content={() => componentRef}
                      />
                    </TableCell>
                    <TableCell style={{ display: 'none' }} key={row._id}>
                      <ComponentToPrint ref={(el) => (componentRef = el)} data={row} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
