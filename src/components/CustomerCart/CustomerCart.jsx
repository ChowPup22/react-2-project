import React from "react";
import styles from './CustomerCart.module.css';
import ItemBase from "../ItemBase/ItemBase";
import { CODES } from "../../Constants/States";
import CartSummary from "../CartSummary/CartSummary";

class CustomerCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      removed: [],
      pcode: '',
      usedCode: false,
    }
  };

  handleState = (name, value) => {
    this.props.handleState(name, value);
  };

  calcProductTotal = (e) => {
    e.preventDefault();
    const { itemData } = this.state.userData;
    let num = e.target.value;
    let targetId = e.target.id;
    let itemIndex = itemData.findIndex((item) => item.id === targetId);
    let price = itemData[itemIndex].price;
    let newProductTotal = (num * price);
    let newSubtotal = 0;
    let x = 0;
    
    for(; x < itemData.length; x++) {
      if (targetId === itemData[x].id) {
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
          total: newSubtotal.toFixed(2),
        },
        itemData: prev.userData.itemData.map(obj => (
          obj.id === targetId ? Object.assign(obj, { quantity: num, productTotal: newProductTotal }) : obj
        ))
      }
    }));
  };

  handleChange = ({target: { value } }) => {
    this.setState({ pcode: value})
  };

  handleRemove = (e) => {
    const { itemData } = this.state.userData;
    
    itemData.forEach(obj => {
      if(e.target.id === obj.id) {
        let index = itemData.indexOf(obj);
        let itemTotal = itemData[index].productTotal;
        itemData.splice(index, 1);
        this.setState(prev => ({
          userData: {
            ...prev.userData,
            itemData,
            priceData: {
              ...prev.userData.priceData,
              subtotal: (prev.userData.priceData.subtotal - itemTotal).toFixed(2),
              total: (prev.userData.priceData.total - itemTotal).toFixed(2),
            },
          }
        }));
      }
    });
  };

  handlePromo = () => {
    const { userData, pcode } = this.state;
    if (CODES[pcode]) {
      const discount = (userData.priceData.subtotal * CODES[pcode]).toFixed(2);
      const newTotal = (userData.priceData.subtotal - discount).toFixed(2);

      this.setState(prev => ({
        userData: {
          ...prev.userData,
          priceData: {
            ...prev.userData.priceData,
            discount: discount,
            total: newTotal,
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
      this.handleState('userData', this.state.userData)
      this.handleState('userCheckout', true);
    } else {
      alert('You must make a selection to proceed!');
    }
  };

  handleReload = () => {
    const { removed } = this.state;
    this.setState(prev => ({
      userData: {
        ...prev.userData,
        itemData: [
          ...prev.userData.itemData,
          removed,
        ]
      }
    }))
  }

  handleReturn = () => {
    this.handleReload();
    this.handleState('userSignedIn', false);
  };

  render() {
    const {
      userData,
    } = this.state;

    return (
      <div className={styles.cart_page_wrap}>
        <div className={styles.cart_wrap}>
          <div className={styles.header_wrap}>
            <h5 className={styles.product_header}>Product</h5>
            <h5>Price</h5>
            <h5>Quantity</h5>
            <h5>Total</h5>
          </div>
          <hr />
          {userData.itemData.length ? userData.itemData.map((item) => (
            // file deepcode ignore ReactMissingArrayKeys: <n/a>
            <ItemBase 
            onClick={this.handleRemove}
            onChange={this.calcProductTotal}
            total={this.calcTotal}
            img={item.img}
            alt={item.alt}
            category={item.category}
            title={item.title}
            key={item.title}
            description={item.description}
            price={item.price}
            productTotal={item.productTotal}
            id={item.id}
            />
          )) : null}
          <input type="button" value="BACK TO SIGN IN" className={styles.btn_return} onClick={this.handleReturn} />
        </div>
        <CartSummary
        isCart={true}
        handleChange={this.handleChange}
        handleProceed={this.handleProceed}
        handlePromo={this.handlePromo}
        userData={userData}
        />
      </div>
    )
  }
};

export default CustomerCart;