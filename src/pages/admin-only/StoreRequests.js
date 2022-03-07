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
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import checkFill from '@iconify/icons-eva/checkmark-fill';
import linkFill from '@iconify/icons-eva/link-fill';

import Page from '../../components/Page';
import * as API from '../../api/index';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9)
// ];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  overflowY: 'auto'
};

export default function BasicTable() {
  const [storeRequets, setStoreRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalState, setModalState] = useState({ open: false });
  const handleOpen = (imgUrl) => {
    setModalState({ open: true, imgUrl });
  };
  const handleClose = () => setModalState({ open: false });

  const sendApprovedMail = async (emailID) => {
    const res = await API.sendApprovedMail(emailID);
    console.log(res.data.data);
  };

  useEffect(() => {
    API.storeRequests()
      .then((res) => {
        console.log(res.data.data);
        const ll = res.data.data.map((d) => ({
          id: d._id,
          storeName: d.storeName,
          email: d.email,
          phoneNo: d.phoneNo,
          aadharCard: d.aadharCard,
          panCard: d.panCard
        }));
        setStoreRequests(ll);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Typography variant="h4" gutterBottom>
          Store Requests
        </Typography>
        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Store Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Mobile No</TableCell>
                <TableCell align="right">View Aadhar</TableCell>
                <TableCell align="right">View Pan</TableCell>
                <TableCell align="right">Approve</TableCell>
                <TableCell align="right">Reject</TableCell>
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
                storeRequets.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.storeName}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phoneNo}</TableCell>

                    {/* aadhar modal */}
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => handleOpen(row.aadharCard)}
                      >
                        <Icon icon={linkFill} />
                      </IconButton>
                    </TableCell>

                    {/* Pan card modal */}
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => handleOpen(row.panCard)}
                      >
                        <Icon icon={linkFill} />
                      </IconButton>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton color="success" onClick={() => sendApprovedMail(row.email)}>
                        <Icon icon={checkFill} />
                      </IconButton>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton color="error">
                        <Icon icon={closeFill} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Modal
        open={modalState.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={modalState.imgUrl} alt="aadhar_card" />
        </Box>
      </Modal>
    </Page>
  );
}
