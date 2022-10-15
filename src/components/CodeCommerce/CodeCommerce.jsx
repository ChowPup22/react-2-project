import React from 'react';
import CustomerCart from '../CustomerCart/CustomerCart';
import SignIn from '../SignIn/SignIn';

class CodeCommerce extends React.Component {
  constructor() {
    super();
    this.state = {
      userSignedIn: false,
      userCheckout: false,
      userShipping: false,
      userPayment: false,
      userConfirmedPay: false,
    }
  }

  render() {
    const {
      userSignedIn,
      userCheckout,
      userShipping,
      userPayment,
      userConfirmedPay,
    } = this.state;
    return(
      <div>
        {userSignedIn ? <SignIn/> : null}
        {!userCheckout ? <CustomerCart/> : null}
      </div>
    )
  }
}

export default CodeCommerce;