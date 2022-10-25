import React from "react";
import styles from './CartSummary.module.css';

class CartSummary extends React.Component {

  handleItemSummary = (dataset) => {
    let x = 0;
    let items = [];
    for(; x < dataset.length; x++) {
      if (dataset[x].quantity > 0) {
        let newItem = {
          img: dataset[x].img,
          alt: dataset[x].alt,
          title: dataset[x].title,
          quantity: dataset[x].quantity,
          productTotal: dataset[x].productTotal,
        }
        items.push(newItem);
      }
    }
    return items;
  };

  render() {
    const {
      isCart,
      isShipping,
      isPayment,
      isConfirm,
      pcode,
      usedCode,
      handleChange,
      handlePromo,
      handleProceed,
      userData,
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

    const handleCardTrim = () => {
      const card = userData.paymentData.card;
      const trim = card.slice(15, 19)

      return trim;
    }

    const items = this.handleItemSummary(userData.itemData);
    return (
      <div className={styles.checkout_wrap}>
            <h5>SUMMARY</h5>
            <br />
            <hr />
            {(isShipping || isConfirm) && items.length ? 
              <div>
                {items.map(item => {
                  return (
                    <div className={styles.item_sum_wrap} key={item.title}>
                      <img src={item.img} alt={item.alt} style={imgStyle} />
                      <p className={styles.item_sum_title}>{item.title}</p>
                      <p className={styles.quantity}>{item.quantity}</p>
                      <p className={styles.item_sum_total}>{(item.productTotal).toFixed(2)}</p>
                    </div>
                  )
                })}
                <hr />
              </div>
            : null}
            {isPayment && userData.shippingData ?
            <div className={styles.promo_wrap}>
              <p>Do you have a Promo code?</p>
              <input title="Try out SAV15, SAV20, SAV50 or JSX25" type="text" placeholder="CODE" value={pcode} className={styles.promo_input} disabled={usedCode} onChange={handleChange}/>
              <button className={styles.promo_input} onClick={handlePromo}>APPLY</button>
              <hr />
            </div>
            : null}
            {(isPayment || isConfirm) && userData.shippingData ? 
              <section>
              <div className={styles.shipping_sum_wrap}>
                <h5>Shipping to:</h5>
                <br />
                <p>{userData.shippingData.addresseeName}</p>
                <p>{userData.shippingData.streetAddress}</p>
                <p>{userData.shippingData.city+', '+userData.shippingData.state+' '+ userData.shippingData.zipCode}</p>
                <p>{userData.shippingData.cellPhone}</p>
                <hr />
              </div>
              </section>
            : null}
            <div className={styles.total_wrap}>
              <div className={`${styles.subtotal} ${styles.pair_wrap}`}>
                <p>Cart Subtotal: </p>
                <p className={styles.b_total}>${userData.priceData.subtotal}</p>
              </div>
              <div className={`${styles.sH} ${styles.pair_wrap}`}>
                <p>Shipping Cost: </p>
                <p className={styles.b_total}>{isCart ? '-' : '$'+userData.priceData.shipping}</p>
              </div>
              <div className={`${styles.discount} ${styles.pair_wrap}`}>
                <p>Savings: </p>
                <p className={styles.b_total}>${userData.priceData.discount}</p>
              </div>
              <div className={`${styles.cart_total} ${styles.pair_wrap}`}>
                <p className={styles.total}>Cart Total: </p>
                <p className={`${styles.p_total} ${styles.b_total}`}>${userData.priceData.total}</p>
              </div>
            </div>
            <hr className={styles.hr_bottom} />
            {isCart || isShipping || isPayment ? 
            <div className={styles.proceed_shipping}>
              <button onClick={handleProceed} className={styles.btn_primary}>{btn()}</button>
            </div>
            : null}
            {isConfirm ? 
              <div>
                <span className={styles.pay_confirm_span}>Payment confirmed with card ending in {handleCardTrim()}</span>
              </div>
            : null }
        </div>
    )
  }
}

export default CartSummary;