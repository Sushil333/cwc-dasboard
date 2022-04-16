import { Container } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props };
  }

  render() {
    return (
      <Container>
        <h2 style={{ textAlign: 'center', paddingBottom: '1em' }}>
          <img
            src="/static/logo.jpeg"
            alt="logo"
            height="120px"
            style={{ margin: '0 auto', paddingTop: '1em' }}
          />
          Cooked With Care
        </h2>
        <TableContainer>
          <Table sx={{ maxWidth: 350, margin: '0 auto' }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell variant="head">Dish Name</TableCell>
                <TableCell>{this.state.data.dishName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell variant="head">Address</TableCell>
                <TableCell>{this.state.data.address}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell variant="head">Ordered on date</TableCell>
                <TableCell>{new Date(this.state.data.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell variant="head">Price</TableCell>
                <TableCell>{this.state.data.price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default ComponentToPrint;
