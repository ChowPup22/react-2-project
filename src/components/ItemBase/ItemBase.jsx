import React from "react";
import './ItemBase.css'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ItemBase = ({ ...props}) => (
  <div className="item-wrap">
    {/* <span>{faCircleXmark}</span> */}
    <img height='100px' width='75px' src={props.img} alt={props.alt} />
    <div className="product-wrap">
      <div className="product-description">
        <span>{props.category}</span>
        <h5>{props.title}</h5>
        <p>{props.description}</p>
      </div>
    </div>
    <div className="product-price">
      <h4>{`$${props.price.toFixed(2)}`}</h4>
    </div>
    <div className="product-quantity">
      <select onChange={props.onChange} name="product-quantity" price={props.price} id={props.id}>
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
    <div className="product-total">
      <h4>{`$${props.productTotal.toFixed(2)}`}</h4>
    </div>
  </div>
)

export default ItemBase;