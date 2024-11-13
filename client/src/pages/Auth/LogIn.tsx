/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from "react";
import { IAuth } from "../../interface/Auth.interface";
import Input from "../../components/elements/Input/Input";
import style from "./Auth.module.scss";
import Button from "../../components/elements/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES_APPLICANT, ROUTES_EMPLOYER } from "../../utils/constants";
import {
  LoginRequest,
  useApplicantLoginMutation,
  useEmployerLoginMutation,
} from "../../redux/features/auth/authSlice";

const LogIn: React.FC<Omit<IAuth, "pageType">> = ({ userType }) => {
  const [loginInfo, setLoginInfo] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [applicantLogin, { isLoading }] = useApplicantLoginMutation();
  const [employerLogin, { isLoading: _isLoading }] = useEmployerLoginMutation();
  const navigate = useNavigate();

  const updateInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (userType === "applicant") {
        await applicantLogin(loginInfo)
          .unwrap()
          .then((res: any) => {
            localStorage.setItem("user", JSON.stringify(res));
            navigate(ROUTES_APPLICANT.DASHBOARD)
          });
      } else {
        await employerLogin(loginInfo)
          .unwrap()
          .then((res: any) => {
            localStorage.setItem("user", JSON.stringify(res));
            navigate(ROUTES_EMPLOYER.DASHBOARD)
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.login}>
      <h2>Welcome back!</h2>
      <p>Log into your account</p>

      <form action="">
        <Input
          value={loginInfo.email}
          label={"email"}
          name="email"
          type="email"
          onChange={updateInfo}
        />
        <Input
          value={loginInfo.password}
          label={"password"}
          name="password"
          type={"password"}
          onChange={updateInfo}
        />
        <Button
          disabled={!loginInfo.email || !loginInfo.password}
          text={_isLoading || isLoading ? "Loading..." : "Log In"}
          onClick={handleLogin}
        />
      </form>
      <p className={style.login_redirect}>
        Don't have an account?{" "}
        <Link
          to={
            userType === "applicant"
              ? ROUTES_APPLICANT.SIGNUP
              : ROUTES_EMPLOYER.SIGNUP
          }
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LogIn;
