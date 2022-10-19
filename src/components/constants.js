import { IMAGES } from "../assets/ProductImages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const hidden = <FontAwesomeIcon icon={faEye} className="pass-icon" id="pass-icon"/>;
export const visible = <FontAwesomeIcon icon={faEyeSlash} className="pass-icon" id="pass-icon"/>;
export const icon = <FontAwesomeIcon icon={faFacebook} className="fb-icon"/>;
export const CODES = ['JSX15', 'RJS15', '15OFF', 'SAV15', 'CCS15'];

export const INIT_FORM = {
  email: '',
  pass: '',
  passConfirm: '',
  firstName: '',
  lastName: '',
  zipCode: '',
};

export const TEST_USER = {
  email: 'andrew@domain.com',
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