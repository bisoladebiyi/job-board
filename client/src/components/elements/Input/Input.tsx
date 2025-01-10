import React from "react";
import { IInput } from "../../../interface/Input.interface";
import style from "./Input.module.scss";

const Input: React.FC<IInput> = ({
  type,
  onChange,
  label,
  placeholder,
  name,
  value,
}) => {
  return (
    <div className={style.input}>
      <label className={style.input_label} htmlFor="">
        {label}
      </label>
      <input
        className={style.input_field}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        value={value}
      />
    </div>
  );
};

export default Input;
