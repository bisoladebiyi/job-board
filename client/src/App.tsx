import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ROUTES_APPLICANT, ROUTES_EMPLOYER } from "./utils/constants";
import Auth from "./pages/Auth";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import Resume from "./pages/applicants/Resume";
import ApplicantDashbaord from "./pages/applicants/Dashboard";
import { PersistGate } from "redux-persist/integration/react";
import Explore from "./pages/applicants/Explore";
import EmployerDashbaord from "./pages/employers/Dashboard";
import CreateJob from "./pages/employers/CreateJob";
import EditJob from "./pages/employers/EditJob";
import Applications from "./pages/employers/Applications";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route
              path={ROUTES_APPLICANT.LOGIN}
              element={<Auth userType="applicant" pageType="login" />}
            />
            <Route
              path={ROUTES_APPLICANT.SIGNUP}
              element={<Auth userType="applicant" pageType="signup" />}
            />
            <Route path={ROUTES_APPLICANT.RESUME} element={<Resume />} />
            <Route
              path={ROUTES_APPLICANT.JOBS}
              element={<ApplicantDashbaord />}
            />
            <Route path={ROUTES_APPLICANT.EXPLORE} element={<Explore />} />
            <Route
              path={ROUTES_EMPLOYER.LOGIN}
              element={<Auth userType="employer" pageType="login" />}
            />
            <Route
              path={ROUTES_EMPLOYER.SIGNUP}
              element={<Auth userType="employer" pageType="signup" />}
            />
            <Route
              path={ROUTES_EMPLOYER.DASHBOARD}
              element={<EmployerDashbaord />}
            />
            <Route path={ROUTES_EMPLOYER.CREATE} element={<CreateJob />} />
            <Route path={ROUTES_EMPLOYER.EDIT + "/:id"} element={<EditJob />} />
            <Route
              path={ROUTES_EMPLOYER.APPLICATIONS}
              element={<Applications />}
            />
          </Routes>
        </>
      </PersistGate>
    </Provider>
  );
}

export default App;
