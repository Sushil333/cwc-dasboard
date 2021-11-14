import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Divider, Typography } from '@mui/material';
import googleFill from '@iconify/icons-eva/google-fill';
import { Icon } from '@iconify/react';

import { GoogleLogin } from 'react-google-login';

// import twitterFill from '@iconify/icons-eva/twitter-fill';
// import facebookFill from '@iconify/icons-eva/facebook-fill';
// material

import * as actionType from '../../constants/userConstants';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      console.log(result);
      dispatch({ type: actionType.USER_LOGIN_SUCCESS, payload: { ...result, token } });
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (e) => console.log(e);
  return (
    <>
      <Stack direction="row" spacing={2}>
        <GoogleLogin
          clientId="1037570333853-37cksdceoqhnfv03ml80eam2qcvhqi9l.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Continue with Google &nbsp;&nbsp;
              <Icon icon={googleFill} color="#DF3E30" height={24} />
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />

        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}

// 1037570333853-37cksdceoqhnfv03ml80eam2qcvhqi9l.apps.googleusercontent.com
