import faker from 'faker';
import { sample } from 'lodash';
// utils

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Daal Khichdi',
  'Paneer Masala',
  'Paneer Chilli',
  'Matar Paneer',
  'Daal Tadka',
  'Buttor Puneer',
  'Dum Biryanee',
  'Veg. Biryani',
  'Pulava',
  'Pav Bhaji',
  'Missal Pav',
  'Edli Sambhar',
  'Daal Vada',
  'Haydrabadi Biryani',
  'Manchao Shoup',
  'Veg. Soup',
  'Tripple Rice',
  'Fried Rice',
  'Aloo Ki Sabji',
  'Poha',
  'Veg. Handi',
  'Paneer Tikka',
  'Chiken Tikka',
  'Dosa'
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover:
      'https://lh3.googleusercontent.com/EGD6C34eosVtKkElJybCOXIaOC-_iw5lYXzOmGdfMpjtaqijt1Oym_ltWjs5uyx3d8jo0ew8rg7tzFVMWszKGSbL3Ny_=w256',
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', ''])
  };
});

export default products;
