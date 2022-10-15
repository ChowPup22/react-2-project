import React from "react";
import './CustomerCart.css'
import ItemBase from "../ItemBase/ItemBase";
import { IMAGES } from "../../assets/ProductImages";

const INIT_DATA = [
  {img: IMAGES.product1, alt: 'code snippet', category: 'FORMS', title: 'InputBase', description: 'The only component you will need for all your basic form needs!', id: '0', price: 24.99, quantity: 0, productTotal: 0},
  {img: IMAGES.product2, alt: 'code snippet', category: 'UI CONTROL', title: 'Theme Toggle', description: 'Keep the UI synced with user theme with this unique component!', id: '1', price: 27.49, quantity: 0, productTotal: 0},
  {img: IMAGES.product3, alt: 'code snippet', category: 'DATASETS', title: 'Data Manager', description: 'Handle user input data and keep everything organized!', id: '2', price: 32.97, quantity: 0, productTotal: 0},
  {img: IMAGES.product4, alt: 'code snippet', category: 'FORMS', title: 'Submit Handler', description: 'Prevent default form submissions and handle data your way!', id: '3', price: 19.98, quantity: 0, productTotal: 0},
];

const CODES = ['JSX15', 'RJS15', '15OFF', 'SAV15', 'CCS15']

class CustomerCart extends React.Component {
  constructor() {
    super();
    this.state = {
      itemData: INIT_DATA,
      quantity: 0,
      productTotal: 0,
      subtotal: 0,
      pcode: '',
      usedCode: false,
      discount: 0,
      total: 0,
    }
  }

  calcProductTotal = (e) => {
    const { itemData, subtotal, discount } = this.state;
    let num = e.target.value;
    let id = e.target.id;
    let price = itemData[id].price;
    let newProductTotal = (num * price);
    let newTotal = (subtotal - discount).toFixed(2);
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
      subtotal: newSubtotal.toFixed(2),
      total: newTotal,
      itemData: prev.itemData.map(obj => (
        obj.id === id ? Object.assign(obj, { quantity: num, productTotal: newProductTotal }) : obj
      ))
    }))
  };

  handleChange = ({target: { value } }) => {
    this.setState({ pcode: value})
  }

  handlePromo = () => {
    const { subtotal, pcode } = this.state;
    if (CODES.includes(pcode)) {
      const newTotal = subtotal - 15;

      this.setState({
        discount: '15.00',
        total: newTotal.toFixed(2),
        usedCode: true,
      })
    } else if(pcode === '') {
      alert('You must enter a code to continue!')
    } else {
      this.setState({ pcode: ''});
      return alert(`${pcode} is not a valid code!`);
    }
  }

  render() {
    const {
      itemData,
      subtotal,
      discount,
      total,
      usedCode,
      pcode
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
          {itemData.length ? itemData.map((item) => (
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
                <p className="b-total">${subtotal}</p>
              </div>
              <div className="sH pair-wrap">
                <p>Shipping and Handling: </p>
                <p className="b-total">-</p>
              </div>
              <div className="discount pair-wrap">
                <p>Savings: </p>
                <p className="b-total">${discount}</p>
              </div>
              <div className="cart-total pair-wrap">
                <p className="total">Cart Total: </p>
                <p className="p-total b-total">${total}</p>
              </div>
            </div>
            <hr />
            <div className="proceed-shipping">
              <button className="btn-primary">Proceed to Shipping</button>
            </div>
        </div>
      </div>
    )
  }
}

export default CustomerCart;