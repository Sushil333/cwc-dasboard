import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// material
import { Box, Card, Link, Typography, Stack, IconButton, Button } from '@mui/material';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { fetchStoreDishes } from '../../../redux/actions/storeActions';
import * as api from '../../../api';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function ShopProductCard({ product }) {
  const { dishName, imgUrl, price, _id, status } = product;
  const [dishStatus, setDishStatus] = useState(status);

  // Snackbar state
  const [snackbarConf, setSnackbarConf] = useState({
    message: '',
    severity: '',
    open: false
  });

  const dispatch = useDispatch();

  const handleDelete = async () => {
    console.log(_id);
    const res = await api.deleteStoreDishes({ dishId: _id }).catch((err) => console.log(err));
    if (res) {
      dispatch(fetchStoreDishes());
    }
  };

  // Snackbar handler
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarConf((prevState) => ({ ...prevState, open: false }));
  };

  const handleStatus = async () => {
    try {
      const res = await api.disableDish({ dishId: _id, status: !dishStatus });
      setDishStatus(res.data.data.status);
      setSnackbarConf({
        message: dishStatus ? 'Dish is enabled' : 'Dish is disabled',
        severity: 'success',
        open: true
      });
    } catch (err) {
      console.log(err.response);
      setSnackbarConf({
        message: err.response.data.data,
        severity: 'error',
        open: true
      });
    }
  };

  return (
    <>
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
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <ProductImgStyle alt={dishName} src={imgUrl} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {dishName}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <ColorPreview colors={colors} /> */}
            <Typography variant="subtitle1">
              {/* <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography> */}
              {/* fCurrency(price) */}₹ {price}
            </Typography>
            <div>
              <IconButton variant="contained" color="success" onClick={handleDelete}>
                <Icon icon={trash2Fill} width={24} height={24} />
              </IconButton>

              <Button onClick={handleStatus}>{dishStatus ? 'Enable' : 'Disable'}</Button>
            </div>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
