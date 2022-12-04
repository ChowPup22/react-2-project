import React from "react";
import { Country, State, City }  from 'country-state-city';
import styles from './ShippingInfo.module.css';
import InputBase from "../InputBase/InputBase";
import { validations } from '../../Constants/Validations';
import CartSummary from "../CartSummary/CartSummary";
import { INIT_SHIPPING_INPUT } from "../../Constants/States";


class ShippingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      userData: this.props.userData,
      countryOptions: [{name: 'Select Country', id: ''}, {name: 'United States', id: 'US'}, {name: 'Canada', id: 'CA'}, {name: 'Mexico', id: 'MX'}],
      countrySelected: '',
      stateOptions: [],
      stateSelected: '',
      cityOptions: [],
      citySelected: '',
    }
  };

  handleState = (name, value) => {
    this.props.handleState(name, value);
  };

  handleSelect = (name, value) => {
    const { userData, countryOptions } = this.state;
    userData.shippingData[name] = value;
    this.setState({ userData });
    if(name === 'country') {
      const country = countryOptions.find((item) => item.name === value);
      console.log(country);
      this.setState({countrySelected: country.id});
      const stateOptions = State.getStatesOfCountry(country.id);
      this.setState({stateOptions});
    }
  }

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
    if(type === 'shippingMethod') {
      if (value) {
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            [`${type}Error`]: undefined,
          }
        }))
      } else {
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            [`${type}Error`]: 'Please select an option',
          }
        }));
      }
    } else {
      const errorText = validations[type](value);
      this.setState((prevState) => ({
        error: {
          ...prevState.error,
          [`${type}Error`]: errorText,
        }
      }));
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
            total: (subtotal - discount).toFixed(2),
          },
          shippingData: {
            ...prev.userData.shippingData,
            shippingMethod: 'Free',
          }
        }
      }), this.handleValidations('shippingMethod', true));
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
      }), this.handleValidations('shippingMethod', true));
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
      countryOptions,
      stateOptions,
      cityOptions,
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
              key={item.name}
              onBlur={this.handleBlur}
              select={item.type === 'select'}
              onSelect={this.handleSelect}
              optionscountry={item.name === 'country' ? countryOptions : null}
              optionsstate={item.name === 'state' ? stateOptions : null}
              optionscity={item.name === 'city' ? null : null}
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
            {error && error.radioResponseError && <div className={styles.error}>{error.radioResponseError}</div>}
            <label>
              <input onChange={this.handleShipping} type="radio" name="shippingMethod" id="freeShipping" />
              Free Shipping- <br/> (5-7 business days)
            </label>
            <label>
              <input onChange={this.handleShipping} type="radio" name="shippingMethod" id="rushShipping" />
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