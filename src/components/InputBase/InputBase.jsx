import React from "react";
import './InputBase.css';
import { CARD, CARDICON } from "../constants";


const InputBase = ({ passData, errorM, header, isCard, cardType, ...props}) => (
  <label>
    {header && <div className="header">{header}</div>}
    {errorM ? <input style={{border: '2px solid red'}} className="input-root" {...props}/> :
    <input className="input-root" {...props}/> }
    {errorM && <div className="error">{errorM}</div>}
    {(!errorM || !errorM.cardError) && isCard && CARD.includes(cardType) && (
      <img
      style={{
        position: "absolute",
        top: "33px",
        right: "10px",
        width: "50px",
        height: "33px",
      }}
      src={CARDICON[cardType]}
      alt="card"
      />
    )}
  </label>
)
export default InputBase;