import React from "react";
import style from "./Logo.module.scss";
import { FaSuitcase } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ILogo {
  userType?: "applicant" | "employer";
  color?: string
}

const Logo: React.FC<ILogo> = ({ userType, color }) => {
  return (
    <Link to={"/"}>
      <div className={style.logo} style={color ? {color} : {}}>
        <p>JB</p>
        <span>{userType === "employer" && <FaSuitcase color={color} />}</span>
      </div>
    </Link>
  );
};

export default Logo;
