import React from "react";
import "./Input.css";
const Input = ({ label, state, setState, placeholder,type }) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        placeholder={placeholder}
        className="custom-input"
        onChange={(e)=>setState(e.target.value)}
        value={state}
        type={type}
        required
      />
    </div>
  );
};

export default Input;
