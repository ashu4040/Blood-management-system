import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/Login/PrivateRoute";
import Dashboard from "./Components/Dashboard/Blood/Dashboard/Dashboard";
import BloodDonationUser from "./Components/Dashboard/Blood/BloodDonationUser";
import BloodRequistUser from "./Components/Dashboard/Blood/BloodRequistUser";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute path="/donate">
            <BloodDonationUser />
          </PrivateRoute>
          <PrivateRoute path="/request">
            <BloodRequistUser />
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
