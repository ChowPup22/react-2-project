import React from "react";
import './CartSummary.css';

class CartSummary extends React.Component {

  render() {
    const {
      isCart,
      isShipping,
      isPayment,
      pcode,
      usedCode,
      handleChange,
      handlePromo,
      handleProceed,
      userData,
      itemSummary,
    } = this.props;

    const imgStyle = {
      width: '25px',
      height: '25px'
    };

    const btn = () => {
      if (isCart) {
        return 'Proceed to Shipping';
      } else if (isShipping) {
        return 'Proceed to Payment';
      } else if (isPayment) {
        return 'Pay Now'
      }
    }

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
            {isShipping && itemSummary.length ? 
            <div className="item-sum-wrap">
              <div className="item-wrap">
                <img src={itemSummary[0].img} alt={itemSummary[0].alt} style={imgStyle} />
                <p className="item-title">{itemSummary[0].title}</p>
                <p className="item-total">{itemSummary[0].productTotal}</p>
              </div>
              <div className="item-wrap">
                <img src={itemSummary[1].img} alt={itemSummary[1].alt} style={imgStyle} />
                <p className="item-title">{itemSummary[1].title}</p>
                <p className="item-total">{itemSummary[1].productTotal}</p>
              </div>
            </div>
            : null}
            <div className="total-wrap">
              <div className="subtotal pair-wrap">
                <p>Cart Subtotal: </p>
                <p className="b-total">${userData.priceData.subtotal}</p>
              </div>
              <div className="sH pair-wrap">
                <p>Shipping Cost: </p>
                <p className="b-total">{isCart ? '-' : '$'+userData.priceData.shipping}</p>
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
              <button onClick={handleProceed} className="btn-primary">{btn()}</button>
            </div>
        </div>
    )
  }
}

export default CartSummary;