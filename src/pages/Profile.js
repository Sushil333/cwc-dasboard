import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';

import * as API from '../api/index';

function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function Profile() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLogin.userInfo);
  const [loading, setLoading] = useState(false);
  // Snackbar state
  const [snackbarConf, setSnackbarConf] = useState({
    message: '',
    severity: '',
    open: false
  });

  // Snackbar handler
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarConf((prevState) => ({ ...prevState, open: false }));
  };

  const initialFormState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('Password did not match!');
      setLoading(false);
      return false;
    }
    try {
      const res = await API.resetPassword(formData);
      setSnackbarConf({
        message: res.data.data,
        severity: 'success',
        open: true
      });
      setFormData({ ...initialFormState });
      setLoading(false);
      navigate('/');
    } catch (e) {
      console.log(e.response.data.data);
      setSnackbarConf({
        message: e.response.data.data,
        severity: 'error',
        open: true
      });
      setLoading(false);
    }
    return true;
  };

  return (
    <Container>
      <Snackbar
        open={snackbarConf.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={snackbarConf.severity} sx={{ width: '100%' }}>
          {snackbarConf.message && snackbarConf.message}
        </Alert>
      </Snackbar>

      <Stack spacing={5}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          alignItems="center"
        >
          <Avatar {...stringAvatar(user.name)} sx={{ width: 56, height: 56, bgcolor: '#00AB55' }} />
          <Typography variant="h3">{user.name}</Typography>
        </Stack>

        <form style={{ maxWidth: '450px' }} onSubmit={handleSubmit}>
          <Paper elevation={3} sx={{ padding: '2em' }}>
            <Stack spacing={3}>
              <Typography variant="h5">Change Password</Typography>
              <TextField
                id="outlined-basic"
                label="Old Passowrd"
                variant="outlined"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="New Passowrd"
                variant="outlined"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                inputProps={{ minLength: 6 }}
                required
              />
              <TextField
                id="outlined-basic"
                label="Confirm New Passowrd"
                variant="outlined"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                inputProps={{ minLength: 6 }}
                required
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                Change Password
              </LoadingButton>
            </Stack>
          </Paper>
        </form>
      </Stack>
    </Container>
  );
}
