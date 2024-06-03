import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  faGripHorizontal,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashboard.css";
import { UserContext } from "../../../../App";
import BloodDonationUser from "../BloodDonationUser";
import BloodRequistUser from "../BloodRequistUser";

const Dashboard = () => {
  const history = useHistory();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [clickedItem, setClickedItem] = useState(null);

  const signOut = () => {
    setLoggedInUser({});
    localStorage.clear();
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <section>
      <div className="row backgroundDashboard">
        <div className="col-md-2">
          <div
            className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4"
            style={{ height: "100vh" }}
          >
            <ul className="list-unstyled">
              <li>
                <Link to="/dashboard" className="text-white">
                  <FontAwesomeIcon icon={faGripHorizontal} />{" "}
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  <FontAwesomeIcon icon={faHome} /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white"
                  onClick={() => setClickedItem("donation")}
                >
                  <FontAwesomeIcon icon={faHome} /> <span>Blood Donate</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white"
                  onClick={() => setClickedItem("requisition")}
                >
                  <FontAwesomeIcon icon={faHome} /> <span>Blood Request</span>
                </Link>
              </li>
            </ul>
            <div>
              <Link to="/" className="text-white">
                <FontAwesomeIcon icon={faSignOutAlt} />{" "}
                <span onClick={signOut}>Logout</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-9 pl-4 pt-5">
          <div className="d-flex bd-highlight mb-3">
            <div className="mr-auto p-2 bd-highlight">
              <h1>Welcome to Our Blood Bank</h1>
            </div>
            <div className="p-2 bd-highlight">
              <img src={loggedInUser.photo} width="50px" height="auto" alt="" />
            </div>
            <div className="p-2 bd-highlight">{loggedInUser.name}</div>
          </div>
          <div>
            {clickedItem === "donation" && <BloodDonationUser />}
            {clickedItem === "requisition" && <BloodRequistUser />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
