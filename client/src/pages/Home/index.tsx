import { FaPaperPlane } from "react-icons/fa";
import Logo from "../../components/Logo";
import style from "./Home.module.scss";
import leaves from "../../assets/images/leaves.png";
import { useNavigate } from "react-router-dom";
import { ROUTES_APPLICANT, ROUTES_EMPLOYER } from "../../utils/constants";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={style.home}>
      <nav>
        <Logo />
        <ul>
          <li>home</li>
          <li>jobs</li>
          <li>contact us</li>
        </ul>

        <div>
          <button onClick={() => navigate(ROUTES_APPLICANT.LOGIN)}>
            Apply to Jobs
          </button>
          <button onClick={() => navigate(ROUTES_EMPLOYER.LOGIN)}>
            Post a Job <FaPaperPlane color="#fff" />
          </button>
        </div>
      </nav>

      <header>
        <h1>
          Get your dream job <br />
          with Find Jobs.
        </h1>
        <div>
          <button onClick={() => navigate(ROUTES_APPLICANT.LOGIN)}>
            Apply to Jobs
          </button>
          <button onClick={() => navigate(ROUTES_EMPLOYER.LOGIN)}>
            Post a Job <FaPaperPlane color="#fff" />
          </button>
        </div>
      </header>
      <img src={leaves} alt="" />
      <img src={leaves} alt="" />
    </div>
  );
};

export default Home;
