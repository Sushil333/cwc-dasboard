import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
// formik and yep
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// iconify
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import infoFill from '@iconify/icons-eva/info-fill';
import { Icon } from '@iconify/react';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
  Collapse
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { login } from '../../../redux/actions/userActions';
// ----------------------------------------------------------------------

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  useEffect(() => {
    if (error) {
      setAlertOpen(true);
    } else {
      setAlertOpen(false);
    }
  }, [error]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login(values, navigate));
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: 3 }}>
          {error && (
            <Collapse in={alertOpen}>
              <Alert
                icon={<Icon icon={infoFill} color="#ff4842" />}
                severity="error"
                color="error"
                onClose={() => {
                  setAlertOpen(false);
                }}
              >
                {error}
              </Alert>
            </Collapse>
          )}
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting && loading}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
