import React from 'react';
import SignIn from '../SignIn/SignIn';
import CustomerCart from '../CustomerCart/CustomerCart';
import ShippingInfo from '../ShippingInfo/ShippingInfo';
import { INIT_FORM, INIT_DATA, INIT_PRICE_DATA, INIT_SHIPPING_DATA, TEST_USER, INIT_CARD } from '../constants';
import PaymentInfo from '../PaymentInfo/PaymentInfo';
import Confirmation from '../Confirmation/Confirmation';

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
        paymentData: INIT_CARD,
      },
      itemSummary: [],
      shippingSummary: {},
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
      itemSummary,
      shippingSummary,
      currentUser,
    } = this.state;
    return(
      <div>
        {userSignedIn ? <SignIn handleState={this.handleStateData} users={users} userData={userData}/> : null}
        {!userSignedIn && !userCheckout ? <CustomerCart handleState={this.handleStateData} userData={userData} /> : null}
        {userCheckout && !userShipping ? <ShippingInfo handleState={this.handleStateData} userData={userData} itemSummary={itemSummary} /> : null}
        {userShipping && !userPayment ? <PaymentInfo handleState={this.handleStateData} userData={userData} itemSummary={itemSummary} /> : null}
        {userPayment && userConfirmedPay ? <Confirmation userData={userData} itemSummary={itemSummary} shippingSummary={shippingSummary} /> : null}
      </div>
    )
  }
};

export default CodeCommerce;