import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';

import { GoogleLogin } from 'react-google-login';

import { AUTH } from '../../constants/actionTypes';

import { Stack, Button, Divider, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      console.log(res);
      // dispatch({ type: AUTH, data: { result, token } });
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');
  return (
    <>
      <Stack direction="row" spacing={2}>
      <GoogleLogin
        clientId="1037570333853-37cksdceoqhnfv03ml80eam2qcvhqi9l.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button fullWidth size="large" color="inherit" variant="outlined">
            Continue with Google &nbsp;&nbsp; <Icon icon={googleFill} color="#DF3E30" height={24} />
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