import React from "react";
import styles from './ShippingInfo.module.css';
import InputBase from "../InputBase/InputBase";
import { cellPhoneValidation, onlyTextValidation, streetAddressValidation, zipCodeValidation } from '../../Constants/Validations';
import CartSummary from "../CartSummary/CartSummary";
import { INIT_SHIPPING_INPUT } from "../../Constants/States";

class ShippingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      userData: this.props.userData,
    }
  };

  handleState = (name, value) => {
    this.props.handleState(name, value);
  };

  handleInputData = ({ target: {name, value}}) => {
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        shippingData: {
          ...prevState.userData.shippingData,
          [name]: value,
        }
      }
    }));
  };

  handleValidations = (type, value) => {
    let errorText; 
    switch(type) {
      case 'addresseeName':
        errorText = onlyTextValidation(value);
        this.setState(prev => ({
          error: {
            ...prev.error,
            addresseeNameError: errorText,
          }
        }));
        break;
      case 'streetAddress':
        errorText = streetAddressValidation(value);
        this.setState(prev => ({
          error: {
            ...prev.error,
            streetAddressError: errorText,
          }
        }));
        break;
      case 'country':
        errorText = onlyTextValidation(value);
        this.setState(prev => ({
          error: {
            ...prev.error,
            countryError: errorText,
          }
        }));
        break;
      case 'state':
        errorText = onlyTextValidation(value);
        this.setState(prev => ({
          error: {
            ...prev.error,
            stateError: errorText,
          }
        }));
        break;
      case 'city':
        errorText = onlyTextValidation(value);
        this.setState(prev => ({
          error: {
            ...prev.error,
            cityError: errorText,
          }
        }));
        break;
      case 'zipCode':
        errorText = zipCodeValidation(value);
        this.setState(prev => ({
          error: {
            ...prev.error,
            zipCodeError: errorText,
          }
        }));
        break;
      case 'cellPhone':
        errorText = cellPhoneValidation(value);
        this.setState(prev => ({
          error: {
            ...prev.error,
            cellPhoneError: errorText,
          }
        }));
        break;
      default:
        break;
    }
  };

  handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);

  checkErrorBeforeSave = () => {
    const { userData, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(userData.shippingData).forEach((val) => {
      if (!userData.shippingData[val].length) {
        errorValue = {...errorValue, [`${val}Error`] : 'Required'};
        isError = true;
      } else if (error[`${val}Error`]) {
        errorValue = {...errorValue, [`${val}Error`] : error[`${val}Error`]};
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleShipping = (e) => {
    const  { subtotal, discount } = this.state.userData.priceData;

    if(e.target.id === 'freeShipping') {
      this.setState(prev => ({
        userData: {
          ...prev.userData,
          priceData: {
            ...prev.userData.priceData,
            shipping: 0,
            total: subtotal - discount,
          },
          shippingData: {
            ...prev.userData.shippingData,
            shippingMethod: 'Free',
          }
        }
      }))
    } else if (e.target.id === 'rushShipping') {
      this.setState(prev => ({
        userData: {
          ...prev.userData,
          priceData: {
            ...prev.userData.priceData,
            shipping: 12.99,
            total: ((subtotal - discount) + 12.99).toFixed(2),
          },
          shippingData: {
            ...prev.userData.shippingData,
            shippingMethod: 'Rush',
          }
        }
      }))
    }
  }

  handleProceed = (e) => {
    e.preventDefault();
    let errorCheck = this.checkErrorBeforeSave();

    if(!errorCheck) {
      this.handleState('userData', this.state.userData);
      this.handleState('userShipping', true);
    }
  }

  handleReturn = () => {
    this.handleState('userCheckout', false)
  }

  render() {
    const {
      userData,
      error,
      itemSummary,
    } = this.state;

    
    return (
     <div className={styles.shipping_page_wrap}>
        <div className={styles.shipping_wrap}>
          <form>
            {INIT_SHIPPING_INPUT.length ? INIT_SHIPPING_INPUT.map((item) => (
              // file deepcode ignore ReactMissingArrayKeys: <n/a>
              <InputBase
              header={item.header}
              placeholder={item.label}
              value={userData.shippingData && userData.shippingData[item.name]}
              onChange={this.handleInputData}
              autoComplete= 'off'
              name={item.name}
              onBlur={this.handleBlur}
              errorM={
                (error
                && error[item.error]
                && error[item.error].length > 1)
                ? error[item.error]
                : null
              }
              />
            )) : null}
          </form>
          <div className={styles.radial_wrap}>
            <label>
              <input onChange={this.handleShipping} type="radio" name="radioResponse" id="freeShipping" />
              Free Shipping- <br/> (5-7 business days)
            </label>
            <label>
              <input onChange={this.handleShipping} type="radio" name="radioResponse" id="rushShipping" />
              Rush Shipping- <br/> (1-3 business days)
            </label>
          </div>
          <input type="button" value="BACK TO CART" className={styles.btn_return} onClick={this.handleReturn} />
        </div>
        <CartSummary
        isShipping={true}
        userData={userData}
        handleProceed={this.handleProceed}
        />
      </div>
    )
  }
};

export default ShippingInfo;