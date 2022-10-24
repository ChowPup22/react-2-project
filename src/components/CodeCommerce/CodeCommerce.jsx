import React from 'react';
import SignIn from '../SignIn/SignIn';
import CustomerCart from '../CustomerCart/CustomerCart';
import ShippingInfo from '../ShippingInfo/ShippingInfo';
import { INIT_STATE } from '../../Constants/States';
import PaymentInfo from '../PaymentInfo/PaymentInfo';
import Confirmation from '../Confirmation/Confirmation';

class CodeCommerce extends React.Component {
  constructor() {
    super();
    this.state = INIT_STATE;
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
      currentUser,
    } = this.state;
    return(
      <div>
        {!userSignedIn ? <SignIn handleState={this.handleStateData} users={users} userData={userData}/> : null}
        {userSignedIn && !userCheckout ? <CustomerCart handleState={this.handleStateData} userData={userData} /> : null}
        {userCheckout && !userShipping ? <ShippingInfo handleState={this.handleStateData} userData={userData} /> : null}
        {userShipping && !userPayment ? <PaymentInfo handleState={this.handleStateData} userData={userData} /> : null}
        {userPayment && !userConfirmedPay ? <Confirmation handleState={this.handleStateData} userData={userData} currentUser={currentUser} /> : null}
      </div>
    )
  }
};

export default CodeCommerce;