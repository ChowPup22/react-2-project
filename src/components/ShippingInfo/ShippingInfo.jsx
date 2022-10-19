import React from "react";
import './ShippingInfo.css';
import InputBase from "../InputBase/InputBase";
import { INIT_SHIPPING_INPUT } from '../constants';
import { cellPhoneValidation, onlyTextValidation, streetAddressValidation, zipCodeValidation } from '../validations';

class ShippingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleState();
    this.state = {
      error: {},
      userData: {
        shippingData: props.shippingData,
        priceData: props.priceData,
      }
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

  render() {
    const {
      userData,
      error
    } = this.state;

    return (
      <div>
        <h2>Hi</h2>
        {INIT_SHIPPING_INPUT.length ? INIT_SHIPPING_INPUT.map((item) => (
            // file deepcode ignore ReactMissingArrayKeys: <n/a>
            <InputBase
            header={item.header}
            placeHolder={item.label}
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
      </div>
    )
  }
};

export default ShippingInfo;