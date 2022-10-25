import { IMAGES } from "../assets/ProductImages";
import { hidden } from "./Icons/Icons";
import { INIT_CARD } from "./Cards";

export const CODES = {
  SAV15: 0.15,
  SAV20: 0.20,
  SAV50: 0.50,
  JSX25: 0.25,
};

export const INIT_FORM = {
  email: '',
  pass: '',
  passConfirm: '',
  firstName: '',
  lastName: '',
  zipCode: '',
};

export const TEST_USER = {
  email: 'user@domain.com',
  pass: 'pass@1234',
  passConfirm: 'pass@1234',
  firstName: 'Andrew',
  lastName: 'Chowning',
  zipCode: '47386',
};

export const INIT_DATA = [
  {img: IMAGES.product1, alt: 'code snippet', category: 'FORMS', title: 'InputBase', description: 'The only component you will need for all your basic form needs!', id: '0', price: 24.99, quantity: 0, productTotal: 0},
  {img: IMAGES.product2, alt: 'code snippet', category: 'UI CONTROL', title: 'Theme Toggle', description: 'Keep the UI synced with user theme with this unique component!', id: '1', price: 27.49, quantity: 0, productTotal: 0},
  {img: IMAGES.product3, alt: 'code snippet', category: 'DATASETS', title: 'Data Manager', description: 'Handle user input data and keep everything organized!', id: '2', price: 32.97, quantity: 0, productTotal: 0},
  {img: IMAGES.product4, alt: 'code snippet', category: 'FORMS', title: 'Submit Handler', description: 'Prevent default form submissions and handle data your way!', id: '3', price: 19.98, quantity: 0, productTotal: 0},
];

export const INIT_DATA_RELOAD = [
  {img: IMAGES.product1, alt: 'code snippet', category: 'FORMS', title: 'InputBase', description: 'The only component you will need for all your basic form needs!', id: '0', price: 24.99, quantity: 0, productTotal: 0},
  {img: IMAGES.product2, alt: 'code snippet', category: 'UI CONTROL', title: 'Theme Toggle', description: 'Keep the UI synced with user theme with this unique component!', id: '1', price: 27.49, quantity: 0, productTotal: 0},
  {img: IMAGES.product3, alt: 'code snippet', category: 'DATASETS', title: 'Data Manager', description: 'Handle user input data and keep everything organized!', id: '2', price: 32.97, quantity: 0, productTotal: 0},
  {img: IMAGES.product4, alt: 'code snippet', category: 'FORMS', title: 'Submit Handler', description: 'Prevent default form submissions and handle data your way!', id: '3', price: 19.98, quantity: 0, productTotal: 0},
];

export const INIT_PRICE_DATA = {
  subtotal: 0,
  shipping: 0,
  discount: 0,
  total: 0,
};

export const INIT_SHIPPING_DATA = {
  addresseeName: '',
  streetAddress: '',
  country: '',
  city: '',
  state: '',
  zipCode: '',
  cellPhone: '',
  shippingMethod: '',
};


export const INIT_PASS = {
  passVisible: false,
  passIcon: hidden,
  passType: 'password',
};

export const INIT_CREATE = [
  {header: 'Your E-Mail Address', label: '', name: 'email', type: 'text', error: 'emailError'},
  {header: 'Create Password', label: '', name: 'pass', type: 'password', error: 'passError', id: 'password', isPass: true},
  {header: 'Confirm Password', label: '', name: 'passConfirm', type: 'password', error: 'passConfirmError', id: 'password', isPass: true},
  {header: 'First Name', label: '', name: 'firstName', type: 'text', error: 'firstNameError'},
  {header: 'Last Name', label: '', name: 'lastName', type: 'text', error: 'lastNameError'},
  {header: 'Zip Code', label: '', name: 'zipCode', type: 'text', error: 'zipCodeError'},
];

export const INIT_SIGN = [
  {header: 'Enter E-Mail *', label: '', name: 'email', type: 'text', error: 'emailError'},
  {header: 'Enter Password *', label: '', name: 'pass', type: 'password', error: 'passError', id: 'password', isPass: true},
];

export const INIT_SHIPPING_INPUT = [
  {header: 'Full Name', label: '', name: 'addresseeName', type: 'text', error: 'addresseeNameError'},
  {header: 'Street Address', label: '', name: 'streetAddress', type: 'text', error: 'streetAddressError'},
  {header: 'Country', label: '', name: 'country', type: 'text', error: 'countryError'},
  {header: 'City', label: '', name: 'city', type: 'text', error: 'cityError'},
  {header: 'State', label: '', name: 'state', type: 'text', error: 'stateError'},
  {header: 'Zip Code', label: '', name: 'zipCode', type: '', error: 'zipCodeError'},
  {header: 'Cell Phone Number', label: '', name: 'cellPhone', type: 'text', error: 'cellPhoneError'},
]

export const INIT_USER_DATA = {
  formData: INIT_FORM,
  itemData: INIT_DATA,
  priceData: INIT_PRICE_DATA,
  shippingData: INIT_SHIPPING_DATA,
  paymentData: INIT_CARD,
  itemSummary: [],
}

export const INIT_STATE = {
  userSignedIn: false,
  userCheckout: false,
  userShipping: false,
  userPayment: false,
  userConfirmedPay: false,
  users: [TEST_USER],
  currentUser: '',
  userData: INIT_USER_DATA,
}