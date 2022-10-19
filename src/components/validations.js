export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Alphabetical characters only';
    }
  } else {
    return undefined;
  }
};

export const streetAddressValidation = (value) => {
  if (value) {
    if (/^[#.0-9a-zA-Z\s,-]+$/i.test(value)) {
      return undefined;
    } else {
      return 'No special characters allowed';
    }
  } else {
    return undefined;
  }
};

export const zipCodeValidation = (value) => {
  if (value) {
    if (/^\d{5}([ \-]\d{4})?$/i.test(value)) {
      return undefined;
    } else {
      return 'Numeric characters only. **12345(-1234)**';
    }
  } else {
    return undefined;
  }
};

export const cellPhoneValidation = (value) =>{
  if (value) {
    if (/^(\\d{3}[- ]?){2}\\d{4}$/i.test(value)) {
      return undefined;
    } else {
      return 'Numeric characters and "-" only';
    }
  } else {
    return undefined;
  }
}

export const emailValidation = (value) => {
  if (value) {
    if (/\S+@\S+\.\S+/i.test(value)) {
      return undefined;
    } else {
      return 'Not a valid Email format';
    }
  } else {
    return undefined;
  }
};

export const passwordValidation = (value) => {
  if (value) {
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i.test(value)) {
      return undefined;
    } else {
      return 'Password does not meet the minimum requirements';
    }
  } else {
    return undefined;
  }
}