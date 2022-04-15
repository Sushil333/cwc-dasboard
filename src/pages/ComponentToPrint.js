import { Container } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props };
  }

  render() {
    return (
      <Container>
        <h2 style={{ textAlign: 'center', marginTop: '2em', marginBottom: '1em' }}>
          Cooked With Care
        </h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dish Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {this.state.data.dishName}
                </TableCell>
                <TableCell align="right">{this.state.data.price}</TableCell>
                <TableCell align="right">{this.state.data.address}</TableCell>
                <TableCell align="right">{this.state.data.createdAt}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default ComponentToPrint;
