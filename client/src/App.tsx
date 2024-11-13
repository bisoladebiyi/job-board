import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ROUTES_APPLICANT, ROUTES_EMPLOYER } from "./utils/constants";
import Auth from "./pages/Auth";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
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
          <Route
            path={ROUTES_EMPLOYER.LOGIN}
            element={<Auth userType="employer" pageType="login" />}
          />
          <Route
            path={ROUTES_EMPLOYER.SIGNUP}
            element={<Auth userType="employer" pageType="signup" />}
          />
        </Routes>
      </>
    </Provider>
  );
}

export default App;
