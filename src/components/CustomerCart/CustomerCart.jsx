import React from "react";
import './CustomerCart.css';
import ItemBase from "../ItemBase/ItemBase";
import { CODES } from "../constants";
import CartSummary from "../CartSummary/CartSummary";

class CustomerCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    userData: this.props.userData,
      pcode: '',
      usedCode: false,
      itemSummary: [],
    }
  };

  handleState = (name, value) => {
    this.props.handleState(name, value);
  };

  calcProductTotal = (e) => {
    e.preventDefault();
    const { itemData, priceData } = this.state.userData;
    let num = e.target.value;
    let id = e.target.id;
    let price = itemData[id].price;
    let newProductTotal = (num * price);
    let newSubtotal = 0;
    let x = 0;
    
    for(; x < itemData.length; x++) {
      if (id === itemData[x].id) {
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
          total: (newSubtotal - priceData.discount).toFixed(2),
        },
        itemData: prev.userData.itemData.map(obj => (
          obj.id === id ? Object.assign(obj, { quantity: num, productTotal: newProductTotal }) : obj
        ))
      }
    }))
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

  handleItemSummary = (dataset) => {
    let x = 0;
    for(; x < dataset.length; x++) {
      if (dataset[x].quantity > 0) {
        console.log('here');
        let newItem = {
          img: dataset[x].img,
          alt: dataset[x].alt,
          title: dataset[x].title,
          productTotal: dataset[x].productTotal,
        }
        console.log(newItem);
        this.setState(prev => ({
          itemSummary: [
            ...prev.itemSummary,
            newItem,
          ]
        }), this.handleState('itemSummary', this.state.itemSummary))
      }
    }
  }

  handleProceed = () => {
    if (this.state.userData.priceData.total > 0) {
      this.handleItemSummary(this.state.userData.itemData)
      this.handleState('userData', this.state.userData)
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
        <CartSummary
        isCart={true}
        pcode={pcode}
        usedCode={usedCode}
        handlePromo={this.handlePromo}
        handleChange={this.handleChange}
        handleProceed={this.handleProceed}
        userData={userData}
        />
      </div>
    )
  }
};

export default CustomerCart;