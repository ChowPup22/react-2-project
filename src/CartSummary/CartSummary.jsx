import React from "react";
import './CartSummary.css';

class CartSummary extends React.Component {



  render() {
    const {
      isCart,
      pcode,
      usedCode,
      handleChange,
      handlePromo,
      handleProceed,
      userData
    } = this.props;


    return (
      <div className="checkout-wrap">
            <h5>SUMMARY</h5>
            <br />
            <hr />
            {isCart ? 
            <div className="promo-wrap">
              <p>Do you have a Promo code?</p>
              <input type="text" placeholder="CODE" value={pcode} className="promo-input" disabled={usedCode} onChange={handleChange}/>
              <button className="promo-input" onClick={handlePromo}>APPLY</button>
              <hr />
            </div>
            : null}
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
              <button onClick={handleProceed} className="btn-primary">Proceed to Shipping</button>
            </div>
        </div>
    )
  }
}

export default CartSummary;