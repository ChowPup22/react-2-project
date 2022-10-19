import React from "react";
import './CustomerCart.css';
import ItemBase from "../ItemBase/ItemBase";
import { CODES } from "../constants";

class CustomerCart extends React.Component {
  constructor(props) {
    super(props);
    this.handleState();
    this.state = {
    userData: {
        itemData: props.itemData,
        priceData: props.priceData,
      },
      pcode: '',
      usedCode: false,
    }
  };

  handleState = (name, value) => {
    this.props.handleState(name, value);
  };

  calcProductTotal = (e) => {
    const { itemData, priceData } = this.state.userData;
    let num = e.target.value;
    let id = e.target.id;
    let price = itemData[id].price;
    let newProductTotal = (num * price);
    let newTotal = (priceData.subtotal - priceData.discount).toFixed(2);
    let newSubtotal = 0;
    let x = 0;

    for(; x < itemData.length; x++) {
      if (id === itemData.id) {
        newSubtotal = newSubtotal + newProductTotal;
      } else {
        newSubtotal = newSubtotal + itemData[x].productTotal
      }
    }
    
    this.setState(prev => ({
      userData: {
        ...prev.userData,
        priceData: {
          ...prev.userData.priceData,
          subtotal: newSubtotal.toFixed(2),
          total: newTotal,
        },
        itemData: prev.userData.itemData.map(obj => (
          obj.id === id ? Object.assign(obj, { quantity: num, productTotal: newProductTotal }) : obj
        ))
      }
    }), this.handleState('userData', this.state.userData))
  };

  handleChange = ({target: { value } }) => {
    this.setState({ pcode: value})
  };

  handlePromo = () => {
    const { userData, pcode } = this.state;
    if (CODES.includes(pcode)) {
      const newTotal = userData.priceData.subtotal - 15;

      this.setState(prev => ({
        userData: {
          ...prev.userData,
          priceData: {
            ...prev.userData.priceData,
            discount: '15.00',
            total: newTotal.toFixed(2),
          },
        },
        usedCode: true,
      }))
    } else if(pcode === '') {
      alert('You must enter a code to continue!')
    } else {
      this.setState({ pcode: ''});
      return alert(`${pcode} is not a valid code!`);
    }
  };

  handleProceed = () => {
    if (this.state.userData.priceData.total > 0) {
      this.handleState('userCheckout', true);
    } else {
      alert('You must make a selection to proceed!');
    }
  };

  render() {
    const {
      userData,
      usedCode,
      pcode,
    } = this.state;

    return (
      <div className="cart-page-wrap">
        <div className="cart-wrap">
          <div className="header-wrap">
            <h5 className="product-header">Product</h5>
            <h5>Price</h5>
            <h5>Quantity</h5>
            <h5>Total</h5>
          </div>
          <hr />
          {userData.itemData.length ? userData.itemData.map((item) => (
            // file deepcode ignore ReactMissingArrayKeys: <n/a>
            <ItemBase 
            onChange={this.calcProductTotal}
            total={this.calcTotal}
            img={item.img}
            alt={item.alt}
            category={item.category}
            title={item.title}
            description={item.description}
            price={item.price}
            productTotal={item.productTotal}
            id={item.id}
            />
          )) : null}
        </div>
        <div className="checkout-wrap">
            <h5>SUMMARY</h5>
            <br />
            <hr />
            <div className="promo-wrap">
              <p>Do you have a Promo code?</p>
              <input type="text" placeholder="CODE" value={pcode} className="promo-input" disabled={usedCode} onChange={this.handleChange}/>
              <button className="promo-input" onClick={this.handlePromo}>APPLY</button>
            </div>
            <hr />
            <div className="total-wrap">
              <div className="subtotal pair-wrap">
                <p>Cart Subtotal: </p>
                <p className="b-total">${userData.priceData.subtotal}</p>
              </div>
              <div className="sH pair-wrap">
                <p>Shipping and Handling: </p>
                <p className="b-total">-</p>
              </div>
              <div className="discount pair-wrap">
                <p>Savings: </p>
                <p className="b-total">${userData.priceData.discount}</p>
              </div>
              <div className="cart-total pair-wrap">
                <p className="total">Cart Total: </p>
                <p className="p-total b-total">${userData.priceData.total}</p>
              </div>
            </div>
            <hr />
            <div className="proceed-shipping">
              <button onClick={this.handleProceed} className="btn-primary">Proceed to Shipping</button>
            </div>
        </div>
      </div>
    )
  }
};

export default CustomerCart;