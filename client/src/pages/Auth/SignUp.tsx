/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from "react";
import { IAuth } from "../../interface/Auth.interface";
import style from "./Auth.module.scss";
import Input from "../../components/elements/Input/Input";
import Button from "../../components/elements/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES_APPLICANT, ROUTES_EMPLOYER } from "../../utils/constants";
import {
  useApplicantSignupMutation,
  useEmployerSignupMutation,
} from "../../redux/features/auth/authSlice";
import { hasAllValues } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { setApplicant } from "../../redux/features/user/applicantSlice";
import { setEmployer } from "../../redux/features/user/employerSlice";

const SignUp: React.FC<Omit<IAuth, "pageType">> = ({ userType }) => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpDataEmp, setSignUpDataEmp] = useState({
    name: "",
    website: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [applicantSignup, { isLoading }] = useApplicantSignupMutation();
  const [employerSignup, { isLoading: _isLoading }] =
    useEmployerSignupMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateInfo = (e: ChangeEvent<HTMLInputElement>) => {
    if (userType === "applicant") {
      setSignUpData({
        ...signUpData,
        [e.target.name]: e.target.value,
      });
    } else {
      setSignUpDataEmp({
        ...signUpDataEmp,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (userType === "applicant") {
        await applicantSignup({
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.email,
          occupation: signUpData.occupation,
          password: signUpData.password,
          isEmployer: false,
        })
          .unwrap()
          .then((res: any) => {
            localStorage.setItem("token", res.token);
            dispatch(
              setApplicant({
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                occupation: res.occupation,
                id: res.id,
              })
            );
            navigate(ROUTES_APPLICANT.RESUME);
          });
      } else {
        await employerSignup({
          email: signUpDataEmp.email,
          companyName: signUpDataEmp.name,
          companyWebsite: signUpDataEmp.website,
          password: signUpDataEmp.password,
          isEmployer: true,
        })
          .unwrap()
          .then((res: any) => {
            dispatch(
              setEmployer({
                id: res.id,
                companyName: res.companyName,
                companyWebsite: res.companyWebsite,
                email: res.email,
              })
            );
            localStorage.setItem("token", res.token);
            navigate(ROUTES_EMPLOYER.DASHBOARD);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (userType === "applicant") {
    return (
      <div className={style.login}>
        <h2>Start your search!</h2>
        <p>Create a new account with us</p>

        <form action="">
          <div className={style.login_form_grid}>
            <Input
              name="firstName"
              label={"first name"}
              type="text"
              onChange={updateInfo}
            />
            <Input
              name="lastName"
              label={"last name"}
              type="text"
              onChange={updateInfo}
            />
          </div>

          <Input
            name="occupation"
            label={"occupation"}
            type="text"
            onChange={updateInfo}
          />
          <Input
            name="email"
            label={"email"}
            type="email"
            onChange={updateInfo}
          />
          <Input
            name="password"
            label={"password"}
            type={"password"}
            onChange={updateInfo}
          />
          <Input
            name="confirmPassword"
            label={"confirm password"}
            type={"password"}
            onChange={updateInfo}
          />
          <Button
            disabled={!hasAllValues(signUpData)}
            onClick={handleSignUp}
            text={isLoading ? "Loading..." : "Sign Up"}
          />
        </form>
        <p className={style.login_redirect}>
          Already have an account?{" "}
          <Link to={ROUTES_APPLICANT.LOGIN}>Log in</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={style.login}>
      <h2>Post new jobs</h2>
      <p>Create a new account with us</p>

      <form action="">
        <Input
          name="name"
          label={"Company name"}
          type="text"
          onChange={updateInfo}
        />
        <Input
          name="website"
          label={"company website"}
          type="url"
          onChange={updateInfo}
        />
        <Input
          name="email"
          label={"email"}
          type="email"
          onChange={updateInfo}
        />
        <Input
          name="password"
          label={"password"}
          type={"password"}
          onChange={updateInfo}
        />
        <Input
          name="confirmPassword"
          label={"confirm password"}
          type={"password"}
          onChange={updateInfo}
        />
        <Button
          disabled={!hasAllValues(signUpDataEmp)}
          onClick={handleSignUp}
          text={_isLoading ? "Loading..." : "Sign Up"}
        />
      </form>
      <p className={style.login_redirect}>
        Already have an account? <Link to={ROUTES_EMPLOYER.LOGIN}>Log in</Link>
      </p>
    </div>
  );
};

export default SignUp;
