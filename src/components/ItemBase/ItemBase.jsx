import React from "react";
import styles from './ItemBase.module.css'
import { remove } from "../../Constants/Icons/Icons";

const ItemBase = ({ ...props}) => (
  <div className={styles.item_wrap} id={props.id}>
    <span className={styles.remove_wrap} key={props.id} id={props.id} onClick={props.onClick}>{remove}</span>
    <img height='100px' width='75px' src={props.img} alt={props.alt} />
    <div className={styles.product_wrap}>
      <div className={styles.product_description}>
        <span className={styles.product_span}>{props.category}</span>
        <h5 className={styles.product_h5}>{props.title}</h5>
        <p className={styles.product_p}>{props.description}</p>
      </div>
    </div>
    <div className={styles.product_price}>
      <h4>{`$${props.price.toFixed(2)}`}</h4>
    </div>
    <div>
      <select className={styles.product_quantity} onChange={props.onChange} name="product-quantity" price={props.price} id={props.id}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    <div className={styles.product_total}>
      <h4>{`$${props.productTotal.toFixed(2)}`}</h4>
    </div>
  </div>
)

export default ItemBase;