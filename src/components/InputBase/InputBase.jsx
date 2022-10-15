import React from "react";
import './InputBase.css';

const InputBase = ({ passData, errorM, header, ...props}) => (
  <label>
    {header && <div className="header">{header}</div>}
    {errorM ? <input style={{border: '2px solid red'}} className="input-root" {...props}/> :
    <input className="input-root" {...props}/> }
    {errorM && <div className="error">{errorM}</div>}
  </label>
)
export default InputBase;