import { useFormik, Form, FormikProvider } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material
import {
  Container,
  Stack,
  Typography,
  TextField,
  Box,
  Modal,
  Button,
  Alert,
  Collapse
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import infoFill from '@iconify/icons-eva/info-fill';

// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/products';
//
// import PRODUCTS from '../_mocks_/products';
import { createDish, fetchStoreDishes } from '../redux/actions/storeActions';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  // const [openFilter, setOpenFilter] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const dispatch = useDispatch();

  const createDishStore = useSelector((state) => state.createDish);
  const { formLoading, error } = createDishStore;

  const getStoreDishesStore = useSelector((state) => state.fetchStoreDishes);
  const { allDishes, fetching, error: noStoreError } = getStoreDishesStore;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchStoreDishes());
    if (error) {
      setAlertOpen(true);
    } else {
      setAlertOpen(false);
    }
    if (!formLoading) {
      setOpen(false);
    }
  }, [error, formLoading, dispatch]);

  // const URL =
  //   /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const formValidationScema = Yup.object().shape({
    dishName: Yup.string().required('Dish name required'),
    description: Yup.string().required('Description is rquired'),
    price: Yup.string().required('Dish price is rquired')
    // imageUrl: Yup.string().required('Image url is rquired')
    // dishImg: Yup.object().required('This field is required')
  });

  const formik = useFormik({
    initialValues: {
      dishName: '',
      description: '',
      price: ''
    },
    validationSchema: formValidationScema,
    onSubmit: (values) => {
      const data = new FormData();
      data.append('dishName', values.dishName);
      data.append('description', values.description);
      data.append('price', values.price);
      data.append('dishImg', values.dishImg);

      dispatch(createDish(data));
      dispatch(fetchStoreDishes());
      // setOpen(false);
      // formik.resetForm();
    }
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4
  };

  const { errors, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  // const handleResetFilter = () => {
  //   handleSubmit();
  //   resetForm();
  // };

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
          <Typography variant="h4">Products</Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            + Add
          </Button>
        </Stack>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{ mb: 2 }}>
              Create Dish
            </Typography>
            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Stack sx={{ mb: 2 }}>
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
                <Stack sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Dish Name"
                    {...getFieldProps('dishName')}
                    error={Boolean(touched.dishName && errors.dishName)}
                    helperText={touched.dishName && errors.dishName}
                    sx={{ mb: 2 }}
                  />

                  {/* <TextField
                    fullWidth
                    type="url"
                    label="Image Url"
                    {...getFieldProps('imageUrl')}
                    error={Boolean(touched.imageUrl && errors.imageUrl)}
                    helperText={touched.imageUrl && errors.imageUrl}
                    sx={{ mb: 2 }}
                  /> */}
                  <Stack sx={{ mb: 2 }}>
                    {/* <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                      Choose Avatar */}
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      name="dishImg"
                      onChange={(e) => {
                        setFieldValue('dishImg', e.currentTarget.files[0]);
                      }}
                    />
                    {/* </Button> */}
                  </Stack>

                  <TextField
                    fullWidth
                    type="number"
                    label="Price"
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="Description"
                    {...getFieldProps('description')}
                    multiline
                    rows={4}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    sx={{ mb: 2 }}
                  />
                </Stack>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting && formLoading}
                >
                  Add dish
                </LoadingButton>
              </Form>
            </FormikProvider>
          </Box>
        </Modal>
        {allDishes && <ProductList products={allDishes.storesAllDishes} />}
        {fetching && <div>Loading...</div>}
        {!fetching && allDishes && allDishes.storesAllDishes <= 0 && (
          <h4 align="center">No Records Found</h4>
        )}
        {/* <ProductCartWidget /> */}
        {!fetching && noStoreError && <div>{noStoreError}</div>}
      </Container>
    </Page>
  );
}
