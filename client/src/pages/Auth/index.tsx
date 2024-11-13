import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { IAuth } from "../../interface/Auth.interface";
import Logo from "../../components/Logo";
import style from "./Auth.module.scss"
import bulb from "../../assets/images/bulb.png"
import paper_plane from "../../assets/images/paper_plane.png"

const Auth: React.FC<IAuth> = ({ userType, pageType }) => {
  return (
    <div className={style.auth}>
      <nav>
        <Logo userType={userType} />
      </nav>
      {pageType === "login" ? (
        <LogIn userType={userType} />
      ) : (
        <SignUp userType={userType} />
      )}
      <img src={bulb} alt="" />
      <img src={paper_plane} alt="" />
    </div>
  );
};

export default Auth;
