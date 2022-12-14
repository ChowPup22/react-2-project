import React from 'react';
import styles from './CodeCommerce.module.css'
import SignIn from '../SignIn/SignIn';
import CustomerCart from '../CustomerCart/CustomerCart';
import ShippingInfo from '../ShippingInfo/ShippingInfo';
import { INIT_STATE } from '../../Constants/States';
import PaymentInfo from '../PaymentInfo/PaymentInfo';
import Confirmation from '../Confirmation/Confirmation';
import ProgressBar from '../ProgressBar/ProgressBar';

class CodeCommerce extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INIT_STATE,
      step: 'signIn',
    };
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
      step,
      userData,
      users,
      currentUser,
    } = this.state;

    const steps = {
      'signIn': <SignIn handleState={this.handleStateData} users={users} userData={userData}/>,
      'cart': <CustomerCart handleState={this.handleStateData} userData={userData} />,
      'shipping': <ShippingInfo handleState={this.handleStateData} userData={userData} />,
      'payment': <PaymentInfo handleState={this.handleStateData} userData={userData} />,
      'confirmation': <Confirmation handleState={this.handleStateData} userData={userData} currentUser={currentUser} />,
    }

    return(
      <div className={styles.home_wrap}>
        <ProgressBar
        cartIsDone={userSignedIn}
        shipIsDone={userCheckout}
        payIsDone={userShipping}
        payIsConfirm={userPayment}
         />
        
        {steps[step]}

      </div>
    )
  }
};

export default CodeCommerce;