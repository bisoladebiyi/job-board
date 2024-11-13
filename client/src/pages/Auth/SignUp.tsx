import React from "react";
import { IAuth } from "../../interface/Auth.interface";
import style from "./Auth.module.scss";
import Input from "../../components/elements/Input/Input";
import Button from "../../components/elements/Button";
import { Link } from "react-router-dom";
import { ROUTES_APPLICANT, ROUTES_EMPLOYER } from "../../utils/constants";

const SignUp: React.FC<Omit<IAuth, "pageType">> = ({ userType }) => {
  if (userType === "applicant") {
    return (
      <div className={style.login}>
        <h2>Start your search!</h2>
        <p>Create a new account with us</p>

        <form action="">
          <div className={style.login_form_grid}>
            <Input label={"first name"} type="text" onChange={() => {}} />
            <Input label={"last name"} type="text" onChange={() => {}} />
          </div>

          <Input label={"occupation"} type="text" onChange={() => {}} />
          <Input label={"email"} type="email" onChange={() => {}} />
          <Input label={"password"} type={"password"} onChange={() => {}} />
          <Input
            label={"confirm password"}
            type={"password"}
            onChange={() => {}}
          />
          <Button text="Sign Up" />
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
        <Input label={"Company name"} type="text" onChange={() => {}} />
        <Input label={"company website"} type="url" onChange={() => {}} />
        <Input label={"email"} type="email" onChange={() => {}} />
        <Input label={"password"} type={"password"} onChange={() => {}} />
        <Input
          label={"confirm password"}
          type={"password"}
          onChange={() => {}}
        />
        <Button text="Sign Up" />
      </form>
      <p className={style.login_redirect}>
        Already have an account? <Link to={ROUTES_EMPLOYER.LOGIN}>Log in</Link>
      </p>
    </div>
  );
};

export default SignUp;
