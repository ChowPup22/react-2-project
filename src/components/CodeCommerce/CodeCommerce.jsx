import React from 'react';
import SignIn from '../SignIn/SignIn';
import CustomerCart from '../CustomerCart/CustomerCart';
import ShippingInfo from '../ShippingInfo/ShippingInfo';
import { INIT_FORM, INIT_DATA, INIT_PRICE_DATA, INIT_SHIPPING_DATA, TEST_USER } from '../constants';

class CodeCommerce extends React.Component {
  constructor() {
    super();
    this.state = {
      userSignedIn: false,
      userCheckout: false,
      userShipping: false,
      userPayment: false,
      userConfirmedPay: false,
      users: [TEST_USER],
      currentUser: {},
      userData: {
        formData: INIT_FORM,
        itemData: INIT_DATA,
        priceData: INIT_PRICE_DATA,
        shippingData: INIT_SHIPPING_DATA,
      }
    }
  };

  handleStateData = (name, value) => (
    this.setState(prev => ({
      ...prev,
      [name]: value,
    }))
  );

  render() {
    const {
      userSignedIn,
      userCheckout,
      userShipping,
      userPayment,
      userConfirmedPay,
      userData,
      users,
      currentUser
    } = this.state;
    return(
      <div>
        {userSignedIn ? <SignIn handleState={this.handleStateData} users={users} formData={userData.formData}/> : null}
        {!userSignedIn && !userCheckout ? <CustomerCart handleState={this.handleStateData} itemData={userData.itemData} priceData={userData.priceData}/> : null}
        {userCheckout && !userShipping ? <ShippingInfo handleState={this.handleStateData} priceData={userData.priceData} shippingData={userData.shippingData}/> : null}
      </div>
    )
  }
};

export default CodeCommerce;