import React from "react";
import style from "./Logo.module.scss";
import { FaSuitcase } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ILogo {
  userType?: "applicant" | "employer";
}

const Logo: React.FC<ILogo> = ({ userType }) => {
  return (
    <Link to={"/"}>
      <div className={style.logo}>
        <p>JB</p>
        <span>{userType === "employer" && <FaSuitcase />}</span>
      </div>
    </Link>
  );
};

export default Logo;
