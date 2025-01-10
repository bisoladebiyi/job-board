import React from "react";
import EmployerLayout from "../../../components/Layout/employer";
import { ROUTES_EMPLOYER } from "../../../utils/constants";

const Applications = () => {
  return (
    <EmployerLayout
      activePage={ROUTES_EMPLOYER.APPLICATIONS}
      pageName={"Applications"}
    ></EmployerLayout>
  );
};

export default Applications;
