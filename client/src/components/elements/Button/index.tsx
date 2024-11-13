import React from "react";
import style from "./Button.module.scss";

interface IButton {
  text: string;
  disabled?: boolean;
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButton> = ({ text, disabled, onClick }) => {
  return (
    <button className={style.button} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
