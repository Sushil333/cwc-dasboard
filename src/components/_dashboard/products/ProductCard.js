import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// material
import { Box, Card, Link, Typography, Stack, IconButton } from '@mui/material';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
// utils
// import { fCurrency } from '../../../utils/formatNumber';
// //
// import ColorPreview from '../../ColorPreview';
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

export default function ShopProductCard({ product }) {
  const { dishName, imageUrl, price, _id } = product;
  const dispatch = useDispatch();

  const handleDelete = async () => {
    console.log(_id);
    const res = await api.deleteStoreDishes({ dishId: _id }).catch((err) => console.log(err));
    if (res) {
      dispatch(fetchStoreDishes());
    }
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={dishName} src={imageUrl} />
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
          <IconButton variant="contained" color="success" onClick={handleDelete}>
            <Icon icon={trash2Fill} width={24} height={24} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
